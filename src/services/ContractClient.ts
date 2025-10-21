import { createPublicClient, http } from "viem";
import type {
  Chain,
  PublicClient,
  WalletClient,
  MulticallParameters,
  Abi,
  Address,
  ContractFunctionName,
  ContractFunctionArgs,
  ReadContractParameters,
  SimulateContractParameters,
  WaitForTransactionReceiptParameters,
} from "viem";

export type ContractClientBaseOptions = {
  contractAddress: Address;
  abi: Abi;
  chain: Chain;
  endpoint?: string;
  walletClient?: WalletClient;
};

export abstract class ContractClientBase<TAbi extends Abi> {
  protected readonly publicClient: PublicClient;

  protected readonly abi: Abi;
  protected readonly contractAddress: Address;
  private readonly chain: Chain;
  private walletClient: WalletClient | undefined;

  constructor(options: ContractClientBaseOptions) {
    this.abi = options.abi;
    this.contractAddress = options.contractAddress;
    this.chain = options.chain;
    this.walletClient = options.walletClient;

    // init public client
    this.publicClient = createPublicClient({
      chain: this.chain,
      transport: http(options.endpoint),
    }) as any;
  }

  get multicallParamsBase() {
    return { address: this.contractAddress, abi: this.abi };
  }

  /**
   * Allow delay setting a wallet client for write operations.
   * @param walletClient
   */
  setWalletClient(walletClient: WalletClient) {
    this.walletClient = walletClient;
  }

  protected async readContract<
    functionName extends ContractFunctionName<TAbi, "pure" | "view">,
    const args extends ContractFunctionArgs<TAbi, "pure" | "view", functionName>
  >(
    args: Pick<
      ReadContractParameters<TAbi, functionName, args>,
      "args" | "functionName" | "blockNumber" | "blockTag"
    >
  ) {
    const result = await this.publicClient.readContract({
      abi: this.abi,
      address: this.contractAddress,
      functionName: args.functionName,
      args: args.args as unknown[],
      blockNumber: args.blockNumber,
      blockTag: args.blockTag,
    } as any);

    return result;
  }

  protected async simulateAndWriteContract<
    TFunctionName extends ContractFunctionName<TAbi, "nonpayable" | "payable">
  >(
    args: {
      functionName: TFunctionName;
      args?: ContractFunctionArgs<TAbi, "nonpayable" | "payable", TFunctionName>;
      account?: Address;
      value?: bigint;
      nonce?: number;
    },
    options?: { walletClient?: WalletClient }
  ) {
    if (!this.walletClient) {
      throw new Error("Wallet client is not initialized");
    }

    const { request } = await this.publicClient.simulateContract({
      abi: this.abi,
      address: this.contractAddress,
      functionName: args.functionName,
      args: args.args as unknown[],
      account: args.account || this.walletClient.account,
      value: args.value,
      nonce: args.nonce,
    } as any);

    const wc = options?.walletClient || this.walletClient;
    const result = await wc.writeContract(request as any);

    return result;
  }

  public async multicall(parameters: MulticallParameters<any[], boolean>) {
    return await (this.publicClient as any).multicall(parameters);
  }

  public async waitForTransactionReceipt(
    args: WaitForTransactionReceiptParameters<typeof this.chain>
  ) {
    return await this.publicClient.waitForTransactionReceipt(args);
  }
}

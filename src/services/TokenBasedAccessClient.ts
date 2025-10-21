import { ContractClientBase } from "./ContractClient";
import { TokenBasedAccessAbi } from "./abis/TokenBasedAccess";
import { ContractClientBaseOptions } from "./ContractClient";
import { globalConfig } from "@/constants";
import { Address } from "viem";
import { ERC20ContractClient } from "./Erc20Client";

export interface TokenGate {
  tokenAddress: string;
  threshold: bigint;
  tokenId: bigint;
  tokenType: number;
  chainId: number;
  tokenSymbol: string;
  crossChainAddress: string;
  decimals: number;
  chainName: string;
}

export class TokenBasedAccessClient extends ContractClientBase<
  typeof TokenBasedAccessAbi
> {
  constructor(options: Partial<ContractClientBaseOptions>) {
    super({
      ...options,
      chain: globalConfig.chain,
      contractAddress: globalConfig.tokenBasedAccessAddress as Address,
      abi: TokenBasedAccessAbi,
    });
  }

  async hasAccessByDomain(
    domainName: string,
    userAddress: `0x${string}`
  ): Promise<boolean> {
    return (await this.readContract({
      functionName: "hasAccessByDomain",
      args: [domainName, userAddress],
    })) as boolean;
  }

  async getTokenGates(domainName: string): Promise<TokenGate[]> {
    const result = await this.readContract({
      functionName: "getTokenGates",
      args: [domainName],
    });

    // 解构返回的二维数组
    const [
      tokenAddresses,
      thresholds,
      tokenIds,
      tokenTypes,
      chainIds,
      tokenSymbols,
      crossChainAddresses,
    ] = result as [
      string[],
      bigint[],
      bigint[],
      number[],
      number[],
      string[],
      string[]
    ];

    const promiseArr = chainIds.map((chainId, index) => {
      const chain = globalConfig.supportChains.find(
        (chain: any) => Number(chain.id) === Number(chainId)
      );
      console.log(chain);
      const erc20Contract = new ERC20ContractClient({
        chain: chain as any,
        contractAddress: crossChainAddresses[index] as Address,
      });
      return erc20Contract.decimals();
    });
    console.log(result, "dd");
    const decimals = await Promise.all(promiseArr);
    console.log(result, decimals, "dd");
    // 转换为对象数组
    return tokenAddresses.map((tokenAddress, index) => {
      const chain = globalConfig.supportChains.find(
        (chain: any) => Number(chain.id) === Number(chainIds[index])
      );
      return {
        tokenAddress,
        threshold: thresholds[index],
        tokenId: tokenIds[index],
        tokenType: tokenTypes[index],
        chainId: chainIds[index],
        tokenSymbol: tokenSymbols[index],
        crossChainAddress: crossChainAddresses[index],
        decimals: decimals[index],
        chainName: chain?.name,
      };
    });
  }
}

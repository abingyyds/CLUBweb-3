import { ContractClientBase } from "./ContractClient";

import { ContractClientBaseOptions } from "./ContractClient";
import { ERC20ContractClient } from "./Erc20Client";

import { SimpleCrossChainVerificationAbi } from "./abis/SimpleCrossChainVerification";
import { globalConfig } from "@/constants";
import { Address } from "viem";

export interface CrossChainRequirement {
  chainId: number;
  tokenAddress: string;
  crossChainAddress: string;
  threshold: bigint;
  symbol: string;
  decimals: number;
  chainName: string;
}

export class SimpleCrossChainVerificationClient extends ContractClientBase<
  typeof SimpleCrossChainVerificationAbi
> {
  constructor(options: Partial<ContractClientBaseOptions>) {
    super({
      ...options,
      chain: globalConfig.chain,
      contractAddress: globalConfig.simpleCrossChainAddress as Address,
      abi: SimpleCrossChainVerificationAbi,
    });
  }

  async getClubCrossChainRequirements(
    domainName: string
  ): Promise<CrossChainRequirement[]> {
    try {
      const result = (await this.readContract({
        functionName: "getClubCrossChainRequirements",
        args: [domainName],
      })) as [number[], string[], string[], bigint[], string[]];

      const [
        chainIds,
        tokenAddresses,
        crossChainAddresses,
        thresholds,
        symbols,
      ] = result;

      const promiseArr = chainIds.map((chainId, index) => {
        const chain = globalConfig.supportChains.find(
          (chain: any) => Number(chain.id) === Number(chainId)
        );
        console.log(chain);
        const erc20Contract = new ERC20ContractClient({
          chain: chain as any,
          contractAddress: tokenAddresses[index] as Address,
        });
        return erc20Contract.decimals();
      });
      console.log(result, "dd");
      const decimals = await Promise.all(promiseArr);
      console.log(result, decimals, "dd");

      // 将二维数组转换为对象数组
      return chainIds.map((chainId, index) => {
        const chain = globalConfig.supportChains.find(
          (chain: any) => Number(chain.id) === Number(chainId)
        );
        return {
          chainId,
          tokenAddress: tokenAddresses[index],
          crossChainAddress: crossChainAddresses[index],
          threshold: thresholds[index],
          symbol: symbols[index],
          decimals: decimals[index],
          chainName: chain?.name || "",
        };
      });
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async requestVerification(
    domainName: string,
    chainId: number,
    tokenAddress: `0x${string}`
  ) {
    const [fee] = (await this.readContract({
      functionName: "getVerificationFeeInfo",
    })) as any;
    console.log(fee, "fee");
    await this.simulateAndWriteContract({
      functionName: "requestVerification",
      args: [domainName, chainId, tokenAddress],
      value: fee,
    });
  }
}

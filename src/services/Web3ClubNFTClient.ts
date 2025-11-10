import { Web3ClubNFTABI } from "./abis/Web3ClubNFT";
import {
  ContractClientBase,
  ContractClientBaseOptions,
} from "./ContractClient";
import { globalConfig } from "@/constants";
import { Address } from "viem";

export class Web3ClubNFTClient extends ContractClientBase<
  typeof Web3ClubNFTABI
> {
  constructor(options: Partial<ContractClientBaseOptions>) {
    super({
      ...options,
      chain: globalConfig.chain,
      contractAddress: globalConfig.web3ClubNFTAddress as Address,
      abi: Web3ClubNFTABI,
    });
  }

  async getOwner(domainName: string) {
    try {
      const tokenId = (await this.readContract({
        functionName: "getTokenId",
        args: [domainName],
      })) as bigint;
      // ownerOf
      const res = (await this.readContract({
        functionName: "ownerOf",
        args: [tokenId],
      })) as string;
      return res;
    } catch (error) {
      console.error("[getOwner] error:", error);
      throw error;
    }
  }
}

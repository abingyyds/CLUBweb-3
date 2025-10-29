import { ClubMembershipQueryABI } from "./abis/ClubMembershipQuery";
import {
  ContractClientBase,
  ContractClientBaseOptions,
} from "./ContractClient";
import { globalConfig } from "@/constants";
import { Address } from "viem";

export interface DetailedMembership {
  isPermanent: boolean;
  isTemporary: boolean;
  isTokenBased: boolean;
  isCrossChain: boolean;
}

export class ClubMembershipQueryClient extends ContractClientBase<
  typeof ClubMembershipQueryABI
> {
  constructor(options: Partial<ContractClientBaseOptions>) {
    super({
      ...options,
      chain: globalConfig.chain,
      contractAddress: globalConfig.clubMembershipQueryAddress as Address,
      abi: ClubMembershipQueryABI,
    });
  }

  async checkDetailedMembership(domainName: string, memberAddress: Address): Promise<DetailedMembership> {
    try {
      const result = await this.readContract({
        functionName: "checkDetailedMembership",
        args: [memberAddress, domainName],
      }) as [boolean, boolean, boolean, boolean];

      return {
        isPermanent: result[0],
        isTemporary: result[1],
        isTokenBased: result[2],
        isCrossChain: result[3],
      };
    } catch (error) {
      console.error("Error checking detailed membership:", error);
      throw error;
    }
  }
}

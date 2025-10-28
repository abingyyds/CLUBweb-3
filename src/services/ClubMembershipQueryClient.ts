import { ClubMembershipQueryABI } from "./abis/ClubMembershipQuery";
import {
  ContractClientBase,
  ContractClientBaseOptions,
} from "./ContractClient";
import { globalConfig } from "@/constants";
import { Address } from "viem";

export class ClubMembershipQueryClient extends ContractClientBase<
  typeof ClubMembershipQueryABI
> {
  constructor(options: Partial<ContractClientBaseOptions>) {
    super({
      ...options,
      chain: globalConfig.chain,
      contractAddress: globalConfig.clubPassFactoryAddress as Address,
      abi: ClubMembershipQueryABI,
    });
  }

  async getClubPrice() {
    return await this.readContract({
      functionName: "getClubPrice",
    });
  }
}

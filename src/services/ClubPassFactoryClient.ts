import { ClubPassFactoryABI } from "./abis/ClubPassFactory";
import {
  ContractClientBase,
  ContractClientBaseOptions,
} from "./ContractClient";
import { globalConfig } from "@/constants";
import { Address, formatEther } from "viem";

export class ClubPassFactoryClient extends ContractClientBase<
  typeof ClubPassFactoryABI
> {
  constructor(options: Partial<ContractClientBaseOptions>) {
    super({
      ...options,
      chain: globalConfig.chain,
      contractAddress: globalConfig.clubPassFactoryAddress as Address,
      abi: ClubPassFactoryABI,
    });
  }

  async getClubPrice(domainName: string) {
    const res = (await this.readContract({
      functionName: "getClubPrice",
      args: [domainName],
    })) as bigint;
    // if (res === 0n) return "";
    return formatEther(res);
  }

  getClubPassContract(domainName: string) {
    return this.readContract({
      functionName: "getClubPassContract",
      args: [domainName],
    });
  }

  purchaseMembershipFor(domainName: string) {
    return this.simulateAndWriteContract({
      functionName: "purchaseMembershipFor",
      args: [domainName],
    });
  }
}

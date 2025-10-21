import { ClubPassFactoryABI } from "./abis/ClubPassFactory";
import {
  ContractClientBase,
  ContractClientBaseOptions,
} from "./ContractClient";
import { globalConfig } from "@/constants";
import { Address } from "viem";

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

  // getClubPrice(domainName: string) {
  //   return this.readContract({
  //     functionName: "getClubPrice",
  //     args: [domainName],
  //   });
  // }

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

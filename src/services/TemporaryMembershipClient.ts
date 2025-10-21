import { TemporaryMembershipABI } from "./abis/TemporaryMembership";
import {
  ContractClientBase,
  ContractClientBaseOptions,
} from "./ContractClient";
import { Address, formatEther, parseEther } from "viem";
import { globalConfig } from "@/constants";

export class TemporaryMembershipClient extends ContractClientBase<
  typeof TemporaryMembershipABI
> {
  constructor(options: Partial<ContractClientBaseOptions>) {
    super({
      ...options,
      chain: globalConfig.chain,
      contractAddress: globalConfig.temporaryMembershipAddress as Address,
      abi: TemporaryMembershipABI,
    });
  }

  async getClubPrice(domainName: string) {
    const res = (await this.readContract({
      functionName: "getClubPrice",
      args: [domainName],
    })) as bigint;
    return formatEther(res);
  }

  getClubQuarterPrice(domainName: string) {
    return this.readContract({
      functionName: "getClubQuarterPrice",
      args: [domainName],
    });
  }

  async getClubYearPrice(domainName: string) {
    const res = (await this.readContract({
      functionName: "getClubYearPrice",
      args: [domainName],
    })) as bigint;
    return formatEther(res);
  }

  async purchaseMembership(domainName: string, price: string) {
    return this.simulateAndWriteContract({
      functionName: "purchaseMembership",
      args: [domainName],
      value: parseEther(price),
    });
  }

  async purchaseQuarterMembership(domainName: string, price: string) {
    return this.simulateAndWriteContract({
      functionName: "purchaseQuarterMembership",
      args: [domainName],
      value: parseEther(price),
    });
  }

  async purchaseYearMembership(domainName: string, price: string) {
    return this.simulateAndWriteContract({
      functionName: "purchaseYearMembership",
      args: [domainName],
      value: parseEther(price),
    });
  }
}

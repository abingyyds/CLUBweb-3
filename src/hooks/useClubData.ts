import { useQuery } from "@tanstack/react-query";
import { useWeb3ClubService } from "../components/AppkitProvider";

export interface UseClubDataProps {
  domainName: string;
  address?: `0x${string}`;
}

export interface UseClubDataReturn {
  yearPrice: string | undefined;
  monthPrice: string | undefined;
  quarterPrice: string | undefined;
  verifyData: any;
  memberData: any;
  isLoading: {
    yearPrice: boolean;
    monthPrice: boolean;
    quarterPrice: boolean;
    verifyData: boolean;
    memberData: boolean;
  };
  isError: {
    yearPrice: boolean;
    monthPrice: boolean;
    quarterPrice: boolean;
    verifyData: boolean;
    memberData: boolean;
  };
}

export function useClubData({
  domainName,
  address,
}: UseClubDataProps): UseClubDataReturn {
  const web3ClubService = useWeb3ClubService();

  const {
    data: yearPrice,
    isLoading: yearPriceLoading,
    isError: yearPriceError,
  } = useQuery({
    queryKey: ["clubYearPrice", domainName],
    queryFn: () =>
      web3ClubService.temporaryMembershipClient.getClubYearPrice(domainName),
  });

  const {
    data: monthPrice,
    isLoading: monthPriceLoading,
    isError: monthPriceError,
  } = useQuery({
    queryKey: ["clubMonthPrice", domainName],
    queryFn: () =>
      web3ClubService.temporaryMembershipClient.getClubPrice(domainName),
  });

  const {
    data: quarterPrice,
    isLoading: quarterPriceLoading,
    isError: quarterPriceError,
  } = useQuery({
    queryKey: ["clubQuarterPrice", domainName],
    queryFn: () =>
      web3ClubService.temporaryMembershipClient.getClubQuarterPrice(domainName),
  });

  const {
    data: verifyData,
    isLoading: verifyDataLoading,
    isError: verifyDataError,
  } = useQuery({
    queryKey: ["clubCrossChainRequirements", domainName],
    queryFn: () =>
      web3ClubService.tokenBasedAccessClient.getTokenGates(domainName),
  });

  const {
    data: memberData,
    isLoading: memberDataLoading,
    isError: memberDataError,
  } = useQuery({
    queryKey: ["clubMembership", domainName, address],
    enabled: !!address,
    queryFn: () =>
      web3ClubService.clubMembershipQueryClient.checkDetailedMembership(
        domainName,
        address!
      ),
  });

  return {
    yearPrice,
    monthPrice,
    quarterPrice,
    verifyData,
    memberData,
    isLoading: {
      yearPrice: yearPriceLoading,
      monthPrice: monthPriceLoading,
      quarterPrice: quarterPriceLoading,
      verifyData: verifyDataLoading,
      memberData: memberDataLoading,
    },
    isError: {
      yearPrice: yearPriceError,
      monthPrice: monthPriceError,
      quarterPrice: quarterPriceError,
      verifyData: verifyDataError,
      memberData: memberDataError,
    },
  };
}

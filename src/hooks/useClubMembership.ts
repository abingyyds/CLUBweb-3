import { useState } from "react";
import { toast } from "sonner";
import { useWeb3ClubService } from "../components/AppkitProvider";

export interface UseClubMembershipProps {
  domainName: string;
  memberData?: any;
  yearPrice?: string;
  monthPrice?: string;
  quarterPrice?: string;
}

export interface UseClubMembershipReturn {
  // Modal 状态
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  pendingJoinType: string | null;
  setPendingJoinType: (type: string | null) => void;
  pendingVerifyData: any;
  setPendingVerifyData: (data: any) => void;
  isVerifyMode: boolean;
  setIsVerifyMode: (mode: boolean) => void;
  
  // 购买相关方法
  executePurchase: (type: string) => Promise<void>;
  handleJoin: (type: string) => Promise<void>;
  handleConfirmJoin: () => Promise<void>;
  
  // 验证相关方法
  executeVerification: (it: any) => Promise<void>;
  handleVerify: (it: any) => Promise<void>;
  handleConfirmVerify: () => Promise<void>;
}

export function useClubMembership({
  domainName,
  memberData,
  yearPrice,
  monthPrice,
  quarterPrice,
}: UseClubMembershipProps): UseClubMembershipReturn {
  const web3ClubService = useWeb3ClubService();
  
  // Modal 相关状态
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingJoinType, setPendingJoinType] = useState<string | null>(null);
  const [pendingVerifyData, setPendingVerifyData] = useState<any>(null);
  const [isVerifyMode, setIsVerifyMode] = useState(false);

  // 执行实际的购买逻辑
  const executePurchase = async (type: string) => {
    try {
      if (type === "lifetime") {
        await web3ClubService.clubPassFactoryClient.purchaseMembershipFor(
          domainName
        );
      } else if (type === "month") {
        await web3ClubService.temporaryMembershipClient.purchaseMembership(
          domainName,
          monthPrice || "0"
        );
      } else if (type === "quarter") {
        await web3ClubService.temporaryMembershipClient.purchaseQuarterMembership(
          domainName,
          quarterPrice || "0"
        );
      } else if (type === "year") {
        await web3ClubService.temporaryMembershipClient.purchaseYearMembership(
          domainName,
          yearPrice || "0"
        );
      }
      toast.success("Purchase successful");
    } catch (error: any) {
      toast.error(error.message || "Purchase failed");
    }
  };

  // 检查会员状态并决定是否显示 Modal
  const handleJoin = async (type: string) => {
    // 检查用户是否已有会员身份
    const hasExistingMembership =
      memberData?.isPermanent || memberData?.isTemporary;

    if (hasExistingMembership) {
      // 如果已有会员身份，显示确认 Modal
      setPendingJoinType(type);
      setModalOpen(true);
    } else {
      // 如果没有会员身份，直接执行购买
      await executePurchase(type);
    }
  };

  // 处理 Modal 确认
  const handleConfirmJoin = async () => {
    if (isVerifyMode && pendingVerifyData) {
      // 验证模式
      await handleConfirmVerify();
    } else if (pendingJoinType) {
      // 加入模式
      setModalOpen(false);
      await executePurchase(pendingJoinType);
      setPendingJoinType(null);
    }
  };

  // 执行实际的验证逻辑
  const executeVerification = async (it: any) => {
    try {
      await web3ClubService.simpleCrossChainVerificationClient.requestVerification(
        domainName,
        it.chainId,
        it.crossChainAddress
      );
      toast.success("Verification successful");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message || "Verification failed");
    }
  };

  // 检查会员状态并决定是否显示 Modal
  const handleVerify = async (it: any) => {
    // 检查用户是否已有 Token Based 会员身份
    const hasTokenBasedMembership = memberData?.isTokenBased;

    if (hasTokenBasedMembership) {
      // 如果已有 Token Based 会员身份，显示确认 Modal
      setPendingVerifyData(it);
      setIsVerifyMode(true);
      setModalOpen(true);
    } else {
      // 如果没有 Token Based 会员身份，直接执行验证
      await executeVerification(it);
    }
  };

  // 处理 Modal 确认验证
  const handleConfirmVerify = async () => {
    if (pendingVerifyData) {
      setModalOpen(false);
      await executeVerification(pendingVerifyData);
      setPendingVerifyData(null);
      setIsVerifyMode(false);
    }
  };

  return {
    // Modal 状态
    modalOpen,
    setModalOpen,
    pendingJoinType,
    setPendingJoinType,
    pendingVerifyData,
    setPendingVerifyData,
    isVerifyMode,
    setIsVerifyMode,
    
    // 购买相关方法
    executePurchase,
    handleJoin,
    handleConfirmJoin,
    
    // 验证相关方法
    executeVerification,
    handleVerify,
    handleConfirmVerify,
  };
}
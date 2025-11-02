import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { ArrowRight, X } from "lucide-react";

interface MemberData {
  isPermanent: boolean;
  isTemporary: boolean;
  isTokenBased: boolean;
  isCrossChain: boolean;
}

export const MemberModal = ({
  open,
  setOpen,
  data = {
    isPermanent: false,
    isTemporary: true,
    isTokenBased: false,
    isCrossChain: false,
  },
  isVerifyMode = false,
  onConfirm,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  data?: MemberData;
  isVerifyMode?: boolean;
  onConfirm: () => void;
}) => {
  // 根据数据生成会员类型列表
  const getMemberTypes = () => {
    const types = [];
    if (data?.isTemporary) {
      types.push("Temporary Member");
    }
    if (data?.isPermanent) {
      types.push("Permanent Member");
    }
    if (data?.isTokenBased) {
      types.push("Token Holder");
    }
    if (data?.isCrossChain) {
      types.push("Cross Chain Member");
    }
    return types;
  };

  const memberTypes = getMemberTypes();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[90vw] md:w-[640px] bg-[#f8f8f8] border-none rounded-[10px] p-0 gap-0">
        <div className="flex flex-col px-6 md:px-[60px] py-[40px] gap-5">
          {/* 标题 */}
          <DialogHeader className="p-0">
            <DialogTitle className="text-black text-[24px] font-bold text-center leading-[26px]">
              Alert
            </DialogTitle>
          </DialogHeader>

          {/* 内容区域 */}
          <div className="flex flex-col gap-5">
            <p className="text-black text-base font-normal">
              You already have the following access:
            </p>

            {/* 会员类型列表 */}
            <div className="text-[#ffbb33] text-base font-bold leading-relaxed">
              {memberTypes.map((type, index) => (
                <div key={index}>
                  {type}
                  {index < memberTypes.length - 1 && <br />}
                </div>
              ))}
            </div>

            <p className="text-black text-base font-normal leading-[22px]">
              {isVerifyMode
                ? "Do you still want to verify again?"
                : "Do you still want to join this club again?"}
            </p>

            {/* 按钮区域 */}
            <div className="flex gap-5 mt-0">
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  className="flex-1 bg-white hover:bg-gray-50 text-[#121212] text-base font-semibold rounded-[5px] h-auto py-[5px] px-[19px] border border-black/10 shadow-[0px_4px_9px_0px_rgba(0,0,0,0.05),0px_2px_3px_0px_rgba(0,0,0,0.07),0px_0px_1px_0px_rgba(0,0,0,0.12)]"
                  style={{ letterSpacing: "0.01px", lineHeight: "23px" }}
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button
                onClick={onConfirm}
                className="flex-1 bg-[#121212] hover:bg-[#121212]/90 text-white text-base font-semibold rounded-[5px] h-auto py-[6px] px-[10px] shadow-[0px_0px_1px_0px_rgba(0,0,0,0.12),0px_2px_3px_0px_rgba(0,0,0,0.07),0px_4px_9px_0px_rgba(0,0,0,0.05)] flex items-center justify-center gap-[5px]"
                style={{ letterSpacing: "0.01px", lineHeight: "23px" }}
              >
                Confirm
                <ArrowRight className="w-6 h-6 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

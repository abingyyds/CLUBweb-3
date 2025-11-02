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
      <DialogContent className="w-[90vw] md:w-[640px] bg-[#0b0b0d] border-none rounded-[40px] p-0 gap-0">
        <div className="flex flex-col px-6 md:px-[60px] py-[40px] gap-5">
          {/* 标题 */}
          <DialogHeader className="p-0">
            <DialogTitle className="text-white text-[30px] font-bold text-center leading-[33px]">
              Alert
            </DialogTitle>
          </DialogHeader>

          {/* 内容区域 */}
          <div className="flex flex-col gap-5">
            <p className="text-white text-base font-medium">
              You already have the following access:
            </p>

            {/* 会员类型列表 */}
            <div className="text-[#bfea52] text-base font-bold leading-relaxed">
              {memberTypes.map((type, index) => (
                <div key={index}>
                  {type}
                  {index < memberTypes.length - 1 && <br />}
                </div>
              ))}
            </div>

            <p className="text-white text-base font-medium leading-[19px]">
              {isVerifyMode
                ? "Do you still want to verify again?"
                : "Do you still want to join this club again?"}
            </p>

            {/* 按钮区域 */}
            <div className="flex gap-5 mt-0">
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  className="flex-1 bg-[#bfea52] hover:bg-[#bfea52]/90 text-black text-sm font-bold uppercase tracking-[0.28px] rounded-[20px] h-auto py-[5px] px-[15px]"
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button
                onClick={onConfirm}
                className="flex-1 bg-[#bfea52] hover:bg-[#bfea52]/90 text-black text-sm font-bold uppercase tracking-[0.28px] rounded-[20px] h-auto py-[5px] pl-[15px] pr-[5px] flex items-center justify-center gap-2.5"
              >
                Confirm
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-black" />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

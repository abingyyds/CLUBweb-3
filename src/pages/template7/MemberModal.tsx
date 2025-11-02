import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { ChevronsRight, X } from "lucide-react";

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
      <DialogContent className="w-[90vw] md:w-[640px] bg-[#454c5b] border-none rounded-[2px] p-0 gap-0 h-[410px]">
        <div className="flex flex-col px-6 md:px-[60px] py-0 gap-[5px] h-full justify-center">
          {/* 标题 */}
          <DialogHeader className="p-0">
            <DialogTitle
              className="text-white text-[30px] font-bold text-center leading-[33px]"
              style={{
                fontFamily:
                  '"IBM Plex Mono", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              }}
            >
              Alert
            </DialogTitle>
          </DialogHeader>

          {/* 内容区域 */}
          <div className="flex flex-col pt-[40px] pb-[10px] gap-5">
            <p
              className="text-white text-base font-medium"
              style={{
                fontFamily:
                  '"IBM Plex Mono", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              }}
            >
              You already have the following access:
            </p>

            {/* 会员类型列表 */}
            <div
              className="text-[#ffc130] text-base font-bold leading-relaxed"
              style={{
                fontFamily:
                  '"IBM Plex Mono", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              }}
            >
              {memberTypes.map((type, index) => (
                <div key={index}>
                  {type}
                  {index < memberTypes.length - 1 && <br />}
                </div>
              ))}
            </div>

            <p
              className="text-white text-base font-medium leading-[21px]"
              style={{
                fontFamily:
                  '"IBM Plex Mono", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              }}
            >
              {isVerifyMode
                ? "Do you still want to verify again?"
                : "Do you still want to join this club again?"}
            </p>

            {/* 按钮区域 */}
            <div className="flex gap-5 mt-0">
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  className="flex-1 bg-[#f38406] hover:bg-[#f38406]/90 text-white text-base font-normal rounded-[32px] h-auto py-[14px] px-[30px] border-2 border-[#f38406] flex items-center justify-center gap-4"
                  style={{
                    fontFamily:
                      'Ubuntu, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                    fontSize: "16px",
                    lineHeight: "24px",
                  }}
                >
                  Cancel
                  <ChevronsRight className="w-6 h-6 text-white" />
                </Button>
              </DialogClose>

              <Button
                onClick={onConfirm}
                className="flex-1 bg-[#f38406] hover:bg-[#f38406]/90 text-white text-base font-normal rounded-[32px] h-auto py-[14px] px-[30px] border-2 border-[#f38406] flex items-center justify-center gap-4"
                style={{
                  fontFamily:
                    'Ubuntu, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                  fontSize: "16px",
                  lineHeight: "24px",
                }}
              >
                Confirm
                <ChevronsRight className="w-6 h-6 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

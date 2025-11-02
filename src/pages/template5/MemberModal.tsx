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
      <DialogContent className="w-[90vw] md:w-[640px] h-[353px] bg-[#f0f0f0] border-none rounded-none p-0 gap-0 flex flex-col">
        {/* 标题区域 - 带边框 */}
        <div className="flex-shrink-0 border-t-2 border-t-[#000000cc] bg-[#f0f0f0] pt-[2px]">
          <div className="relative flex-grow flex items-center justify-between border-y border-y-[#000000cc] py-[9px] w-[640px] min-w-[640px]">
            <DialogHeader className="p-0 flex-grow">
              <DialogTitle 
                className="text-[#000000cc] text-[22px] font-semibold text-center leading-[29px]"
                style={{ fontFamily: '"Poltawski Nowy", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif' }}
              >
                Alert
              </DialogTitle>
            </DialogHeader>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="flex flex-col flex-shrink-0 items-start self-stretch rounded-[2px] bg-[#f0f0f0] px-6 md:px-[60px] py-[40px] gap-5">
          <p 
            className="flex-shrink-0 w-[431px] text-[#000000] text-base font-medium"
            style={{ 
              fontFamily: '"Poltawski Nowy", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              letterSpacing: '0'
            }}
          >
            You already have the following access:
          </p>

          {/* 会员类型列表 */}
          <div 
            className="flex-shrink-0 w-[431px] text-[#000000] text-base font-bold"
            style={{ 
              fontFamily: '"Poltawski Nowy", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              letterSpacing: '0'
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
            className="flex-shrink-0 text-[#000000] text-base font-medium leading-[21px]"
            style={{ 
              fontFamily: '"Poltawski Nowy", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              letterSpacing: '0'
            }}
          >
            {isVerifyMode
              ? "Do you still want to verify again?"
              : "Do you still want to join this club again?"}
          </p>

          {/* 按钮区域 */}
          <div className="flex flex-shrink-0 items-start self-stretch gap-5">
            <DialogClose asChild>
              <Button
                variant="ghost"
                className="flex-grow flex items-center justify-center gap-[10px] rounded-[2px] bg-[#454545] hover:bg-[#454545]/90 px-5 py-2 h-auto"
                style={{ 
                  fontFamily: '"Poltawski Nowy", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif'
                }}
              >
                <span 
                  className="flex-shrink-0 text-[#ffffff] text-sm font-medium uppercase leading-[18px]"
                  style={{ letterSpacing: '0' }}
                >
                  Cancel
                </span>
              </Button>
            </DialogClose>

            <Button
              onClick={onConfirm}
              className="flex-grow flex items-center justify-center gap-[10px] rounded-[2px] bg-[#454545] hover:bg-[#454545]/90 px-5 py-2 h-auto"
              style={{ 
                fontFamily: '"Poltawski Nowy", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif'
              }}
            >
              <span 
                className="flex-shrink-0 text-[#ffffff] text-sm font-medium uppercase leading-[18px]"
                style={{ letterSpacing: '0' }}
              >
                Confirm
              </span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

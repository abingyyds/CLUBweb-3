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
      <DialogContent className="w-[90vw] md:w-[640px] h-[347px] bg-white border-none rounded-[40px] p-0 gap-0 flex flex-col justify-center">
        <div className="flex flex-col px-6 md:px-[60px] gap-5">
          {/* 标题 */}
          <DialogHeader className="p-0">
            <DialogTitle 
              className="text-black text-[30px] font-bold text-center leading-[33px]"
              style={{ 
                fontFamily: 'Inter, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                letterSpacing: '0'
              }}
            >
              Alert
            </DialogTitle>
          </DialogHeader>

          {/* 内容区域 */}
          <div className="flex flex-col gap-5">
            <p 
              className="text-black text-base font-medium w-[431px]"
              style={{ 
                fontFamily: 'Inter, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                letterSpacing: '0'
              }}
            >
              You already have the following access:
            </p>

            {/* 会员类型列表 */}
            <div 
              className="text-[#aa2f80] text-base font-bold w-[431px]"
              style={{ 
                fontFamily: 'Inter, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
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
              className="text-black text-base font-medium leading-[19px]"
              style={{ 
                fontFamily: 'Inter, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                letterSpacing: '0'
              }}
            >
              {isVerifyMode
                ? "Do you still want to verify again?"
                : "Do you still want to join this club again?"}
            </p>

            {/* 按钮区域 */}
            <div className="flex gap-5 justify-center">
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  className="flex-1 bg-[#f4b0df] hover:bg-[#f4b0df]/90 text-black text-base font-medium rounded-[50px] h-[40px] py-0 px-0 border-none shadow-none flex items-center justify-between"
                  style={{ 
                    fontFamily: '"Alimama FangYuanTi VF", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                    letterSpacing: '0',
                    lineHeight: '16px',
                    padding: '10px 10px 10px 50px'
                  }}
                >
                  <span className="w-[150px] text-center">Cancel</span>
                  <ArrowRight className="w-5 h-5 text-black" />
                </Button>
              </DialogClose>

              <Button
                onClick={onConfirm}
                className="flex-1 bg-[#aa2f80] hover:bg-[#aa2f80]/90 text-white text-base font-medium rounded-[50px] h-[40px] py-0 px-0 border-none shadow-none flex items-center justify-between"
                style={{ 
                  fontFamily: '"Alimama FangYuanTi VF", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                  letterSpacing: '0',
                  lineHeight: '16px',
                  padding: '10px 10px 10px 50px'
                }}
              >
                <span className="w-[150px] text-center">Confirm</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

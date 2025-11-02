import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { X } from "lucide-react";

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
      <DialogContent className="w-[90vw] md:w-[640px] h-[353px] bg-white border-none rounded-[40px] p-0 gap-0 flex flex-col justify-center">
        <div className="flex flex-col px-6 md:px-[60px] gap-5">
          {/* 标题 */}
          <DialogHeader className="p-0">
            <DialogTitle
              className="text-black text-center"
              style={{
                fontFamily:
                  'Inter, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                fontSize: "30px",
                fontWeight: 700,
                lineHeight: "33px",
                letterSpacing: "0",
              }}
            >
              Alert
            </DialogTitle>
          </DialogHeader>

          {/* 内容区域 */}
          <div className="flex flex-col gap-5">
            <p
              className="text-black w-[431px]"
              style={{
                fontFamily:
                  'Inter, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                fontSize: "16px",
                fontWeight: 500,
                letterSpacing: "0",
              }}
            >
              You already have the following access:
            </p>

            {/* 会员类型列表 */}
            <div
              className="text-[#2aada5] w-[431px]"
              style={{
                fontFamily:
                  'Inter, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                fontSize: "16px",
                fontWeight: 700,
                letterSpacing: "0",
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
              className="text-black"
              style={{
                fontFamily:
                  'Inter, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                fontSize: "16px",
                fontWeight: 500,
                lineHeight: "19px",
                letterSpacing: "0",
              }}
            >
              {isVerifyMode
                ? "Do you still want to verify again?"
                : "Do you still want to join this club again?"}
            </p>

            {/* 按钮区域 */}
            <div className="flex gap-[10px] mt-0">
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  className="flex-1 bg-transparent hover:bg-transparent text-[#2aada5] border-2 border-[#2aada5] rounded-[40px] h-auto flex items-center justify-center gap-[10px] self-stretch"
                  style={{
                    fontFamily:
                      'Manrope, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                    fontSize: "16px",
                    fontWeight: 800,
                    lineHeight: "16px",
                    letterSpacing: "0",
                    padding: "13px 42px",
                  }}
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button
                onClick={onConfirm}
                className="flex-1 bg-[#2aada5] hover:bg-[#2aada5]/90 text-white rounded-[40px] h-auto flex items-center justify-center gap-[10px] self-stretch"
                style={{
                  fontFamily:
                    'Manrope, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                  fontSize: "16px",
                  fontWeight: 800,
                  lineHeight: "16px",
                  letterSpacing: "0",
                  padding: "15px 44px",
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

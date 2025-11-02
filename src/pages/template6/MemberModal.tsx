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
      <DialogContent
        className="w-[90vw] md:w-[640px] border-4 border-[#ef5da8] !rounded-[40px] bg-white gap-0 p-0"
        style={{ height: "357px" }}
      >
        <div
          className="flex flex-col px-6 md:px-[60px] justify-center rounded-[40px] bg-[#fde2ff] relative"
          style={{
            height: "347px",
            gap: "20px",
            backgroundImage:
              "linear-gradient(180deg, #ef5da866 0%, #ef5da800 100%)",
          }}
        >
          {/* 标题 */}
          <DialogHeader className="p-0">
            <DialogTitle
              className="text-black text-center font-bold"
              style={{
                fontFamily:
                  'Inter, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                fontSize: "30px",
                fontWeight: "700",
                lineHeight: "33px",
                letterSpacing: "0",
              }}
            >
              Alert
            </DialogTitle>
          </DialogHeader>

          {/* 内容区域 */}
          <div className="flex flex-col" style={{ gap: "20px" }}>
            <p
              className="text-black"
              style={{
                fontFamily:
                  'Inter, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                fontSize: "16px",
                fontWeight: "500",
                letterSpacing: "0",
                width: "431px",
              }}
            >
              You already have the following access:
            </p>

            {/* 会员类型列表 */}
            <div
              className="text-[#aa2f80]"
              style={{
                fontFamily:
                  'Inter, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                fontSize: "16px",
                fontWeight: "700",
                letterSpacing: "0",
                width: "431px",
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
                fontWeight: "500",
                lineHeight: "19px",
                letterSpacing: "0",
              }}
            >
              {isVerifyMode
                ? "Do you still want to verify again?"
                : "Do you still want to join this club again?"}
            </p>

            {/* 按钮区域 */}
            <div
              className="flex items-center justify-center"
              style={{ gap: "20px" }}
            >
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  className="flex-1 bg-[#f4b0df] hover:bg-[#f4b0df]/90 text-black rounded-[50px] h-[40px] flex items-center justify-between border-none shadow-none"
                  style={{
                    padding: "10px 10px 10px 50px",
                    fontFamily:
                      '"Alimama FangYuanTi VF", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                    fontSize: "16px",
                    fontWeight: "500",
                    lineHeight: "16px",
                    letterSpacing: "0",
                  }}
                >
                  <span style={{ width: "145px", textAlign: "center" }}>
                    Cancel
                  </span>
                  <ArrowRight className="w-5 h-5 text-black" />
                </Button>
              </DialogClose>

              <Button
                onClick={onConfirm}
                className="flex-1 bg-[#aa2f80] hover:bg-[#aa2f80]/90 text-white rounded-[50px] h-[40px] flex items-center justify-between border-none shadow-none"
                style={{
                  padding: "10px 10px 10px 50px",
                  fontFamily:
                    '"Alimama FangYuanTi VF", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                  fontSize: "16px",
                  fontWeight: "500",
                  lineHeight: "16px",
                  letterSpacing: "0",
                }}
              >
                <span style={{ width: "145px", textAlign: "center" }}>
                  Confirm
                </span>
                <ArrowRight className="w-5 h-5 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

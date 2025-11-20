import { cn, shortenAddress } from "@/lib/utils";
import { useAppKit, useWalletInfo } from "@reown/appkit/react";
import { useAccount } from "wagmi";

export const ConnectButton = ({
  className,
  icon,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
  icon?: string;
}) => {
  const { open, close } = useAppKit();
  const { walletInfo } = useWalletInfo();
  const { address } = useAccount();

  return (
    <div
      style={style}
      onClick={() => open()}
      className={cn(
        "text-black text-sm font-bold cursor-pointer inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#bfea52] px-4 py-1.5",
        className
      )}
    >
      {walletInfo?.name ? (
        <>
          <img src={walletInfo.icon} alt={walletInfo.name} className="size-4" />
          <span>{shortenAddress(address || "")}</span>
        </>
      ) : (
        <p className=" uppercase tracking-wider">Connect Wallet</p>
      )}

      {icon && (
        <img src={icon || "/arrow.png"} className="w-6 h-6" alt="Arrow" />
      )}
    </div>
  );
};

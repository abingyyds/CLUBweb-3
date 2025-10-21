import { shortenAddress } from "@/lib/utils";
import { useAppKit, useWalletInfo } from "@reown/appkit/react";
import { useAccount } from "wagmi";

export const ConnectButton = ({ className }: { className?: string }) => {
  const { open, close } = useAppKit();
  const { walletInfo } = useWalletInfo();
  const { address } = useAccount();

  return (
    <div
      onClick={() => open()}
      className={`cursor-pointer inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#bfea52] px-4 py-1.5 ${className}`}
    >
      {walletInfo?.name ? (
        <>
          <img src={walletInfo.icon} alt={walletInfo.name} className="size-4" />
          <span>{shortenAddress(address || "")}</span>
        </>
      ) : (
        <p className="text-black text-sm font-bold uppercase tracking-wider">
          Connect Wallet
        </p>
      )}

      <img src="/arrow.png" className="w-6 h-6" alt="Arrow" />
    </div>
  );
};

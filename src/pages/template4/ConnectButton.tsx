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
      className={`inline-flex h-[85px] items-center gap-2.5 bg-[#f2b1dc] text-black text-2xl font-bold uppercase px-11 py-8 rounded-[40px] hover:opacity-90 transition-opacity`}
    >
      {walletInfo?.name ? (
        <>
          {walletInfo.icon && (
            <img
              src={walletInfo.icon}
              alt={walletInfo.name}
              className="size-4"
            />
          )}
          <span>{shortenAddress(address || "")}</span>
        </>
      ) : (
        <p className="text-black text-sm font-bold uppercase tracking-wider">
          Connect Wallet
        </p>
      )}

      <img src="/arrow_up_black.png" className="w-6 h-6" alt="Arrow" />
    </div>
  );
};

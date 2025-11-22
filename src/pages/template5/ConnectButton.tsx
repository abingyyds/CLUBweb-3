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
      className={`flex gap-2 items-center bg-[#454545] text-white text-sm font-medium uppercase tracking-wider px-5 py-2.5 hover:bg-[#555] transition-colors`}
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
        <p className="text-white text-sm font-bold uppercase tracking-wider">
          Connect Wallet
        </p>
      )}
    </div>
  );
};

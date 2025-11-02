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
      className={`bg-teal-500 w-full max-w-lg lg:w-72 rounded-[50px] px-6 py-4 flex items-center justify-center gap-2 cursor-pointer hover:bg-teal-600 transition-colors order-2 lg:order-1`}
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

      <img src="/arrow_right_up_line.png" className="w-6 h-6" alt="Arrow" />
    </div>
  );
};

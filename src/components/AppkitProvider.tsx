import { createAppKit } from "@reown/appkit/react";
import { useWalletClient, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { createContext, ReactNode, useContext, useMemo } from "react";
import { Web3ClubService } from "@/services/Web3ClubService";
import { globalConfig } from "@/constants";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Get projectId from https://dashboard.reown.com
const projectId = "6b037f0da1f5fe47510a11cbdb5bca85";

// 2. Create a metadata object - optional
const metadata = {
  name: "Web3 Club",
  description: "Web3 Club",
  url: "https://example.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// 3. Set the networks
const networks = [globalConfig.chain];

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
});

// 5. Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks: networks as any,
  projectId,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

export const Web3ClubContext = createContext<Web3ClubService>(
  {} as Web3ClubService
);

export const Web3ClubProvider = ({ children }: { children: ReactNode }) => {
  const { data: walletClient } = useWalletClient();
  const web3ClubService = useMemo(() => {
    return new Web3ClubService({
      walletClient,
    });
  }, [walletClient]);
  return (
    <Web3ClubContext.Provider value={web3ClubService}>
      {children}
    </Web3ClubContext.Provider>
  );
};

export const useWeb3ClubService = () => {
  return useContext(Web3ClubContext);
};

export function AppKitProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Web3ClubProvider>{children}</Web3ClubProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

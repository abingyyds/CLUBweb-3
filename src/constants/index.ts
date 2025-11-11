import {
  arbitrum,
  avalanche,
  base as baseViem,
  baseSepolia,
  blast,
  bsc,
  celo,
  linea,
  mainnet,
  mantle,
  optimism,
  polygon,
  sepolia,
  zksync,
} from "viem/chains";

const isDev = false;

const base = {
  ...baseViem,
  rpcUrls: {
    default: {
      http: ["https://base.drpc.org"],
    },
  },
};

const chainConfig = isDev
  ? {
      clubPassFactoryAddress: "0xa3a0f01fbdaf3a978cccb28a6b3faef08c6c9538",
      simpleCrossChainAddress: "0x0f3a6c82947b058d338661d8fce6d60917702cac",
      temporaryMembershipAddress: "0xc134c3c580322d11105154b51d34292e3b232f98",
      tokenBasedAccessAddress: "0x14d7c26abc66381c48d6230eebd6f8f5d3d695a4",
      clubMembershipQueryAddress: "0x86f58916465db0ba42e5de888ae3b67a30d1473b",
      web3ClubNFTAddress: "0x60492632baF5a2b21F858b42FCA660FEB6276d0F",
      chain: sepolia,
    }
  : {
      clubPassFactoryAddress: "0xf8e50140d0bde31b63ab06b9082ad1ed512425c1",
      simpleCrossChainAddress: "0x85a803becb816c01c880cbb5a2d782d4d1b2b002",
      temporaryMembershipAddress: "0xa626e40f61e3fb3c56c25333fd6c46477a6f650f",
      tokenBasedAccessAddress: "0x8a734d99260543f67f922f2e1575f052b117878e",
      clubMembershipQueryAddress: "0xe61daf23a61baad29b97e717c696bb1d0db33d3e",
      web3ClubNFTAddress: "0xd4b4aEf79F6652e42306F574B91B181087b3c93A",
      chain: base,
    };

export const globalConfig = {
  ...chainConfig,
  supportChains: [
    sepolia,
    baseSepolia,
    mainnet,
    polygon,
    base,
    arbitrum,
    optimism,
    bsc,
    avalanche,
    linea,
    blast,
    scroll,
    mantle,
    zksync,
    celo,
  ],
};

export const supabaseConfig = isDev
  ? {
      apiUrl: "https://xenmczlvsgymaniljwhg.supabase.co",
      apiKey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhlbm1jemx2c2d5bWFuaWxqd2hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjIyNjEsImV4cCI6MjA3NzgzODI2MX0.R_TtdjXCT-mm7V6gXgeIIwGUqWEMtwtT-y309URpOZY",
    }
  : {
      apiUrl: "https://smizqaxkhiwcywsjgevi.supabase.co",
      apiKey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtaXpxYXhraGl3Y3l3c2pnZXZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4Njc1NjMsImV4cCI6MjA3ODQ0MzU2M30.zuKpqk3OLrHvpDsI9z1JbHLLPs8kspvWCpyKOr8mA7I",
    };

import {
  arbitrum,
  avalanche,
  base,
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

export const globalConfig = {
  clubPassFactoryAddress: "0xa3a0f01fbdaf3a978cccb28a6b3faef08c6c9538",
  simpleCrossChainAddress: "0x0f3a6c82947b058d338661d8fce6d60917702cac",
  temporaryMembershipAddress: "0xc134c3c580322d11105154b51d34292e3b232f98",
  tokenBasedAccessAddress: "0x14d7c26abc66381c48d6230eebd6f8f5d3d695a4",
  clubMembershipQueryAddress: "0x86f58916465db0ba42e5de888ae3b67a30d1473b",
  web3ClubNFTAddress: "0x25fda59dfba96c8cc4e502b4010a0f70c036a78d",
  chain: sepolia,
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

export const supabaseConfig = {
  apiUrl: "https://xenmczlvsgymaniljwhg.supabase.co",
  apiKey:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhlbm1jemx2c2d5bWFuaWxqd2hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyNjIyNjEsImV4cCI6MjA3NzgzODI2MX0.R_TtdjXCT-mm7V6gXgeIIwGUqWEMtwtT-y309URpOZY",
};

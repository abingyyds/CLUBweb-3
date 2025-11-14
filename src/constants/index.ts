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
      clubPassFactoryAddress: "0x27d7E9855250d6Bc84850377E533219FB8794b92",
      simpleCrossChainAddress: "0x8cEdb654f2D0157276b9E44c610b0c967C211a84",
      temporaryMembershipAddress: "0xFb5567Aaf6057bbf5D729d35f56C5688B36cC940",
      tokenBasedAccessAddress: "0xd286EE3fD7115aB0bf1dC99f8Ce8685EAE200372",
      clubMembershipQueryAddress: "0x2A152405afB201258D66919570BbD4625455a65f",
      web3ClubNFTAddress: "0xe51DaB702d2A49791488d259CebbA583437727b5",
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

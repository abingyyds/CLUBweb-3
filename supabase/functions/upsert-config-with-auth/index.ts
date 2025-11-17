import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  createPublicClient,
  http,
  getAddress,
  verifyMessage,
} from "https://esm.sh/viem@2.38.0";
import { base } from "https://esm.sh/viem@2.38.0/chains";

// 从环境变量获取配置
export const supabaseConfig = {
  chain: base,
  web3ClubNFTAddress: "0xcfd62018ad4d06856df3b4ac731acca316efd5a2",
  apiUrl: "https://smizqaxkhiwcywsjgevi.supabase.co",
  apiKey: "",
};

// Web3ClubNFT ABI
const WEB3_CLUB_NFT_ABI = [
  {
    inputs: [{ internalType: "string", name: "domainName", type: "string" }],
    name: "getTokenId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

const TABLE = "club_configs";

// 验证签名
async function verifySignature(
  message: string,
  signature: `0x${string}`,
  address: `0x${string}`
): Promise<boolean> {
  try {
    const isValid = await verifyMessage({
      address,
      message,
      signature,
    });
    return isValid;
  } catch (error) {
    console.error("Error verifying signature:", error);
    return false;
  }
}

// 验证 NFT ownership
async function verifyDomainOwner(
  domainName: string,
  walletAddress: string
): Promise<boolean> {
  try {
    const publicClient = createPublicClient({
      chain: base,
      transport: http(),
    });

    // 1. 获取 domain 对应的 tokenId
    const tokenId = (await publicClient.readContract({
      address: supabaseConfig.web3ClubNFTAddress as `0x${string}`,
      abi: WEB3_CLUB_NFT_ABI,
      functionName: "getTokenId",
      args: [domainName],
    })) as bigint;

    // 2. 验证 tokenId 是否存在
    if (!tokenId || tokenId === 0n) {
      console.log(`Domain ${domainName} not found or not registered`);
      return false;
    }

    // 3. 获取 token 的 owner
    const owner = (await publicClient.readContract({
      address: supabaseConfig.web3ClubNFTAddress as `0x${string}`,
      abi: WEB3_CLUB_NFT_ABI,
      functionName: "ownerOf",
      args: [tokenId],
    })) as `0x${string}`;

    // 4. 验证 owner 是否为当前钱包（忽略大小写）
    const isOwner = getAddress(owner) === getAddress(walletAddress);
    console.log(
      `Domain ${domainName} owner: ${owner}, wallet: ${walletAddress}, isOwner: ${isOwner}`
    );
    return isOwner;
  } catch (error) {
    console.error("Error verifying domain owner:", error);
    return false;
  }
}

serve(async (req) => {
  // 处理 CORS
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    const { config, domainName, walletAddress, signature, message } =
      await req.json();

    // 验证输入
    if (!config || !domainName || !walletAddress || !signature || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // 1. 验证签名
    const isSignatureValid = await verifySignature(
      message,
      signature as `0x${string}`,
      walletAddress as `0x${string}`
    );
    if (!isSignatureValid) {
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // 2. 验证 NFT ownership
    const isOwner = await verifyDomainOwner(domainName, walletAddress);
    if (!isOwner) {
      return new Response(JSON.stringify({ error: "Not the domain owner" }), {
        status: 403,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    // 3. 使用 Service Role Key 写入数据库
    const supabase = createClient(
      supabaseConfig.apiUrl,
      supabaseConfig.apiKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    const payload = {
      domain_name: domainName,
      config,
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from(TABLE)
      .upsert(payload, { onConflict: "domain_name" })
      .select();

    if (error) {
      console.error("Error saving config:", error);
      return new Response(
        JSON.stringify({
          error: "Failed to save config",
          details: error.message,
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // 4. 返回成功响应
    return new Response(
      JSON.stringify({
        success: true,
        domainName,
        message: "Config saved successfully",
        data,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
});

import { supabase } from "../lib/supabaseClient";
import { ITheme } from "../types";
import { hashMessage, type WalletClient } from "viem";

const TABLE = "club_configs";

export async function getConfig(domainName: string): Promise<ITheme | null> {
  const { data, error } = await supabase
    .from(TABLE)
    .select("config")
    .eq("domain_name", domainName)
    .maybeSingle();

  if (error) {
    // eslint-disable-next-line no-console
    console.error("[getConfig] error:", error.message);
    throw error;
  }

  return (data?.config as ITheme) || null;
}

/**
 * 保存配置（需要钱包签名和 NFT ownership 验证）
 * @param domainName 域名
 * @param config 配置对象
 * @param walletAddress 钱包地址
 * @param walletClient 钱包客户端（用于签名）
 */
export async function upsertConfig(
  domainName: string,
  config: ITheme,
  walletAddress?: `0x${string}`,
  walletClient?: any
): Promise<void> {
  // 如果提供了 walletAddress 和 walletClient，使用 Edge Function 验证
  if (walletAddress && walletClient) {
    try {
      // 1. 生成签名消息
      const timestamp = Date.now();
      const nonce = Math.random().toString(36).substring(7);
      const configHash = hashMessage(JSON.stringify(config));
      const message = `Save config for domain: ${domainName}
Config Hash: ${configHash}
Timestamp: ${timestamp}
Nonce: ${nonce}`;

      // 2. 用户签名
      const signature = await walletClient.signMessage({ message });

      // 3. 调用 Edge Function
      const { data, error, response } = await supabase.functions.invoke(
        "upsert-config-with-auth",
        {
          body: {
            config,
            domainName,
            walletAddress,
            signature,
            message,
          },
        }
      );

      console.log(data, error, response);

      if (error) {
        const body = await response?.json();
        console.error("[upsertConfig] Edge Function error:", body);
        throw new Error(body?.error || "Failed to save config");
      }

      if (!data?.success) {
        throw new Error(data?.error || "Failed to save config");
      }

      return;
    } catch (error: any) {
      console.error("[upsertConfig] error:", error);
      throw error;
    }
  }

  // 如果没有提供钱包信息，直接写入数据库（用于开发或测试）
  // 注意：生产环境应该移除这个逻辑，强制要求钱包签名
  console.warn(
    "[upsertConfig] Warning: Saving config without wallet verification"
  );
  const payload = {
    domain_name: domainName,
    config,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from(TABLE)
    .upsert(payload, { onConflict: "domain_name" });

  if (error) {
    // eslint-disable-next-line no-console
    console.error("[upsertConfig] error:", error.message);
    throw error;
  }
}

export async function listDomains(): Promise<string[]> {
  const { data, error } = await supabase.from(TABLE).select("domain_name");

  if (error) {
    // eslint-disable-next-line no-console
    console.error("[listDomains] error:", error.message);
    throw error;
  }

  return (data || []).map((r: { domain_name: string }) => r.domain_name);
}

export async function deleteConfig(domainName: string): Promise<void> {
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("domain_name", domainName);

  if (error) {
    // eslint-disable-next-line no-console
    console.error("[deleteConfig] error:", error.message);
    throw error;
  }
}

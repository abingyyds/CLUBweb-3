# Supabase Edge Function 设置和部署指南

## 1. Supabase Edge Function 代码位置

Supabase Edge Functions 的代码**直接写在项目目录下**，具体位置是：

```
项目根目录/
├── supabase/
│   ├── functions/           # Edge Functions 目录
│   │   ├── verify-domain-owner/  # 函数名称（也是目录名）
│   │   │   ├── index.ts     # 函数入口文件
│   │   │   └── ...
│   │   └── ...
│   ├── config.toml         # Supabase 配置文件（可选）
│   └── ...
```

## 2. 安装 Supabase CLI

首先需要安装 Supabase CLI 工具：

### macOS / Linux
```bash
brew install supabase/tap/supabase
```

### 或使用 npm
```bash
npm install -g supabase
```

### 验证安装
```bash
supabase --version
```

## 3. 初始化 Supabase 项目

### 3.1 登录 Supabase
```bash
supabase login
```
这会打开浏览器，使用你的 Supabase 账号登录。

### 3.2 链接到现有项目
```bash
# 在项目根目录执行
supabase link --project-ref <你的项目ref>
```

项目 ref 可以在 Supabase 控制台的 Settings → General 中找到（URL 中的 `xenmczlvsgymaniljwhg` 部分）。

### 3.3 初始化本地配置（可选）
如果你想要本地开发环境，可以初始化：
```bash
supabase init
```

这会创建 `supabase/` 目录结构。

## 4. 创建 Edge Function

### 4.1 创建函数
```bash
supabase functions new verify-domain-owner
```

这会在 `supabase/functions/verify-domain-owner/` 目录下创建 `index.ts` 文件。

### 4.2 编写函数代码

编辑 `supabase/functions/verify-domain-owner/index.ts`：

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createPublicClient, http, getAddress } from "https://esm.sh/viem@2.38.0";
import { sepolia } from "https://esm.sh/viem@2.38.0/chains";

// 从环境变量获取配置
const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const clubPassFactoryAddress = Deno.env.get("CLUB_PASS_FACTORY_ADDRESS") ?? "0xa3a0f01fbdaf3a978cccb28a6b3faef08c6c9538";
const rpcUrl = Deno.env.get("RPC_URL") ?? "";

// ClubPassFactory ABI (简化版，只包含需要的函数)
const CLUB_PASS_FACTORY_ABI = [
  {
    inputs: [{ internalType: "string", name: "domainName", type: "string" }],
    name: "getClubPassContract",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "string", name: "domainName", type: "string" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "queryClubMembership",
    outputs: [
      { internalType: "bool", name: "isMember", type: "bool" },
      { internalType: "bool", name: "isActive", type: "bool" },
      { internalType: "uint256", name: "tokenId", type: "uint256" },
      { internalType: "uint256", name: "memberCount", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

// ERC721 ABI (简化版)
const ERC721_ABI = [
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "ownerOf",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

// 验证签名（使用 viem）
async function verifySignature(
  message: string,
  signature: string,
  address: string
): Promise<boolean> {
  try {
    // 这里需要使用 viem 的 verifyMessage 函数
    // 由于 Deno 环境的限制，可能需要使用其他方式验证
    // 或者使用 ethers.js 的 Deno 版本
    const { verifyMessage } = await import("https://esm.sh/viem@2.38.0");
    const isValid = await verifyMessage({
      address: address as `0x${string}`,
      message,
      signature: signature as `0x${string}`,
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
      chain: sepolia,
      transport: http(rpcUrl),
    });

    // 1. 获取 ClubPass 合约地址
    const clubPassAddress = (await publicClient.readContract({
      address: clubPassFactoryAddress as `0x${string}`,
      abi: CLUB_PASS_FACTORY_ABI,
      functionName: "getClubPassContract",
      args: [domainName],
    })) as `0x${string}`;

    // 检查合约地址是否为零地址
    if (clubPassAddress === "0x0000000000000000000000000000000000000000") {
      return false;
    }

    // 2. 查询用户的 tokenId
    const membership = (await publicClient.readContract({
      address: clubPassFactoryAddress as `0x${string}`,
      abi: CLUB_PASS_FACTORY_ABI,
      functionName: "queryClubMembership",
      args: [domainName, walletAddress as `0x${string}`],
    })) as [boolean, boolean, bigint, bigint];

    const tokenId = membership[2];

    // 3. 验证 tokenId 是否存在
    if (!tokenId || tokenId === 0n) {
      return false;
    }

    // 4. 在 ClubPass 合约上验证 owner
    const owner = (await publicClient.readContract({
      address: clubPassAddress,
      abi: ERC721_ABI,
      functionName: "ownerOf",
      args: [tokenId],
    })) as `0x${string}`;

    // 5. 验证 owner 是否为当前钱包
    return getAddress(owner) === getAddress(walletAddress);
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
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    const { walletAddress, domainName, message, signature } = await req.json();

    // 验证输入
    if (!walletAddress || !domainName || !message || !signature) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 1. 验证签名
    const isSignatureValid = await verifySignature(
      message,
      signature,
      walletAddress
    );
    if (!isSignatureValid) {
      return new Response(
        JSON.stringify({ error: "Invalid signature" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 2. 验证 NFT ownership
    const isOwner = await verifyDomainOwner(domainName, walletAddress);
    if (!isOwner) {
      return new Response(
        JSON.stringify({ error: "Not the domain owner" }),
        {
          status: 403,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 3. 创建 Supabase session (使用 service role key)
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // 使用 Admin API 创建自定义 JWT token
    // 这里简化处理，实际应该生成包含 domain_owner 信息的 JWT
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: `${walletAddress}@web3club.local`,
      user_metadata: {
        wallet_address: walletAddress,
        domain_name: domainName,
        domain_owner: true,
      },
    });

    if (authError) {
      // 如果用户已存在，尝试获取用户
      console.log("User might already exist, attempting to get user...");
    }

    // 4. 返回成功响应
    return new Response(
      JSON.stringify({
        success: true,
        walletAddress,
        domainName,
        message: "Authentication successful",
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
      JSON.stringify({ error: "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});
```

## 5. 设置环境变量

### 5.1 在 Supabase 控制台设置

1. 进入 Supabase 控制台
2. 选择你的项目
3. 进入 Settings → Edge Functions
4. 添加以下环境变量：
   - `CLUB_PASS_FACTORY_ADDRESS`: `0xa3a0f01fbdaf3a978cccb28a6b3faef08c6c9538`
   - `RPC_URL`: 你的 RPC 节点 URL（如 Infura、Alchemy 等）

### 5.2 使用 CLI 设置（推荐）

```bash
# 设置环境变量
supabase secrets set CLUB_PASS_FACTORY_ADDRESS=0xa3a0f01fbdaf3a978cccb28a6b3faef08c6c9538
supabase secrets set RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
```

## 6. 部署 Edge Function

### 6.1 部署到生产环境
```bash
supabase functions deploy verify-domain-owner
```

### 6.2 部署所有函数
```bash
supabase functions deploy
```

### 6.3 查看部署状态
```bash
supabase functions list
```

## 7. 本地开发（可选）

### 7.1 启动本地 Supabase（需要 Docker）
```bash
supabase start
```

### 7.2 本地测试 Edge Function
```bash
supabase functions serve verify-domain-owner
```

### 7.3 调用本地函数
```bash
curl -i --location --request POST 'http://localhost:54321/functions/v1/verify-domain-owner' \
  --header 'Authorization: Bearer YOUR_ANON_KEY' \
  --header 'Content-Type: application/json' \
  --data '{
    "walletAddress": "0x...",
    "domainName": "example",
    "message": "Authenticate for domain: example\nNonce: 123456",
    "signature": "0x..."
  }'
```

## 8. 调用 Edge Function

### 8.1 从前端调用

```typescript
// src/services/authService.ts
import { supabase } from '../lib/supabaseClient';

export async function authenticateDomainOwner(
  domainName: string,
  walletAddress: string,
  signature: string,
  message: string
) {
  const { data, error } = await supabase.functions.invoke('verify-domain-owner', {
    body: {
      walletAddress,
      domainName,
      message,
      signature,
    },
  });

  if (error) {
    throw error;
  }

  return data;
}
```

### 8.2 使用 fetch 直接调用

```typescript
const response = await fetch(
  `${supabaseUrl}/functions/v1/verify-domain-owner`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseAnonKey}`,
    },
    body: JSON.stringify({
      walletAddress,
      domainName,
      message,
      signature,
    }),
  }
);

const data = await response.json();
```

## 9. 项目结构建议

```
web3-club/
├── supabase/
│   ├── functions/
│   │   ├── verify-domain-owner/
│   │   │   ├── index.ts
│   │   │   └── deno.json          # Deno 配置文件（可选）
│   │   └── ...
│   └── config.toml                # Supabase 配置（可选）
├── src/
│   └── ...
└── package.json
```

## 10. 注意事项

1. **Deno 环境**：Edge Functions 运行在 Deno 环境中，不是 Node.js
2. **导入方式**：使用 URL 导入，如 `https://esm.sh/...`
3. **环境变量**：使用 `Deno.env.get()` 获取环境变量
4. **类型检查**：Deno 支持 TypeScript，但需要配置 `deno.json`
5. **CORS**：记得处理 CORS 请求
6. **错误处理**：完善错误处理，返回友好的错误信息
7. **日志**：使用 `console.log()` 记录日志，可以在 Supabase 控制台查看

## 11. 调试和监控

### 11.1 查看日志
```bash
supabase functions logs verify-domain-owner
```

### 11.2 在 Supabase 控制台查看
- 进入 Edge Functions 页面
- 点击函数名称
- 查看 Logs 标签页

## 12. 更新和重新部署

```bash
# 修改代码后，重新部署
supabase functions deploy verify-domain-owner

# 或者部署所有函数
supabase functions deploy
```

## 13. 删除函数

```bash
supabase functions delete verify-domain-owner
```

## 14. 常见问题

### Q1: 如何导入本地代码？
A: Edge Functions 不支持直接导入本地代码，需要：
- 将共享代码发布为 npm 包
- 或使用 URL 导入（如 esm.sh）
- 或复制代码到每个函数中

### Q2: 如何处理大型依赖？
A: 使用 Deno 的 import map 或直接使用 URL 导入，Deno 会缓存依赖。

### Q3: 如何测试 Edge Functions？
A: 可以使用 `supabase functions serve` 本地测试，或使用 Supabase 提供的测试工具。

### Q4: 性能如何优化？
A: 
- 使用缓存减少链上调用
- 优化代码逻辑
- 使用批量操作
- 设置合理的超时时间

## 15. 参考资源

- [Supabase Edge Functions 文档](https://supabase.com/docs/guides/functions)
- [Deno 文档](https://deno.land/docs)
- [viem 文档](https://viem.sh/)
- [Supabase CLI 文档](https://supabase.com/docs/reference/cli)


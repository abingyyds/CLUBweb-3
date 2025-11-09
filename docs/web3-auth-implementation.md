# Web3 钱包权限控制实现思路（合并流程版）

## 需求概述
- 需要连接 EVM 钱包
- 校验合约的 domain NFT 的 owner 是当前钱包
- 只有 owner 才能新增和修改 config
- **重要**：将登录和保存配置合并为一步，在保存时进行验证

## 架构设计（合并流程）

### 1. 前端保存配置流程

#### 1.1 用户操作流程
1. 用户修改配置
2. 点击保存按钮
3. 如果未连接钱包，提示连接钱包
4. 如果已连接钱包，生成签名消息并签名
5. 将 config、domainName、签名、钱包地址一起发送到 Edge Function
6. Edge Function 验证签名和 NFT ownership
7. 验证通过后，Edge Function 直接写入数据库
8. 返回成功结果给前端

#### 1.2 签名消息格式
```typescript
// 签名消息包含：domainName + config 的 hash + timestamp + nonce
const message = `Save config for domain: ${domainName}
Config Hash: ${configHash}
Timestamp: ${timestamp}
Nonce: ${nonce}`;
```

#### 1.3 前端实现步骤
1. 检查钱包是否连接（使用 `useAccount`）
2. 如果未连接，提示用户连接钱包
3. 如果已连接，获取钱包地址（`address`）
4. 生成签名消息（包含 domainName 和 config 的 hash）
5. 使用 `walletClient.signMessage()` 签名
6. 调用 Edge Function，传入：
   - `config`: 完整的配置对象
   - `domainName`: 域名
   - `walletAddress`: 钱包地址
   - `signature`: 签名
   - `message`: 签名消息
7. 处理返回结果

### 2. 后端验证流程（Supabase Edge Function）

#### 2.1 Edge Function 功能
- 路径：`supabase/functions/upsert-config-with-auth/`
- 功能：
  1. 接收前端请求：`{ config, domainName, walletAddress, signature, message }`
  2. 验证签名有效性（使用 viem 或 ethers.js）
  3. 从 config 中提取 domainName（或使用传入的 domainName）
  4. 调用链上合约验证 NFT ownership
  5. 验证通过后，使用 Service Role Key 写入数据库
  6. 返回成功或错误信息

#### 2.2 验证流程
1. **签名验证**：验证签名是否来自 walletAddress
2. **Domain 提取**：从 config 中获取 domainName（或使用传入的 domainName）
3. **NFT Ownership 验证**：调用合约验证 walletAddress 是否为 domainName 的 owner
4. **数据库写入**：验证通过后，使用 Service Role Key 写入数据库
5. **返回结果**：返回成功或错误信息

#### 2.3 NFT Ownership 验证逻辑

**使用 Web3ClubNFT 合约验证：**

项目已有 `Web3ClubNFTClient`，可以直接使用 `getOwner(domainName)` 方法获取 domain 的 owner。

**验证逻辑（Edge Function 中）：**
```typescript
// 在 Edge Function 中使用 viem
import { createPublicClient, http, getAddress } from 'https://esm.sh/viem@2.38.0';
import { sepolia } from 'https://esm.sh/viem@2.38.0/chains';

// Web3ClubNFT ABI (简化版)
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

async function verifyDomainOwner(
  domainName: string, 
  walletAddress: string,
  web3ClubNFTAddress: string,
  rpcUrl: string
): Promise<boolean> {
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(rpcUrl),
  });

  try {
    // 1. 获取 domain 对应的 tokenId
    const tokenId = await publicClient.readContract({
      address: web3ClubNFTAddress as `0x${string}`,
      abi: WEB3_CLUB_NFT_ABI,
      functionName: 'getTokenId',
      args: [domainName],
    }) as bigint;

    // 2. 验证 tokenId 是否存在
    if (!tokenId || tokenId === 0n) {
      return false;
    }

    // 3. 获取 token 的 owner
    const owner = await publicClient.readContract({
      address: web3ClubNFTAddress as `0x${string}`,
      abi: WEB3_CLUB_NFT_ABI,
      functionName: 'ownerOf',
      args: [tokenId],
    }) as `0x${string}`;

    // 4. 验证 owner 是否为当前钱包（忽略大小写）
    return getAddress(owner) === getAddress(walletAddress);
  } catch (error) {
    console.error('Error verifying domain owner:', error);
    return false;
  }
}
```

**注意：**
- 如果 domain 未注册，`getTokenId` 可能返回 0 或抛出错误
- 需要处理合约调用失败的情况（网络错误、合约不存在等）
- 考虑添加重试机制和超时处理
- 使用 `getAddress` 确保地址比较时忽略大小写

### 3. Supabase 权限控制

#### 3.1 方案 A：使用 Supabase Auth + JWT
- 在 Edge Function 中验证 NFT ownership 后，使用 Supabase Admin API 创建用户 session
- 将 walletAddress 作为用户标识
- 使用 RLS (Row Level Security) 策略控制数据访问

#### 3.2 方案 B：使用自定义 Token + RLS
- Edge Function 验证后，生成自定义 JWT token（包含 walletAddress、domainName）
- Supabase RLS 策略验证 token 中的信息
- 允许操作的条件：token 中的 walletAddress 是 domain 的 owner

#### 3.3 RLS 策略示例
```sql
-- 允许读取所有配置（公开）
CREATE POLICY "Anyone can read configs"
  ON club_configs FOR SELECT
  TO anon
  USING (true);

-- 只允许 owner 插入/更新配置
CREATE POLICY "Only domain owner can upsert config"
  ON club_configs FOR INSERT
  TO authenticated
  WITH CHECK (
    -- 这里需要从 JWT token 中获取 walletAddress 和 domainName
    -- 然后验证 walletAddress 是 domainName 的 owner
    -- 由于 RLS 无法直接调用链上合约，需要在 Edge Function 中验证
    -- RLS 策略可以检查 JWT 中的 domain_owner 字段
    (auth.jwt() ->> 'domain_owner')::boolean = true
  );

CREATE POLICY "Only domain owner can update config"
  ON club_configs FOR UPDATE
  TO authenticated
  USING (
    (auth.jwt() ->> 'domain_owner')::boolean = true
    AND domain_name = (auth.jwt() ->> 'domain_name')::text
  );
```

### 4. 前端集成流程

#### 4.1 连接钱包
```typescript
// 使用已有的钱包连接功能
import { useAccount, useWalletClient } from 'wagmi';

const { address, isConnected } = useAccount();
const { data: walletClient } = useWalletClient();
```

#### 4.2 保存配置（合并流程）
```typescript
import { hashMessage } from 'viem';
import { supabase } from './lib/supabaseClient';

async function upsertConfig(domainName: string, config: ITheme) {
  // 1. 检查钱包是否连接
  if (!isConnected || !address || !walletClient) {
    throw new Error('Please connect wallet first');
  }

  // 2. 生成签名消息
  const timestamp = Date.now();
  const nonce = Math.random().toString(36).substring(7);
  const configHash = hashMessage(JSON.stringify(config));
  const message = `Save config for domain: ${domainName}
Config Hash: ${configHash}
Timestamp: ${timestamp}
Nonce: ${nonce}`;

  // 3. 用户签名
  const signature = await walletClient.signMessage({ message });

  // 4. 调用 Edge Function
  const { data, error } = await supabase.functions.invoke('upsert-config-with-auth', {
    body: {
      config,
      domainName,
      walletAddress: address,
      signature,
      message,
    },
  });

  if (error) {
    throw new Error(error.message || 'Failed to save config');
  }

  return data;
}
```

#### 4.3 在 App.tsx 中使用
```typescript
const handleConfigSave = async (newConfig: ITheme) => {
  setSaving(true);
  setError(null);
  try {
    const { upsertConfig } = await import("./services/configService");
    await upsertConfig(club, newConfig);
    setTheme(newConfig);
    console.log("配置已保存:", newConfig);
  } catch (e: any) {
    console.error(e);
    setError(e?.message || "保存配置失败");
  } finally {
    setSaving(false);
  }
};
```

### 5. 实现步骤

#### Step 1: 创建 Supabase Edge Function
- 创建 `supabase/functions/upsert-config-with-auth/index.ts`
- 实现签名验证（使用 viem 验证签名）
- 实现 NFT ownership 验证（使用 Web3ClubNFT 合约）
- 验证通过后，使用 Service Role Key 写入数据库
- 返回成功或错误信息

#### Step 2: 更新 configService
- 修改 `upsertConfig` 方法
- 添加钱包连接检查
- 添加签名逻辑（生成签名消息，调用 walletClient.signMessage）
- 调用 Edge Function 而不是直接写入数据库
- 添加错误处理（未连接钱包、签名失败、权限不足等）

#### Step 3: 更新 App.tsx
- 在 `handleConfigSave` 中检查钱包连接
- 如果未连接钱包，提示用户连接
- 调用更新后的 `upsertConfig` 方法
- 处理错误和成功状态

#### Step 4: 更新 Supabase RLS 策略（可选）
- 由于 Edge Function 使用 Service Role Key 写入，可以简化 RLS 策略
- 或者保持严格的 RLS 策略作为额外保护

### 6. 安全考虑

#### 6.1 签名验证
- 使用 nonce 防止重放攻击
- 签名消息包含 timestamp，设置过期时间
- 验证签名是否来自正确的钱包地址

#### 6.2 NFT Ownership 验证
- 必须在后端验证，不能仅依赖前端
- 考虑 NFT 转移的情况（验证时 owner 可能已变化）
- 可以缓存验证结果，但需要设置合理的过期时间

#### 6.3 权限控制
- RLS 策略作为最后一道防线
- Edge Function 验证作为主要验证点
- 前端验证仅用于 UX 优化

### 7. 可选优化

#### 7.1 缓存机制
- 缓存 NFT ownership 验证结果（5-10 分钟）
- 减少链上调用次数

#### 7.2 批量验证
- 如果用户需要管理多个 domain，可以批量验证
- 减少 Edge Function 调用次数

#### 7.3 事件监听
- 监听 NFT 转移事件
- 自动更新权限缓存

## 技术栈

### 前端
- `@reown/appkit` / `wagmi` - 钱包连接
- `viem` / `ethers.js` - 区块链交互
- `@supabase/supabase-js` - Supabase 客户端

### 后端（Edge Function）
- `@supabase/functions-js` - Supabase Edge Function
- `viem` / `ethers.js` - 区块链交互
- `@supabase/supabase-js` - Supabase Admin API

### 数据库
- Supabase PostgreSQL
- RLS (Row Level Security)

## 注意事项

1. **合约地址配置**：需要在环境变量中配置 ClubPassFactory 合约地址
2. **网络配置**：确保前端和后端使用相同的区块链网络
3. **Gas 费用**：链上验证需要消耗 gas，考虑使用缓存减少调用
4. **错误处理**：完善错误处理，包括网络错误、合约调用失败等
5. **用户体验**：提供清晰的错误提示，指导用户完成认证流程

## 后续扩展

1. **多链支持**：支持多个区块链网络
2. **委托权限**：允许 owner 委托其他地址管理配置
3. **权限等级**：支持不同的权限等级（owner、admin、editor 等）
4. **审计日志**：记录所有配置变更的日志

## 简化实现方案（可选）

### 方案 1：仅前端验证（开发阶段）
如果暂时不需要后端验证，可以仅在前端验证 NFT ownership，并显示警告提示用户：
- 前端验证通过后，允许用户保存配置
- 在 UI 上显示 "已验证为 domain owner" 的提示
- **注意**：这种方式不安全，容易被绕过，仅用于开发测试

### 方案 2：简化后端验证（最小化实现）
如果不想创建复杂的 Edge Function，可以：
1. 在前端验证 NFT ownership
2. 前端生成签名消息（包含验证结果）
3. 后端仅验证签名，信任前端传来的验证结果
4. **注意**：这种方式仍然不够安全，但比纯前端验证好一些

### 方案 3：使用 Supabase Database Webhooks（推荐简化版）
1. 在 `club_configs` 表上创建 trigger
2. 当有插入/更新操作时，触发 webhook
3. Webhook 调用外部服务验证 NFT ownership
4. 如果验证失败，回滚操作
5. **注意**：需要额外的 webhook 服务，但可以避免 Edge Function

## 关键实现细节

### 1. Domain Name 标准化
- 确保 domainName 的格式一致（大小写、空格等）
- 可以使用 `TokenBasedAccess.standardizeDomainName()` 方法标准化

### 2. 错误处理
- 合约调用失败（网络错误、RPC 错误）
- 合约不存在（domain 未初始化）
- NFT 不存在（用户没有该 domain 的 NFT）
- NFT 已转移（owner 已变化）

### 3. 性能优化
- 使用缓存减少链上调用（Redis 或 Supabase 缓存）
- 批量验证多个 domain
- 使用 multicall 减少 RPC 调用次数

### 4. 用户体验
- 显示清晰的错误提示
- 提供重试机制
- 显示验证进度
- 支持离线模式（读取缓存）

## 测试建议

### 1. 单元测试
- 测试 NFT ownership 验证逻辑
- 测试签名验证逻辑
- 测试错误处理

### 2. 集成测试
- 测试完整的认证流程
- 测试配置保存流程
- 测试权限控制

### 3. 端到端测试
- 使用测试钱包连接
- 使用测试 domain 和 NFT
- 验证整个流程的正确性

## 常见问题

### Q1: 如果用户转移了 NFT，权限如何更新？
A: 需要在每次操作前重新验证 NFT ownership。可以考虑：
- 每次保存配置前都验证
- 使用短期缓存（5-10 分钟）
- 监听 NFT 转移事件，清除缓存

### Q2: 如果 domain 还未初始化（没有 ClubPass 合约）怎么办？
A: 可以：
- 返回友好的错误提示
- 允许用户先初始化 domain
- 或者使用默认配置（如果业务允许）

### Q3: 如何支持多个 domain 的管理？
A: 可以：
- 为每个 domain 单独验证
- 批量验证多个 domain
- 在 JWT token 中存储已验证的 domain 列表

### Q4: 如何处理网络延迟？
A: 可以：
- 使用异步验证
- 显示加载状态
- 使用缓存减少验证次数
- 设置合理的超时时间


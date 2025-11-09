# Web3 权限控制实现总结

## 实现方案

### 核心设计
将登录和保存配置合并为一步，在保存配置时进行签名和 NFT ownership 验证。

### 流程说明

1. **用户操作**：
   - 用户修改配置
   - 点击保存按钮

2. **前端处理**：
   - 检查钱包是否连接
   - 如果未连接，提示用户连接钱包
   - 如果已连接，生成签名消息（包含 domainName 和 config 的 hash）
   - 用户签名消息
   - 调用 Edge Function，传入 config、domainName、签名、钱包地址

3. **后端验证**（Edge Function）：
   - 验证签名有效性
   - 验证 NFT ownership（调用 Web3ClubNFT 合约）
   - 验证通过后，使用 Service Role Key 写入数据库
   - 返回成功或错误信息

## 文件结构

```
web3-club/
├── supabase/
│   └── functions/
│       └── upsert-config-with-auth/
│           └── index.ts              # Edge Function 代码
├── src/
│   ├── App.tsx                       # 更新：添加钱包检查
│   └── services/
│       └── configService.ts          # 更新：添加签名逻辑
└── docs/
    └── web3-auth-implementation.md   # 实现文档
```

## 已完成的修改

### 1. Edge Function (`supabase/functions/upsert-config-with-auth/index.ts`)
- ✅ 接收 config、domainName、签名、钱包地址
- ✅ 验证签名有效性
- ✅ 验证 NFT ownership（使用 Web3ClubNFT 合约）
- ✅ 验证通过后写入数据库
- ✅ 返回成功或错误信息

### 2. configService (`src/services/configService.ts`)
- ✅ 更新 `upsertConfig` 方法，添加钱包参数
- ✅ 生成签名消息
- ✅ 调用 walletClient.signMessage 签名
- ✅ 调用 Edge Function
- ✅ 错误处理

### 3. App.tsx (`src/App.tsx`)
- ✅ 导入 `useAccount` 和 `useWalletClient`
- ✅ 在保存时检查钱包连接
- ✅ 传递钱包信息给 `upsertConfig`

## 部署步骤

### 1. 设置环境变量

```bash
# 设置 Web3ClubNFT 合约地址
supabase secrets set WEB3_CLUB_NFT_ADDRESS=0x25fda59dfba96c8cc4e502b4010a0f70c036a78d

# 设置 RPC URL（替换为你的实际 RPC URL）
supabase secrets set RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
```

### 2. 部署 Edge Function

```bash
# 部署新函数
npm run supabase:functions:deploy:upsert

# 或使用 CLI
supabase functions deploy upsert-config-with-auth
```

### 3. 验证部署

```bash
# 查看函数列表
supabase functions list

# 查看函数日志
supabase functions logs upsert-config-with-auth
```

## 使用方式

### 前端调用

```typescript
import { useAccount, useWalletClient } from 'wagmi';
import { upsertConfig } from './services/configService';

const { address, isConnected } = useAccount();
const { data: walletClient } = useWalletClient();

// 保存配置
await upsertConfig(domainName, config, address, walletClient);
```

### 错误处理

- **未连接钱包**：`"请先连接钱包"`
- **签名失败**：`"Invalid signature"`
- **不是 owner**：`"Not the domain owner"`
- **保存失败**：`"Failed to save config"`

## 安全考虑

1. **签名验证**：后端验证签名是否来自正确的钱包地址
2. **NFT Ownership 验证**：后端调用合约验证 owner
3. **Service Role Key**：Edge Function 使用 Service Role Key 写入数据库， bypass RLS
4. **Config Hash**：签名消息包含 config 的 hash，防止配置被篡改
5. **Nonce**：使用随机 nonce 防止重放攻击

## 注意事项

1. **钱包连接**：用户必须连接钱包才能保存配置
2. **NFT Ownership**：只有 domain NFT 的 owner 才能保存配置
3. **网络配置**：确保前端和后端使用相同的区块链网络（sepolia）
4. **RPC URL**：需要配置有效的 RPC URL 用于合约调用
5. **错误提示**：提供清晰的错误提示，帮助用户理解问题

## 测试建议

1. **测试钱包连接**：验证未连接钱包时的错误提示
2. **测试签名**：验证签名流程是否正常
3. **测试 NFT Ownership**：使用不同的钱包测试权限验证
4. **测试保存**：验证配置是否成功保存到数据库
5. **测试错误处理**：测试各种错误情况的处理

## 后续优化

1. **缓存机制**：缓存 NFT ownership 验证结果，减少链上调用
2. **批量操作**：支持批量保存多个 domain 的配置
3. **事件监听**：监听 NFT 转移事件，自动清除缓存
4. **权限委托**：支持 owner 委托其他地址管理配置
5. **审计日志**：记录所有配置变更的日志

## 参考文档

- [实现思路文档](./web3-auth-implementation.md)
- [Edge Function 设置文档](./supabase-edge-function-setup.md)
- [快速开始文档](./supabase-edge-function-quickstart.md)


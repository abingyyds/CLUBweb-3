# Supabase Edge Function 快速开始

## 回答你的问题

### Q: Supabase Edge Function 直接在项目下面写代码吗？

**A: 是的！** Edge Functions 的代码直接写在项目目录下：

```
web3-club/
├── supabase/
│   └── functions/           # ← Edge Functions 在这里
│       └── verify-domain-owner/
│           └── index.ts     # ← 函数代码
├── src/                     # ← 前端代码
└── package.json
```

### Q: 如何部署呢？

**A: 使用 Supabase CLI 部署，步骤很简单：**

## 快速部署步骤

### 1. 安装 Supabase CLI

```bash
# macOS
brew install supabase/tap/supabase

# 或使用 npm
npm install -g supabase
```

### 2. 登录 Supabase

```bash
supabase login
```

### 3. 链接项目

```bash
# 在项目根目录执行
npm run supabase:link

# 或手动执行
supabase link --project-ref xenmczlvsgymaniljwhg
```

### 4. 设置环境变量

```bash
# 设置合约地址
supabase secrets set CLUB_PASS_FACTORY_ADDRESS=0xa3a0f01fbdaf3a978cccb28a6b3faef08c6c9538

# 设置 RPC URL（替换为你的实际 RPC URL）
supabase secrets set RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
```

### 5. 部署函数

```bash
# 部署单个函数
npm run supabase:functions:deploy:verify

# 或部署所有函数
npm run supabase:functions:deploy

# 或使用 CLI 直接部署
supabase functions deploy verify-domain-owner
```

## 项目结构

```
web3-club/
├── supabase/
│   └── functions/
│       ├── README.md                    # Functions 说明文档
│       └── verify-domain-owner/
│           └── index.ts                 # Edge Function 代码
├── docs/
│   ├── supabase-edge-function-setup.md  # 详细设置文档
│   └── supabase-edge-function-quickstart.md  # 快速开始（本文件）
├── src/
│   └── ...
└── package.json                         # 包含部署脚本
```

## 可用命令

我已经在 `package.json` 中添加了以下脚本：

```bash
# 链接 Supabase 项目
npm run supabase:link

# 部署所有函数
npm run supabase:functions:deploy

# 部署单个函数
npm run supabase:functions:deploy:verify

# 本地测试函数（需要 Docker）
npm run supabase:functions:serve

# 查看函数日志
npm run supabase:functions:logs
```

## 调用 Edge Function

### 从前端调用

```typescript
import { supabase } from './lib/supabaseClient';

// 调用 Edge Function
const { data, error } = await supabase.functions.invoke('verify-domain-owner', {
  body: {
    walletAddress: '0x...',
    domainName: 'example',
    message: 'Authenticate for domain: example\nNonce: 123456',
    signature: '0x...',
  },
});
```

### 使用 fetch 调用

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
      walletAddress: '0x...',
      domainName: 'example',
      message: 'Authenticate for domain: example\nNonce: 123456',
      signature: '0x...',
    }),
  }
);
```

## 本地开发

### 启动本地 Supabase（需要 Docker）

```bash
supabase start
```

### 测试函数

```bash
npm run supabase:functions:serve
```

### 查看日志

```bash
npm run supabase:functions:logs verify-domain-owner
```

## 重要注意事项

1. **Deno 环境**：Edge Functions 运行在 Deno 环境中，不是 Node.js
2. **URL 导入**：使用 URL 导入依赖，如 `https://esm.sh/...`
3. **环境变量**：通过 `Deno.env.get()` 获取，需要通过 `supabase secrets set` 设置
4. **CORS**：记得在函数中处理 CORS 请求
5. **部署**：每次修改代码后，需要重新部署函数

## 下一步

1. ✅ 代码已经创建在 `supabase/functions/verify-domain-owner/index.ts`
2. ⏳ 安装 Supabase CLI
3. ⏳ 链接项目
4. ⏳ 设置环境变量
5. ⏳ 部署函数
6. ⏳ 在前端集成调用

## 参考文档

- [详细设置文档](./supabase-edge-function-setup.md) - 完整的设置和部署指南
- [实现思路文档](./web3-auth-implementation.md) - Web3 认证实现思路
- [Supabase Edge Functions 官方文档](https://supabase.com/docs/guides/functions)

## 常见问题

### Q: 需要安装 Deno 吗？
A: 不需要，Supabase CLI 会自动处理 Deno 环境。

### Q: 可以在本地运行 Edge Functions 吗？
A: 可以，使用 `supabase start` 启动本地环境（需要 Docker）。

### Q: 如何查看函数日志？
A: 使用 `supabase functions logs verify-domain-owner` 或 dans Supabase 控制台查看。

### Q: 环境变量在哪里设置？
A: 使用 `supabase secrets set KEY=value` 设置，或在 Supabase 控制台的 Settings → Edge Functions 中设置。

### Q: 如何更新函数？
A: 修改代码后，使用 `supabase functions deploy verify-domain-owner` 重新部署。


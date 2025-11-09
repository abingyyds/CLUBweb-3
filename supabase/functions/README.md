# Supabase Edge Functions

这个目录包含所有的 Supabase Edge Functions。

## 快速开始

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
supabase functions deploy verify-domain-owner

# 部署所有函数
supabase functions deploy
```

## 可用函数

### upsert-config-with-auth

保存配置并验证用户是否是 domain NFT 的 owner。将验证和保存合并为一步。

**请求体：**
```json
{
  "config": {
    "templateId": "3",
    "metaTitle": "Web3 Club",
    ...
  },
  "domainName": "example",
  "walletAddress": "0x...",
  "message": "Save config for domain: example\nConfig Hash: ...\nTimestamp: ...\nNonce: ...",
  "signature": "0x..."
}
```

**响应：**
```json
{
  "success": true,
  "domainName": "example",
  "message": "Config saved successfully",
  "data": [...]
}
```

**错误响应：**
```json
{
  "error": "Not the domain owner"
}
```

### verify-domain-owner（已废弃）

旧的验证函数，已被 `upsert-config-with-auth` 替代。

## 本地开发

### 启动本地服务（需要 Docker）

```bash
supabase start
```

### 测试函数

```bash
supabase functions serve verify-domain-owner
```

### 查看日志

```bash
supabase functions logs verify-domain-owner
```

## 注意事项

1. Edge Functions 运行在 Deno 环境中，不是 Node.js
2. 使用 URL 导入依赖，如 `https://esm.sh/...`
3. 环境变量通过 `Deno.env.get()` 获取
4. 记得处理 CORS 请求

## 参考文档

- [Supabase Edge Functions 文档](https://supabase.com/docs/guides/functions)
- [Deno 文档](https://deno.land/docs)


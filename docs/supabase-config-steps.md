### 目标
- 以 `domainName` 为主键，在 Supabase 持久化保存/获取整份 `config.json` 配置，支持新增、编辑、获取。
- 在 `App` 组件中打通读取与保存逻辑，复用现有 `ITheme` 与 `handleConfigSave`。

### 核心设计
- **表结构**：单表，`domain_name` 作为主键，`config` 用 `jsonb` 存整份配置，`updated_at` 追踪更新时间。
- **接口分层**：前端仅通过 `configService` 调用数据库（`getConfig` / `upsertConfig` / `listDomains` / `deleteConfig`）。
- **域名确定规则**：运行时通过 `window.location.hostname`（或配置覆盖）确定 `domainName`。
- **安全**：开发期可开放读写，生产期建议仅允许读；写入通过服务端（Edge Function/自有后端）或受限策略。

## 步骤一：创建 Supabase 表结构
- 表名：`club_configs`
- 字段：
  - `domain_name text primary key`
  - `config jsonb not null`
  - `updated_at timestamptz not null default now()`
- 索引（可选优化）：
  - `create index on club_configs using gin (config);`
  - `create index on club_configs (updated_at desc);`

建议 SQL（在 Supabase SQL Editor 执行）：
```sql
create table if not exists public.club_configs (
  domain_name text primary key,
  config jsonb not null,
  updated_at timestamptz not null default now()
);

-- 可选：按需的索引
create index if not exists club_configs_config_gin_idx on public.club_configs using gin (config);
create index if not exists club_configs_updated_at_idx on public.club_configs (updated_at desc);

-- 开启 RLS
alter table public.club_configs enable row level security;

-- 开发期策略（示例：允许匿名读/写；生产请收紧）
create policy "anon can read configs"
  on public.club_configs for select
  to anon using (true);

create policy "anon can upsert configs"
  on public.club_configs for insert
  to anon with check (true);

create policy "anon can update configs"
  on public.club_configs for update
  to anon using (true) with check (true);
```

注意：生产环境请改为仅读策略，并通过服务端密钥完成写入，避免滥用。

## 步骤二：准备环境变量与 Supabase 客户端
- 在项目根目录创建 `.env`（Vite）：
  - `VITE_SUPABASE_URL=你的项目URL`
  - `VITE_SUPABASE_ANON_KEY=你的anon key`
- 新建 `src/lib/supabaseClient.ts`：
  - 使用 `@supabase/supabase-js` 初始化单例客户端。
- 安装依赖：
  - `npm i @supabase/supabase-js`

## 步骤三：定义类型与服务层
- 类型：
  - 复用现有 `ITheme`（与 `public/config.json` 结构一致）。
  - 定义 `ClubConfigRecord`：
    - `domainName: string`
    - `config: ITheme`
    - `updatedAt?: string`
- 新建 `src/services/configService.ts`：
  - `getConfig(domainName: string): Promise<ITheme | null>`
  - `upsertConfig(domainName: string, config: ITheme): Promise<void>`
  - `listDomains(): Promise<string[]>`
  - `deleteConfig(domainName: string): Promise<void>`
- 约定：
  - 写入使用 `upsert`（冲突键为 `domain_name`），同时更新 `updated_at = now()`。
  - 读取仅返回 `config` 字段并映射回 `ITheme`。

## 步骤四：在 App.tsx 接入读/写
- 确定 `domainName`
  - 默认 `const domainName = window.location.hostname;`
  - 支持通过 UI 文本框切换或 query 参数覆盖（便于调试多域配置）。
- 初始加载
  - 组件 `useEffect`：按 `domainName` 调用 `getConfig`。
  - 若查无记录：使用当前 `public/config.json` 的默认值（可作为模板）。
- 保存逻辑
  - 在 `handleConfigSave` 中调用 `upsertConfig(domainName, newConfig)`。
  - 成功后更新本地状态并提示“已保存”。
- 状态管理
  - `loading` / `error` / `saving` 状态。
  - 若发生错误，展示用户友好提示（并在控制台输出详细错误）。

## 步骤五：UI 与用户体验
- 轻量提示：保存中/保存成功/保存失败。
- 显示当前 `domainName`，并允许切换（可选）。
- 提供“重置为默认模板”的按钮（从 `public/config.json` 载入初始模板）。

## 步骤六：测试与验证
- 本地联调：
  - 设置 `.env`，确保前端能连接 Supabase。
  - 运行页面，确认首次访问读取为空时会显示默认模板。
  - 修改配置并保存；在 Supabase 表中查看 `club_configs` 记录是否写入成功。
- 切换不同 `domainName`（用不同 hosts 或手动覆盖），验证多套配置并存。
- 回归读取：刷新页面应读取到刚保存的配置。

## 安全与上线建议
- 生产环境不建议直接用 `anon` 写入：
  - 最小权限：保留只读给 `anon`，写入经服务端（Edge Function/自有后端）携带 `service_role` 完成。
  - 或者限制写策略为登录用户且必要的 RBAC。
- 记录审计（可选）：
  - 追加 `updated_by`（用户ID）字段，配合认证使用。
- 备份与迁移：
  - 导出 `club_configs`，定期备份。
  - 如需版本化，可在 `config` 中加 `version` 字段。

## 与现有代码的衔接点
- 你当前在 `App.tsx` 中已有：
```35:39:/Users/yanyuan/Documents/Develop/AI/web3-club/src/App.tsx
  const handleConfigSave = (newConfig: ITheme) => {
    setTheme(newConfig);
    // 这里可以添加保存到服务器的逻辑
    console.log("配置已更新:", newConfig);
  };
```
- 集成后：
  - 在此函数内插入 `await upsertConfig(domainName, newConfig)`。
  - 在组件挂载处用 `const init = await getConfig(domainName)` 初始化 `theme`。
  - 加入 `loading/saving/error` 状态和基础提示。

## 目录与文件建议
- `src/lib/supabaseClient.ts`：Supabase 客户端单例
- `src/services/configService.ts`：CRUD 封装
- `src/types/config.ts`：`ITheme` 与 `ClubConfigRecord`（若需要单独文件）
- `src/App.tsx`：集成加载与保存逻辑

## 最小示例接口签名（便于后续实现）
```ts
// src/services/configService.ts
export async function getConfig(domainName: string): Promise<ITheme | null> {}

export async function upsertConfig(domainName: string, config: ITheme): Promise<void> {}

export async function listDomains(): Promise<string[]> {}

export async function deleteConfig(domainName: string): Promise<void> {}
```


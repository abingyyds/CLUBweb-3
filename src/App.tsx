import Template3 from "./pages/template3/Web3Community";
import "./App.css";
import { parseSearchParams, parseSubdomain } from "./lib/utils";
import { useEffect, useState } from "react";
import { ITheme } from "./types";
import { Template1 } from "./pages/template1";
import { Template2 } from "./pages/template2";
import { ConfigPanel } from "./components/ConfigPanel";
import { Template4 } from "./pages/template4";
import { Template5 } from "./pages/template5";
import Template6 from "./pages/template6";
import { Template7 } from "./pages/template7";
import { Template8 } from "./pages/template8";
import Template9 from "./pages/template9/index";
import { Template10 } from "./pages/template10/index";
import { PageMeta } from "./components/PageMeta";
import { useAccount, useWalletClient } from "wagmi";
import { toast } from "sonner";
import { useWeb3ClubService } from "./components/AppkitProvider";
import { useQuery } from "@tanstack/react-query";

function App() {
  const search = parseSearchParams(window.location.href) as any;
  const domainName =
    search.club || parseSubdomain(window.location.host) || "orbitlink";
  const [club] = useState(domainName);
  const web3ClubService = useWeb3ClubService();

  const { data: owner } = useQuery({
    queryKey: ["owner", domainName],
    queryFn: () => web3ClubService.web3ClubNFTClient.getOwner(domainName),
  });

  const [theme, setTheme] = useState<ITheme | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const template = search.template || theme?.templateId || "3";

  // 获取钱包信息
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();

  const fetchTheme = async () => {
    setLoading(true);
    setError(null);
    try {
      const { getConfig } = await import("./services/configService");
      const remote = await getConfig(club);
      console.log("remote", remote);
      if (remote) {
        setTheme(remote);
      } else {
        const res = await fetch(`/data/config${template}.json`);
        const data = await res.json();
        setTheme(data);
      }
    } catch (e: any) {
      console.error(e);
      setError(e?.message || "加载配置失败");
      try {
        const res = await fetch(`/config.json`);
        const data = await res.json();
        setTheme(data);
      } catch (ee) {
        console.error(ee);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleConfigSave = async (newConfig: ITheme) => {
    setSaving(true);
    setError(null);
    console.log("newConfig", newConfig);
    try {
      // 检查钱包是否连接（统一走 catch 错误处理）
      if (!isConnected || !address || !walletClient) {
        throw new Error("请先连接钱包");
      }

      const { upsertConfig } = await import("./services/configService");
      // 传递钱包信息进行签名和验证
      await upsertConfig(club, newConfig, address, walletClient);
      setTheme(newConfig);
      console.log("配置已保存:", newConfig);
      toast.success("配置保存成功");
    } catch (e: any) {
      console.error(e);
      // setError(e?.message || "保存配置失败");
      toast.error(e?.message || "保存配置失败");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchTheme();
  }, [club]);

  if (!theme) return null;

  console.log(theme, owner, domainName);

  return (
    <div className="App">
      <PageMeta title={theme?.metaTitle} favicon={theme?.favicon} />
      {template === "1" ? <Template1 club={club} theme={theme} /> : null}
      {template === "2" ? <Template2 club={club} theme={theme} /> : null}
      {template === "3" ? <Template3 club={club} theme={theme} /> : null}
      {template === "4" ? <Template4 club={club} theme={theme} /> : null}
      {template === "5" ? <Template5 club={club} theme={theme} /> : null}
      {template === "6" ? <Template6 club={club} theme={theme} /> : null}
      {template === "7" ? <Template7 club={club} theme={theme} /> : null}
      {template === "8" ? <Template8 club={club} theme={theme} /> : null}
      {template === "9" ? <Template9 club={club} theme={theme} /> : null}
      {template === "10" ? <Template10 club={club} theme={theme} /> : null}

      {error ? (
        <div style={{ color: "red", marginBottom: 8 }}>{error}</div>
      ) : null}
      {loading ? <div style={{ marginBottom: 8 }}>加载中...</div> : null}
      {saving ? <div style={{ marginBottom: 8 }}>保存中...</div> : null}
      {theme && owner?.toLowerCase() === address?.toLowerCase() ? (
        <ConfigPanel config={theme} onSave={handleConfigSave} />
      ) : null}
    </div>
  );
}

export default App;

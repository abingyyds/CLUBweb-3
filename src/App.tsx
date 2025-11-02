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

function App() {
  const search = parseSearchParams(window.location.href) as any;
  const domainName =
    search.club || parseSubdomain(window.location.host) || "xxx";
  const [club] = useState(domainName);

  const [theme, setTheme] = useState<ITheme | undefined>();

  const template = search.template || theme?.templateId || "3";

  const fetchTheme = async () => {
    const res = await fetch(`/config.json`);
    const data = await res.json();
    console.log(data);
    setTheme(data);
  };

  const handleConfigSave = (newConfig: ITheme) => {
    setTheme(newConfig);
    // 这里可以添加保存到服务器的逻辑
    console.log("配置已更新:", newConfig);
  };

  useEffect(() => {
    fetchTheme();
  }, [club]);

  if (!theme) return null;

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

      {theme && <ConfigPanel config={theme} onSave={handleConfigSave} />}
    </div>
  );
}

export default App;

import Template3 from "./pages/template3/Web3Community";
import "./App.css";
import { parseSearchParams, parseSubdomain } from "./lib/utils";
import { useEffect, useState } from "react";
import { ITheme } from "./types";
import { Template1 } from "./pages/template1";
import { Template2 } from "./pages/template2";

function App() {
  const search = parseSearchParams(window.location.href) as any;
  const domainName =
    search.club || parseSubdomain(window.location.host) || "xxx";
  const [club] = useState(domainName);
  const template = search.template || "3";

  const [theme, setTheme] = useState<ITheme | undefined>();

  const fetchTheme = async () => {
    const res = await fetch(`/config.json`);
    const data = await res.json();
    console.log(data);
    setTheme(data);
  };

  useEffect(() => {
    fetchTheme();
  }, [club]);

  return (
    <div className="App">
      {template === "1" ? <Template1 club={club} theme={theme} /> : null}
      {template === "2" ? <Template2 club={club} theme={theme} /> : null}
      {template === "3" ? <Template3 club={club} theme={theme} /> : null}
    </div>
  );
}

export default App;

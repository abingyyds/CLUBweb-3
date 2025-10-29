import Template3 from "./pages/template3/Web3Community";
import "./App.css";
import { parseSearchParams, parseSubdomain } from "./lib/utils";
import { useEffect, useState } from "react";
import { ITheme } from "./types";

function App() {
  const search = parseSearchParams(window.location.href) as any;
  const domainName =
    search.club || parseSubdomain(window.location.host) || "xxx";
  const [club] = useState(domainName);

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
      {theme && <Template3 club={club} theme={theme} />}
    </div>
  );
}

export default App;

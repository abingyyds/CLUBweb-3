import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { traeBadgePlugin } from "vite-plugin-trae-solo-badge";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const plugins = [
    react({
      babel: {
        plugins: ["react-dev-locator"],
      },
    }),
    tsconfigPaths(),
  ];

  // 只在开发模式下添加 traeBadgePlugin
  if (command === 'serve') {
    plugins.splice(1, 0, traeBadgePlugin({
      variant: "dark",
      position: "bottom-right",
      prodOnly: false,
      clickable: true,
      clickUrl: "https://www.trae.ai/solo?showJoin=1",
      autoTheme: true,
      autoThemeTarget: "#root",
    }));
  }

  return {
    build: {
      sourcemap: "hidden",
    },
    plugins,
  };
});

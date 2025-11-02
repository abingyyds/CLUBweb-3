import { useEffect } from "react";

interface PageMetaProps {
  title?: string;
  favicon?: string;
}

/**
 * 组件用于动态修改页面的标题和网站图标
 * @param title - 页面标题
 * @param favicon - 网站图标URL
 */
export const PageMeta = ({ title, favicon }: PageMetaProps) => {
  useEffect(() => {
    // 更新页面标题
    if (title) {
      const originalTitle = document.title;
      document.title = title;

      // 组件卸载时恢复原始标题
      return () => {
        document.title = originalTitle;
      };
    }
  }, [title]);

  useEffect(() => {
    // 更新网站图标
    if (favicon) {
      // 查找现有的favicon链接元素
      const existingFavicon = document.querySelector(
        'link[rel="icon"]'
      ) as HTMLLinkElement;

      if (existingFavicon) {
        // 如果存在，则更新href属性
        const originalHref = existingFavicon.href;
        existingFavicon.href = favicon;

        // 组件卸载时恢复原始图标
        return () => {
          existingFavicon.href = originalHref;
        };
      } else {
        // 如果不存在，则创建新的favicon链接元素
        const link = document.createElement("link");
        link.rel = "icon";
        link.href = favicon;
        document.head.appendChild(link);

        // 组件卸载时移除创建的图标
        return () => {
          document.head.removeChild(link);
        };
      }
    }
  }, [favicon]);

  // 这个组件不渲染任何内容
  return null;
};

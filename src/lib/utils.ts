import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function parseSubdomain(input: string) {
  // 尝试用 URL 解析（处理带协议的情况），否则当作 hostname 处理
  let hostname;
  try {
    hostname = new URL(input).hostname;
  } catch {
    // 去掉可能的端口号
    hostname = input.split(":")[0].replace(/\/.*$/, "");
  }
  const m = hostname.match(/^(.+?)\.web3\.club$/u);
  return m ? m[1] : null;
}

export function parseSearchParams(url: string) {
  try {
    const u = new URL(url);
    const params = {};
    for (const [key, value] of u.searchParams.entries()) {
      params[key] = value;
    }
    return params;
  } catch {
    // 万一不是完整 URL（比如只传 "?a=1&b=2"）
    const query = url.startsWith("?") ? url.slice(1) : url;
    const params = {};
    for (const part of query.split("&")) {
      if (!part) continue;
      const [k, v] = part.split("=");
      params[decodeURIComponent(k)] = decodeURIComponent(v || "");
    }
    return params;
  }
}

import React from "react";
import { ConnectButton } from "../../components/ConnectButton";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";
import Pagination from "../../components/Pagination";
import { ITheme } from "@/types";
import { MemberModal } from "../template3/MemberModal";
import { usePagination } from "../../hooks/usePagination";
import { useClubData } from "../../hooks/useClubData";
import { useClubMembership } from "../../hooks/useClubMembership";
import {
  Grid,
  User,
  Settings,
  FileText,
  ExternalLink,
  MousePointer,
} from "lucide-react";

interface Template7Props {
  club: string;
  theme?: ITheme;
}

export const Template7: React.FC<Template7Props> = ({ theme, club }) => {
  const { address } = useAccount();
  const domainName = club;
  const newsData = theme?.news || [];

  // 使用分页 hook
  const {
    currentPage,
    totalPages,
    currentData: currentNewsData,
    handlePageChange,
  } = usePagination({
    data: newsData,
    itemsPerPage: 3,
  });

  // 使用俱乐部数据 hook
  const {
    lifetimePrice,
    yearPrice,
    monthPrice,
    quarterPrice,
    verifyData,
    memberData,
  } = useClubData({
    domainName,
    address,
  });

  // 使用会员管理 hook
  const {
    modalOpen,
    setModalOpen,
    isVerifyMode,
    handleJoin,
    handleVerify,
    handleConfirmJoin,
  } = useClubMembership({
    domainName,
    memberData,
    yearPrice,
    monthPrice,
    quarterPrice,
  });

  // 会员选项
  const membershipOptions = [
    yearPrice && {
      title: "Lifetime Member",
      price: `${yearPrice} ETH`,
      type: "year",
      highlighted: true,
    },
    monthPrice && {
      title: "Monthly Membership",
      price: `${monthPrice} ETH`,
      type: "month",
    },
    quarterPrice && {
      title: "Yearly Membership",
      price: `${quarterPrice} ETH`,
      type: "quarter",
    },
  ].filter(Boolean);

  // 浏览器控制按钮组件
  const BrowserControls = () => (
    <div className="flex items-center gap-2">
      <div className="w-3 h-3 rounded-full bg-red-500 border border-red-600"></div>
      <div className="w-3 h-3 rounded-full bg-yellow-500 border border-yellow-600"></div>
      <div className="w-3 h-3 rounded-full bg-green-500 border border-green-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0b1018] text-white font-mono">
      {/* 主容器 */}
      <div className="max-w-6xl mx-auto px-8 py-10">
        {/* Hero 区域 */}
        <div className="relative flex justify-between items-start mb-10 px-28 py-16">
          {/* 左侧导航栏 */}
          <div className="absolute left-16 top-16 flex flex-col items-center bg-[#1a1e23] border border-white rounded-full p-2 w-16 h-[274px] gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
              <Grid className="w-6 h-6 text-black" />
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full">
              <ExternalLink className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* 中心内容 */}
          <div className="flex-1 flex flex-col items-center gap-8 pl-16">
            {/* 标题区域 */}
            <div className="flex items-center gap-1 text-sm">
              <span className="text-[#98faec]">&lt;title&gt;</span>
              <span className="text-white">ABC.WEB3.CLUB</span>
              <span className="text-[#98faec]">&lt;/title&gt;</span>
            </div>

            <div className="flex flex-col items-start w-full">
              <span className="text-[#98faec] text-sm">&lt;h1&gt;</span>
              <div className="px-4">
                <h1 className="text-4xl font-bold text-[#f38406] underline leading-12">
                  ETERNAL PROFIT
                </h1>
                <div className="flex items-baseline gap-4">
                  <h1 className="text-4xl font-bold text-white leading-12">
                    COMMUNITY
                  </h1>
                  <span className="text-[#98faec] text-sm">&lt;/h1&gt;</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start w-full gap-4">
              <span className="text-[#98faec] text-sm">&lt;p&gt;</span>
              <div className="px-6 space-y-5 max-w-[586px]">
                <p className="text-white text-base leading-5">
                  Welcome to the Eternal Profit Community! We are a professional
                  community focused on blockchain technology innovation and DeFi
                  investment.
                </p>
                <p className="text-white text-base leading-5">
                  Here, you will gain access to the most cutting-edge Alpha
                  information, professional investment advice, and a wealth of
                  learning resources.
                </p>
              </div>
              <span className="text-[#98faec] text-sm">&lt;/p&gt;</span>

              {/* Connect Wallet 按钮 */}
              <div className="flex items-center gap-4 px-6">
                <span className="text-[#f38406] text-xl font-medium">
                  Connect Wallet
                </span>
                <div className="bg-[#43454d] rounded-full p-2">
                  <ExternalLink className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="space-y-10">
          {/* Join the Option 区域 */}
          <div className="bg-[#242934] rounded-lg">
            {/* 浏览器标题栏 */}
            <div className="flex items-center justify-between bg-[#202124] rounded-t-lg px-3 py-4">
              <BrowserControls />
              <span className="text-white text-xs">Join the option</span>
              <div className="w-[52px]"></div>
            </div>

            {/* 内容 */}
            <div className="p-10 space-y-10">
              {/* 标题 */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-4">
                  <h2 className="text-2xl text-[#f38406]">Join The Option</h2>
                  <div className="w-44 h-0.5 bg-[#f38406]"></div>
                </div>
                <p className="text-white text-xs text-center">
                  Little description here
                </p>
              </div>

              {/* 会员选项 */}
              <div className="flex justify-center gap-8">
                {membershipOptions.map((option, index) => (
                  <div key={index} className="flex">
                    <div className="w-1 bg-white rounded-l-lg"></div>
                    <div className="bg-[#dddddd] rounded-r-lg p-4 flex flex-col items-center gap-2 min-w-[180px]">
                      <div className="w-6 h-6 rounded-full border-2 border-gray-400"></div>
                      <div className="text-center">
                        <p
                          className={`font-bold text-lg ${
                            option.highlighted
                              ? "text-[#43454d] underline"
                              : "text-[#292f36]"
                          }`}
                        >
                          {option.title}
                        </p>
                        <p className="text-[#43454d]">{option.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* JOIN NOW 按钮 */}
              <div className="flex justify-center">
                <button
                  onClick={() => handleJoin("year")}
                  className="flex items-center gap-4 bg-[#f38406] border-2 border-[#f38406] rounded-full px-8 py-3 text-white font-medium hover:bg-[#e67300] transition-colors"
                >
                  <span>JOIN NOW</span>
                  <ExternalLink className="w-6 h-6" />
                </button>
              </div>

              {/* Position Verification */}
              <div className="space-y-10">
                <div className="flex flex-col items-center gap-4">
                  <h3 className="text-2xl text-[#f38406]">
                    Position Verification
                  </h3>
                  <div className="w-56 h-0.5 bg-[#f38406]"></div>
                </div>

                <div className="flex justify-center gap-32 px-10">
                  {/* ETH Chain */}
                  <div className="flex flex-col gap-3.5">
                    <div className="h-10 flex items-center">
                      <img src="/aave.png" alt="AAVE" className="h-4" />
                    </div>
                    <p className="text-[#f38406] font-semibold">ETH Chain</p>
                    <div className="space-y-2">
                      <p className="text-white font-light">Hold AAVE ≥100</p>
                      <div className="h-px bg-[#98faec]"></div>
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-[#f38406] text-xs">Verify</span>
                        <div className="h-0.5 bg-[#f38406]"></div>
                      </div>
                      <MousePointer className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* BNB Chain */}
                  <div className="flex flex-col gap-3.5">
                    <img src="/bnb.png" alt="BNB" className="w-10 h-10" />
                    <p className="text-[#f38406] font-semibold">BNB Chain</p>
                    <div className="space-y-2">
                      <p className="text-white font-light">Hold BNB≥10</p>
                      <div className="h-px bg-[#98faec]"></div>
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-[#f38406] text-xs">Verify</span>
                        <div className="h-0.5 bg-[#f38406]"></div>
                      </div>
                      <MousePointer className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Polygon Chain */}
                  <div className="flex flex-col gap-3.5">
                    <img src="/polygon.png" alt="MATIC" className="w-10 h-9" />
                    <p className="text-[#f38406] font-semibold">
                      Polygon Chain
                    </p>
                    <div className="space-y-2">
                      <p className="text-white font-light">Hold MATIC≥1000</p>
                      <div className="h-px bg-[#98faec]"></div>
                    </div>
                    <div className="flex items-end gap-2">
                      <div className="flex flex-col gap-1">
                        <span className="text-[#f38406] text-xs">Verify</span>
                        <div className="h-0.5 bg-[#f38406]"></div>
                      </div>
                      <MousePointer className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Links & Apps 区域 */}
          <div>
            {/* 浏览器标题栏 */}
            <div className="flex items-center justify-between bg-[#202124] rounded-t-lg px-3 py-4">
              <BrowserControls />
              <span className="text-white text-xs">links&Apps</span>
              <div className="w-[52px]"></div>
            </div>

            {/* 内容 */}
            <div className="bg-[#e5e5e5] rounded-b-lg p-10">
              <div className="space-y-10">
                <div className="flex flex-col items-center gap-4">
                  <h3 className="text-2xl text-[#f38406]">Links & Apps</h3>
                  <div className="w-32 h-0.5 bg-[#f38406]"></div>
                </div>

                <div className="flex justify-center gap-8">
                  {[
                    {
                      name: "Telegram",
                      icon: "/telegram.png",
                      color: "bg-[#ef5da8]",
                    },
                    {
                      name: "Twitter/X",
                      icon: "/twitter.png",
                      color: "bg-[#1da1f2]",
                    },
                    {
                      name: "Discord",
                      icon: "/discord.png",
                      color: "bg-[#5865f2]",
                    },
                    {
                      name: "YouTube",
                      icon: "/youtube.png",
                      color: "bg-[#ff0000]",
                    },
                    {
                      name: "OnlyCluber",
                      icon: "/onlycluber.png",
                      color: "bg-[#000000]",
                    },
                    {
                      name: "ClubBot",
                      icon: "/clubbot.png",
                      color: "bg-[#00d4aa]",
                    },
                  ].map((app, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-2"
                    >
                      <div
                        className={`w-16 h-16 rounded-full ${app.color} flex items-center justify-center`}
                      >
                        <img
                          src={app.icon}
                          alt={app.name}
                          className="w-8 h-8"
                        />
                      </div>
                      <span className="text-black text-sm">{app.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Community News 区域 */}
          <div className="space-y-10">
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-2xl text-[#f38406]">Community News</h3>
              <div className="w-40 h-0.5 bg-[#f38406]"></div>
            </div>

            <div className="space-y-8">
              <div className="h-px bg-[#f38406]"></div>

              {currentNewsData.map((news: any, index: number) => (
                <div key={index} className="flex items-center gap-6">
                  <img
                    src={news.image || "/news1.png"}
                    alt={news.title}
                    className="w-20 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="text-white font-medium mb-1">
                      {news.title || "Weekly Alpha Information Summary"}
                    </h4>
                    <p className="text-white text-sm">
                      {news.source || "Source: Twitter Alpha"}
                    </p>
                  </div>
                </div>
              ))}

              <div className="h-px bg-[#f38406]"></div>
            </div>

            {/* 分页按钮 */}
            <div className="flex justify-center gap-4">
              <button className="bg-[#f38406] text-white px-6 py-2 rounded text-sm">
                View More
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="bg-[#f38406] text-white px-6 py-2 rounded text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center space-y-4 pt-10">
            <h4 className="text-white text-lg tracking-wider">
              A B C . W E B 3 . C L U B
            </h4>
            <div className="h-px bg-[#f38406] max-w-md mx-auto"></div>
            <p className="text-white text-sm">
              <span>Powered by </span>
              <span className="text-[#f38406]">Web3.Club</span>
              <span> and </span>
              <span className="text-[#f38406]">OrbitLink.Me</span>
            </p>
          </div>
        </div>
      </div>

      {/* Member Modal */}
      <MemberModal
        open={modalOpen}
        setOpen={setModalOpen}
        data={memberData}
        onConfirm={handleConfirmJoin}
        isVerifyMode={isVerifyMode}
      />
    </div>
  );
};

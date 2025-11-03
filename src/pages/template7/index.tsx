import React, { useState } from "react";
import { ConnectButton } from "../../components/ConnectButton";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";
import Pagination from "../../components/Pagination";
import { ITheme } from "@/types";
import { MemberModal } from "./MemberModal";
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
  ChevronsRight,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";

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
    lifetimePrice && {
      title: "Lifetime Member",
      price: `${lifetimePrice} ETH`,
      type: "lifetime",
      highlighted: true,
    },
    monthPrice && {
      title: "Monthly Membership",
      price: `${monthPrice} ETH`,
      type: "month",
    },
    quarterPrice && {
      title: "Quarterly Membership",
      price: `${quarterPrice} ETH`,
      type: "quarter",
    },
    yearPrice && {
      title: "Yearly Membership",
      price: `${yearPrice} ETH`,
      type: "year",
      highlighted: true,
    },
  ].filter(Boolean);

  // 选中的会员选项状态
  const [selectedMembership, setSelectedMembership] = useState(
    membershipOptions.length > 0 ? membershipOptions[0].type : ""
  );

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
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-10">
        {/* Hero 区域 */}
        <div className="relative flex flex-col md:flex-row md:justify-between md:items-start mb-6 md:mb-10 px-4 md:px-28 py-8 md:py-16">
          {/* 左侧导航栏 */}
          <div className="hidden md:flex absolute left-16 top-16 flex-col items-center bg-[#1a1e23] border border-white rounded-full p-2 w-16 h-[274px] gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-full">
              <img src="/icon-grid.png" className="w-6 h-6 text-black" />
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full">
              <img src="/icon-user.png" className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full">
              <img src="/icon-code.png" className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full">
              <img src="/icon-monitor.png" className="w-6 h-6 text-white" />
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full">
              <img src="/icon-edit.png" className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* 中心内容 */}
          <div className="flex-1 flex flex-col items-center gap-6 md:gap-8 md:pl-16">
            {/* 标题区域 */}
            <div className="flex items-center gap-1 text-sm">
              <span className="text-[#98faec]">&lt;title&gt;</span>
              <span className="text-white">{domainName}.WEB3.CLUB</span>
              <span className="text-[#98faec]">&lt;/title&gt;</span>
            </div>

            <div className="flex flex-col items-start w-full">
              <span className="text-[#98faec] text-sm">&lt;h1&gt;</span>
              <div className="px-4">
                <h1 className="text-2xl md:text-4xl font-bold text-[#f38406] underline leading-8 md:leading-12">
                  {theme.heroTitle}
                </h1>
                <div className="flex items-baseline gap-4">
                  <h1 className="text-2xl md:text-4xl font-bold text-white leading-8 md:leading-12">
                    {theme.heroGradientText}
                  </h1>
                  <span className="text-[#98faec] text-sm">&lt;/h1&gt;</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start w-full gap-4">
              <span className="text-[#98faec] text-sm">&lt;p&gt;</span>
              <div className="px-3 md:px-6 space-y-3 md:space-y-5 max-w-[586px]">
                <p className="text-white text-base leading-5">
                  {theme.clubIntroduction1}
                </p>
                <p className="text-white text-base leading-5">
                  {theme.clubIntroduction2}
                </p>
              </div>
              <span className="text-[#98faec] text-sm">&lt;/p&gt;</span>

              {/* Connect Wallet 按钮 */}

              <ConnectButton
                className="bg-transparent !text-[#f38406]  text-xl font-medium"
                icon="/mail.png"
              />
            </div>
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="space-y-6 md:space-y-10">
          {/* Join the Option 区域 */}
          <div className="bg-[#242934] rounded-lg">
            {/* 浏览器标题栏 */}
            <div className="flex items-center justify-between bg-[#202124] rounded-t-lg px-3 py-4">
              <BrowserControls />
              <span className="text-white text-xs">Join the option</span>
              <div className="w-[52px]"></div>
            </div>

            {/* 内容 */}
            <div className="p-4 md:p-10 space-y-6 md:space-y-10">
              {/* 标题 */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-4">
                  <h2 className="text-xl md:text-2xl text-[#f38406]">Join The Option</h2>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#f38406] rounded-full"></div>
                    <div className="w-44 h-0.5 bg-[#f38406]"></div>
                    <div className="w-2 h-2 bg-[#f38406] rounded-full"></div>
                  </div>
                </div>
                <p className="text-white text-xs text-center">
                  Little description here
                </p>
              </div>

              {/* 会员选项 */}
              <RadioGroup
                value={selectedMembership}
                onValueChange={setSelectedMembership}
                className="flex flex-col md:flex-row justify-center gap-4 md:gap-8"
              >
                {membershipOptions.map((option, index) => (
                  <label
                    key={index}
                    className="flex cursor-pointer"
                    htmlFor={`membership-${option.type}`}
                  >
                    <div
                      className={`w-1 rounded-l-lg ${
                        selectedMembership === option.type
                          ? "bg-[#43454D]"
                          : "bg-white"
                      }`}
                    ></div>
                    <div
                      className={`rounded-r-lg p-4 md:p-6 flex flex-col items-center gap-2 w-full md:min-w-[180px] transition-all ${
                        selectedMembership === option.type
                          ? "bg-[#f0f0f0] border-2 border-[#43454D]"
                          : "bg-[#dddddd] border-2 border-transparent"
                      }`}
                    >
                      <RadioGroupItem
                        value={option.type}
                        id={`membership-${option.type}`}
                        className="w-6 h-6 border-2 border-gray-400 data-[state=checked]:bg-[#43454D] data-[state=checked]:border-[#43454D]"
                      />
                      <div className="text-center">
                        <p
                          className={`font-bold text-lg ${
                            selectedMembership === option.type
                              ? "text-[#43454D] underline"
                              : option.highlighted
                              ? "text-[#43454d] underline"
                              : "text-[#292f36]"
                          }`}
                        >
                          {option.title}
                        </p>
                        <p className="text-[#43454d]">{option.price}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </RadioGroup>

              {/* JOIN NOW 按钮 */}
              <div className="flex justify-center">
                <button
                  onClick={() => handleJoin(selectedMembership)}
                  disabled={!selectedMembership}
                  className="flex items-center gap-4 bg-[#f38406] border-2 border-[#f38406] rounded-full px-8 py-3 text-white font-medium hover:bg-[#e67300] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>JOIN NOW</span>
                  <ChevronsRight />
                </button>
              </div>

              {/* Position Verification */}
              {verifyData?.length ? (
                <div className="space-y-6 md:space-y-10">
                  <div className="flex flex-col items-center gap-4">
                    <h3 className="text-xl md:text-2xl text-[#f38406]">
                      Position Verification
                    </h3>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-[#f38406] rounded-full"></div>
                      <div className="w-56 h-0.5 bg-[#f38406]"></div>
                      <div className="w-2 h-2 bg-[#f38406] rounded-full"></div>
                    </div>
                  </div>

                  <div
                    className={`flex px-4 md:px-10 ${
                      verifyData.length === 1
                        ? "gap-0"
                        : verifyData.length === 2
                        ? "gap-8 md:gap-16"
                        : "gap-6 md:gap-32"
                    }`}
                  >
                    {verifyData.map((it, index) => (
                      <div key={index} className="flex w-full lg:w-[30%] flex-col gap-2 md:gap-3.5">
                        <div className="flex items-center">
                          <img
                            src={theme?.verifyImgs?.[index] || theme?.verifyImgs?.[0] || "/aave.png"}
                            alt={it.tokenSymbol}
                            className="w-16 md:w-[97px]"
                          />
                        </div>
                        <p className="text-[#f38406] font-semibold text-sm md:text-base">
                          {it.chainName} Chain
                        </p>
                        <div className="space-y-2">
                          <p className="text-white font-light text-sm md:text-base">
                            Hold {it.tokenSymbol} ≥
                            {formatUnits(it.threshold, it.decimals)}
                          </p>
                          <div className="h-px bg-[#98faec]"></div>
                        </div>
                        <div
                          className="flex items-end gap-2 cursor-pointer"
                          onClick={() => handleVerify(it)}
                        >
                          <div className="flex flex-col gap-1">
                            <span className="text-[#f38406] text-xs">
                              Verify
                            </span>
                            <div className="h-0.5 bg-[#f38406]"></div>
                          </div>
                          <MousePointer className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
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
            <div className="bg-[#e5e5e5] rounded-b-lg p-4 md:p-10">
              <div className="space-y-6 md:space-y-10">
                <div className="flex flex-col items-center gap-4">
                  <h3 className="text-xl md:text-2xl text-[#191D22]">Links & Apps</h3>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-[#191D22] rounded-full"></div>
                    <div className="w-32 h-0.5 bg-[#191D22]"></div>
                    <div className="w-2 h-2 bg-[#191D22] rounded-full"></div>
                  </div>
                </div>

                <div className="flex justify-center gap-4 md:gap-8 flex-wrap">
                  {theme.socials.map((app, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className={`flex items-center justify-center`}>
                        <img
                          src={app.icon}
                          alt={app.name}
                          className="size-16 md:size-[84px] rounded-full"
                        />
                      </div>
                      <span className="text-black text-xs md:text-sm">{app.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Community News 区域 */}
          <div className="space-y-10">
            <div className="flex flex-col items-center gap-4">
              <h3 className="text-xl md:text-2xl text-[#f38406]">Community News</h3>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-[#f38406] rounded-full"></div>
                <div className="w-40 h-0.5 bg-[#f38406]"></div>
                <div className="w-2 h-2 bg-[#f38406] rounded-full"></div>
              </div>
            </div>

            <div className="space-y-4 md:space-y-8">
              <div className="h-px bg-[#f38406]"></div>

              {currentNewsData.map((news: any, index: number) => (
                <div key={index} className="flex items-start gap-3 md:gap-6">
                  <img
                    src={news.image || "/news1.png"}
                    alt={news.title}
                    className="w-16 md:w-20 h-12 md:h-16 object-cover rounded flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-medium mb-1 text-sm md:text-base leading-tight">
                      {news.title || "Weekly Alpha Information Summary"}
                    </h4>
                    <p className="text-white text-xs md:text-sm">
                      {news.source || "Source: Twitter Alpha"}
                    </p>
                  </div>
                </div>
              ))}

              <div className="h-px bg-[#f38406]"></div>
            </div>

            {/* 分页按钮 */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                <button className="bg-[#f38406] text-[#292F36] h-[56px] rounded-[32px] px-6 md:px-8 py-2 md:py-4 text-sm transition-colors">
                  View More
                </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="bg-[#292F36] text-white h-[56px] rounded-[32px] px-6 md:px-8 py-2 md:py-4 text-sm disabled:opacity-50 transition-colors"
              >
                Next
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center space-y-4 pt-10">
            <h4 className="text-white text-lg tracking-wider">
              {domainName} . W E B 3 . C L U B
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

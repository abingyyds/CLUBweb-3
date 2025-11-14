import React, { useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { ConnectButton } from "./ConnectButton";
import { MemberModal } from "./MemberModal";
import { usePagination } from "../../hooks/usePagination";
import { useClubData } from "../../hooks/useClubData";
import { useClubMembership } from "../../hooks/useClubMembership";
import { useAccount } from "wagmi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import testImg from "@/assets/images/test.png";
import { ITheme } from "@/types";
import { formatUnits } from "viem";

export const Template2 = ({
  club,
  theme,
}: {
  theme?: ITheme;
  club: string;
}) => {
  const { address } = useAccount();
  const domainName = club;

  const {
    currentPage,
    totalPages,
    currentData: currentNewsData,
    handlePageChange,
  } = usePagination({
    data: theme.news,
    itemsPerPage: 4,
  });

  const {
    verifyData,
    memberData,
    yearPrice,
    monthPrice,
    quarterPrice,
    lifetimePrice,
    isLoading,
    isError,
  } = useClubData({
    domainName,
    address,
  });

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

  // 选中的计划和价格状态
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");

  // 创建会员选项数组（基于template1结构）
  const membershipOptions = [
    {
      title: "Lifetime Member",
      price: lifetimePrice,
      type: "lifetime",
    },
    monthPrice && {
      title: "Monthly Member",
      price: monthPrice,
      type: "month",
    },
    quarterPrice && {
      title: "Quarterly Member",
      price: quarterPrice,
      type: "quarter",
    },
    yearPrice && {
      title: "Yearly Member",
      price: yearPrice,
      type: "year",
    },
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-4 md:px-20 py-5">
        <h1 className="text-black font-bold text-base uppercase tracking-wide">
          {club}.web3.club
        </h1>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-20 py-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl md:text-8xl font-extrabold text-black leading-tight mb-0">
              {theme.heroTitle}
            </h1>
            <h1 className="text-4xl md:text-6xl md:text-8xl font-extrabold leading-tight -mt-2 bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent">
              {theme.heroGradientText}
            </h1>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="text-2xl md:text-3xl font-extrabold text-black tracking-wider">
              🔥 👍 😄
            </div>
            <p className="text-sm text-black max-w-80 leading-5">
              {theme.clubIntroduction2}
            </p>
          </div>
        </div>
      </section>

      {/* Fun with us & Connect Wallet Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-20 py-6 md:py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 min-h-[300px] md:h-96">
          {/* Left side - Fun with us */}
          <div className="flex gap-1 md:gap-4 w-[58%] md:w-[65%] h-[58lvw] md:h-full">
            {/* Fun with us card */}
            <div
              className="relative p-6 flex-1 rounded-3xl md:rounded-3xl flex flex-col justify-between"
              style={{
                background: `url(/Subtract.png) no-repeat top left / contain`,
              }}
            >
              {/* <img
                src="/Subtract.png"
                className="w-full inset-0 absolute"
                alt=""
              /> */}
              <h2 className="text-2xl md:text-5xl font-extrabold text-white leading-tight">
                {theme.heroSubtitle}
              </h2>
              <div className="flex items-center">
                <img
                  src={theme.avatar1}
                  alt="User 1"
                  className="w-10 md:w-14 h-10 md:h-14 rounded-full border-2 border-white"
                />
                <img
                  src={theme.avatar2}
                  alt="User 2"
                  className="w-10 md:w-14 h-10 md:h-14 rounded-full border-2 border-white -ml-2"
                />
                <img
                  src={theme.avatar3}
                  alt="User 3"
                  className="w-10 md:w-14 h-10 md:h-14 rounded-full border-2 border-white -ml-2"
                />
              </div>
            </div>
            {/* Background images - now visible on mobile */}
            <div className="absolute left-[77%] md:static flex flex-col items-end gap-3 w-auto ml-[-116px]">
              <img
                src={theme.heroImg1}
                alt="Background 1"
                className="w-[31dvw] md:w-[240px] h-[31dvw] md:h-[218px] rounded-3xl object-cover"
              />
              <img
                src={theme.heroImg2}
                alt="Background 2"
                className="w-[45dvw] md:w-[360px] h-[24dvw] md:h-[156px] rounded-3xl object-cover"
              />
            </div>
          </div>

          {/* Right side - Connect Wallet */}
          <div className="flex flex-col items-center md:items-end gap-4 w-full md:w-auto">
            <ConnectButton />
            <div className="w-full md:w-72 h-[70vw] md:h-[300px] order-1 md:order-2">
              <img
                src={theme.heroImg3}
                alt="Side image"
                className="w-full h-full rounded-2xl md:rounded-3xl object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Text with Background Decorations */}
      <section className="max-w-6xl mx-auto px-4 md:px-20 py-6 md:py-10 relative">
        {/* Background decoration bars - hidden on mobile */}
        <div className="hidden md:block absolute top-16 left-96 w-96 h-6 bg-teal-500 opacity-70"></div>
        <div className="hidden md:block absolute top-32 left-20 w-96 h-6 bg-teal-500 opacity-70"></div>
        <div className="hidden md:block absolute top-32 right-32 w-24 h-6 bg-teal-500 opacity-70"></div>
        <div className="hidden md:block absolute top-40 left-20 w-64 h-6 bg-teal-500 opacity-70"></div>

        <p className="text-2xl md:text-5xl font-extrabold text-black leading-tight relative z-10">
          {theme.clubIntroduction1}
        </p>
      </section>

      {/* Join the Option Section */}
      {theme.showMemberOption ? (
        <section className="max-w-6xl mx-auto px-4 md:px-20 py-6 md:py-10">
          <div className="bg-gray-900 rounded-2xl md:rounded-3xl p-6 md:p-20 flex flex-col md:flex-row md:items-center gap-6 md:gap-20">
            <img
              src={testImg}
              alt="Join option"
              className="w-full md:w-96 h-48 md:h-72 rounded-xl object-cover"
            />
            <div className="flex-1 space-y-4 md:space-y-5">
              <h2 className="text-2xl md:text-5xl font-extrabold text-white">
                Join the Option
              </h2>
              <div className="space-y-4 md:space-y-5">
                <div>
                  <label className="block text-white font-bold mb-2">
                    Plan
                  </label>
                  <Select
                    value={selectedPlan}
                    onValueChange={(value) => {
                      setSelectedPlan(value);
                      const selectedOption = membershipOptions.find(
                        (option) => option.type === value
                      );
                      if (selectedOption) {
                        setSelectedPrice(selectedOption.price);
                      }
                    }}
                  >
                    <SelectTrigger className="bg-white rounded-lg px-4 py-3 text-gray-600">
                      <SelectValue placeholder="Select Plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {membershipOptions.map((option) => (
                        <SelectItem key={option.type} value={option.type}>
                          {option.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-white font-bold mb-2">
                    Price
                  </label>
                  <div className="bg-white rounded-lg px-4 py-3 flex items-center gap-2">
                    <span className="text-black">ETH</span>
                    <span className="text-gray-600">{selectedPrice}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleJoin(selectedPlan)}
                className="w-full bg-teal-500 text-white font-medium py-3 rounded-lg hover:bg-teal-600 transition-colors"
              >
                Join Now
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {/* Position Verification Section */}
      {verifyData?.length ? (
        <section className="max-w-6xl mx-auto px-4 md:px-20 py-6 md:py-10">
          <h2 className="text-2xl md:text-5xl font-extrabold text-black mb-6 md:mb-10">
            Position Verification
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {verifyData?.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-xl p-4 md:p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-3 md:gap-5">
                  <div className="w-12 md:w-18 h-12 md:h-18 rounded-lg overflow-hidden">
                    <img
                      src={
                        theme?.verifyImgs?.[index] ||
                        theme?.verifyImgs?.[0] ||
                        "/aave.png"
                      }
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-sm md:text-base">
                      {item.chainName}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      Hold {item.tokenSymbol} ≥{" "}
                      {formatUnits(item.threshold, item.decimals)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleVerify(item)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <ArrowRight className="w-5 md:w-6 h-5 md:h-6" />
                </button>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Links & Apps Section */}
      <section className="max-w-6xl mx-auto px-4 md:px-20 py-6 md:py-10">
        <h2 className="text-2xl md:text-5xl font-extrabold text-black mb-6 md:mb-10">
          Links & Apps
        </h2>
        <div className="flex items-center justify-around gap-4 md:gap-10">
          {theme.socials.map((link, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-xl p-4 md:p-8 flex flex-col items-center justify-center"
            >
              <div
                className={`w-12 md:w-16 h-12 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center`}
              >
                <img src={link.icon} alt={link.name} className="w-full" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community News Section */}
      {theme?.news && theme.news.length > 0 && (
        <section className="flex flex-col items-center gap-6 md:gap-8 px-[30px] py-6 md:py-8 w-full max-w-6xl mx-auto">
          <h2 className="text-black text-2xl md:text-3xl font-bold text-center">
            Community News
          </h2>
          <div className="flex flex-col w-full gap-4 md:gap-6 max-w-6xl">
            {currentNewsData.map((news, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-5 py-4 md:py-5 px-2 md:px-4 min-w-0 bg-white/50 rounded-xl relative"
              >
                {/* 数字标签 - 在手机端绝对定位到图片左上角，在桌面端正常显示 */}
                <div className="absolute md:relative top-4 left-2 md:top-auto md:left-auto z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 font-[1000] bg-[#2AADA5] rounded-xl text-white text-sm md:text-base font-bold flex-shrink-0">
                  {(currentPage - 1) * 5 + index + 1}
                </div>
                {/* 图片 */}
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full md:w-64 md:w-80 h-32 md:h-20 md:h-24 object-cover rounded-xl flex-shrink-0"
                />
                {/* 文本内容和按钮容器 - 在手机端横向排列 */}
                <div className="flex flex-row md:flex-1 md:min-w-0 items-center justify-between w-full md:w-auto gap-2">
                  <div className="flex-1 min-w-0 px-2">
                    <p className="text-black text-sm md:text-base font-bold mb-1 md:mb-2 break-words leading-relaxed">
                      {news.title}
                    </p>
                    <p className="text-black/80 text-xs md:text-sm break-words">
                      Source: {news.source}
                    </p>
                  </div>
                  <button
                    onClick={() => window.open(news.link, "_blank")}
                    className="p-2 flex-shrink-0 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-black" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-6 md:mt-8 px-2 w-full">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 disabled:opacity-50 flex-shrink-0 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-black" />
            </button>
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 rounded text-sm font-medium flex-shrink-0 transition-colors ${
                      currentPage === pageNum
                        ? "bg-[#2AADA5] text-white"
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              {totalPages > 5 && (
                <>
                  <span className="text-black px-2">...</span>
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className={`w-8 h-8 rounded text-sm font-medium ${
                      currentPage === totalPages
                        ? "bg-[#2AADA5] text-white"
                        : "text-black hover:bg-gray-100"
                    }`}
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5 text-black" />
            </button>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="w-full mx-auto bg-[#2AADA5]">
        <div className="max-w-6xl mx-auto px-4 md:px-20 py-6 md:py-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center justify-center md:justify-start">
              <img
                src={theme.avatar1}
                alt="User 1"
                className="w-10 md:w-14 h-10 md:h-14 rounded-full border-2 border-white"
              />
              <img
                src={theme.avatar2}
                alt="User 2"
                className="w-10 md:w-14 h-10 md:h-14 rounded-full border-2 border-white -ml-2"
              />
              <img
                src={theme.avatar3}
                alt="User 3"
                className="w-10 md:w-14 h-10 md:h-14 rounded-full border-2 border-white -ml-2"
              />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-black">{domainName}.web3.club</h3>
            </div>
            <p className="text-sm text-black text-center md:text-left">
              <span>Powered by </span>
              <span className="font-bold">Web3.Club</span>
              <span> and </span>
              <span className="font-bold">OrbitLink.Me</span>
            </p>
          </div>
        </div>
      </footer>

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

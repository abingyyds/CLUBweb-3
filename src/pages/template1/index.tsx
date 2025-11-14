import React, { useState, useEffect } from "react";
import { ConnectButton } from "../../components/ConnectButton";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";
import Pagination from "../../components/Pagination";
import { ITheme } from "@/types";
import { MemberModal } from "./MemberModal";
import { usePagination } from "../../hooks/usePagination";
import { useClubData } from "../../hooks/useClubData";
import { useClubMembership } from "../../hooks/useClubMembership";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Frame4Image from "../../assets/images/Frame 4.png";
import Frame4_1Image from "../../assets/images/Frame 4_1.png";
import cursor_1 from "../../assets/images/cursor_3_fill.png";
import cursor_2 from "../../assets/images/cursor_4_fill.png";
import cursor_3 from "../../assets/images/cursor_5_fill.png";

export const Template1: React.FC<{ theme?: ITheme; club: string }> = ({
  theme,
  club,
}) => {
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
    itemsPerPage: 5,
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

  // 响应式背景图片逻辑
  const [isMobile, setIsMobile] = useState(false);

  // 选中的计划和价格状态
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [selectedPrice, setSelectedPrice] = useState<string>("");

  // 创建会员选项数组（基于template3结构）
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

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm断点是640px
    };

    // 初始检查
    checkIsMobile();

    // 监听窗口大小变化
    window.addEventListener("resize", checkIsMobile);

    // 清理事件监听器
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <div className="flex flex-col items-center bg-white w-full min-h-screen overflow-x-hidden">
      {/* Member Modal */}
      <MemberModal
        open={modalOpen}
        setOpen={setModalOpen}
        data={memberData}
        onConfirm={handleConfirmJoin}
        isVerifyMode={isVerifyMode}
      />

      {/* Header */}
      <div className="position flex justify-between items-center w-full max-w-[1280px] px-4 sm:px-6 md:px-8 py-4 md:py-5">
        <div className="flex items-center gap-1 min-w-0">
          <div className="w-4 h-4 sm:w-5 sm:h-5 bg-[#e3e337] rounded-full flex-shrink-0"></div>
          <span className="text-black text-sm sm:text-base font-bold truncate">
            {domainName}.web3.club
          </span>
        </div>
        <ConnectButton className="bg-black text-white px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors flex-shrink-0" />
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col items-stretch w-full max-w-[1280px] px-4 sm:px-6 md:px-8 py-8 md:py-10 gap-8 sm:gap-10 md:gap-12 md:gap-16 overflow-hidden">
        {/* Hero Section */}
        <div className="flex flex-col items-center bg-[#f8f8f8] rounded-[20px] md:rounded-[40px] px-6 sm:px-8 md:px-12 md:px-16 py-8 sm:py-12 md:py-16 relative">
          {/* Floating Hero Cells */}
          <div className="absolute top-20 md:top-32 right-8 md:right-48 px-2 md:px-4 py-4 md:py-8 hidden sm:block">
            <img
              src={cursor_1}
              alt="cursor_1"
              className="w-5 h-5 md:w-7 md:h-7 absolute top-[8px] md:top-[12px] left-[-6px] md:left-[-8px]"
            />
            <div className="bg-[#f0bd24] rounded-full px-2 md:px-4 py-1 md:py-2">
              <span className="text-white text-xs md:text-sm font-medium">
                Cody Fisher
              </span>
            </div>
          </div>
          <div className="absolute top-20 md:top-[170px] left-8 md:left-48 px-2 md:px-4 py-4 md:py-8 hidden sm:block">
            <img
              src={cursor_3}
              alt="cursor_3"
              className="w-5 h-5 md:w-7 md:h-7 absolute top-[8px] md:top-[12px] left-[-6px] md:left-[-8px]"
            />
            <div className="bg-[#4a6af3] rounded-full px-2 md:px-4 py-1 md:py-2">
              <span className="text-white text-xs md:text-sm font-medium">
                Henry
              </span>
            </div>
          </div>
          <div className="absolute bottom-[70px] md:bottom-[80px] right-8 md:right-44 px-2 md:px-4 py-4 md:py-8 hidden sm:block">
            <img
              src={cursor_2}
              alt="cursor_2"
              className="w-5 h-5 md:w-7 md:h-7 absolute top-[8px] md:top-[12px] left-[-6px] md:left-[-8px]"
            />
            <div className="bg-[#ff8678] rounded-full px-2 md:px-4 py-1 md:py-2">
              <span className="text-white text-xs md:text-sm font-medium">
                Annette Black
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 md:gap-5 pt-8 md:pt-16 pb-8 md:pb-12 px-[30px] w-full max-w-6xl mx-auto">
            <h1 className="text-black text-2xl sm:text-3xl md:text-4xl md:text-5xl font-bold text-center leading-tight">
              {theme.heroTitle}
            </h1>
            <div className="flex items-center gap-2 md:gap-2.5 flex-wrap justify-center">
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-white bg-gray-300 shadow-lg">
                <img src={theme?.avatar1} className="w-full" alt="" />
              </div>
              <span className="text-black text-2xl sm:text-3xl md:text-4xl md:text-5xl font-bold">
                {theme.heroGradientText}
              </span>
              <div className="flex">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-white bg-gray-300 shadow-lg">
                  <img src={theme?.avatar2} className="w-full" alt="" />
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-white bg-gray-300 shadow-lg -ml-3 md:-ml-5">
                  <img src={theme?.avatar3} className="w-full" alt="" />
                </div>
              </div>
            </div>
            <p className="text-black/80 text-xs sm:text-sm text-center max-w-sm sm:max-w-lg md:max-w-4xl mt-4 md:mt-10 mb-[50px] leading-relaxed px-2">
              {theme.clubIntroduction1}
              {theme.clubIntroduction2}
            </p>
          </div>

          {/* Join the Option Section - Now properly positioned */}
          {theme.showMemberOption ? (
            <div className="absolute px-[30px] top-[320px] md:top-[400px] w-full max-w-6xl mx-auto mt-6 md:mt-8 mb-4 md:mb-6">
              <div
                className="p-6 sm:py-6 md:py-9"
                style={{
                  backgroundImage: `url(${
                    isMobile ? Frame4_1Image : Frame4Image
                  })`,
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <h2 className="text-black text-xl my-2 sm:text-2xl md:text-3xl font-bold text-center mb-4 md:mb-6">
                  Join the Option
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 mb-4 md:mb-6">
                  <div className="w-full sm:w-[200px] md:w-[260px]">
                    <p className="text-black text-sm md:text-base font-bold mb-2">
                      Plan
                    </p>
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
                      <SelectTrigger className="bg-white text-black border border-black rounded-lg px-3 md:px-4 py-2 text-xs md:text-sm">
                        <SelectValue placeholder="Select Plan" />
                      </SelectTrigger>
                      <SelectContent className="bg-white text-black">
                        {membershipOptions.map((option) => (
                          <SelectItem key={option.type} value={option.type}>
                            {option.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full sm:w-[200px] md:w-[260px]">
                    <p className="text-black text-sm md:text-base font-bold mb-2">
                      Price
                    </p>
                    <div className="flex items-center bg-white border border-black rounded-lg px-3 md:px-4 py-2 md:py-3 h-10">
                      <span className="text-black text-xs md:text-sm">ETH</span>
                      <span className="text-black/80 text-xs md:text-sm ml-1">
                        {selectedPrice}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleJoin(selectedPlan)}
                  className="w-full max-w-xs my-4 sm:max-w-sm md:max-w-80 bg-black text-white py-2 px-5 rounded-full text-xs md:text-sm font-medium hover:bg-gray-800 transition-colors mx-auto block"
                >
                  Join Now
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {/* Position Verification Section */}
        {verifyData?.length ? (
          <div className="flex flex-col items-center gap-6 mt-[180px] md:gap-8 px-[30px] py-6 md:py-8 w-full max-w-6xl mx-auto">
            <h2 className="text-black text-2xl md:text-3xl font-bold text-center">
              Position Verification
            </h2>
            <div className="flex flex-col md:flex-row items-start gap-4 md:gap-5 w-full">
              {verifyData?.map((item, index) => (
                <React.Fragment key={index}>
                  <div
                    className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-2.5 bg-white rounded-2xl p-4 md:p-5"
                    style={{
                      boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="flex flex-col flex-1 gap-1">
                      <div className="flex mb-2">
                        <img
                          src={
                            theme?.verifyImgs?.[index] ||
                            theme?.verifyImgs?.[0] ||
                            "/aave.png"
                          }
                          alt="Chain"
                          className="w-auto h-8"
                        />
                      </div>
                      <p className="text-black text-sm md:text-base font-bold">
                        {item.chainName} Chain
                      </p>
                      <p className="text-black/80 text-xs">
                        Hold {item.tokenSymbol} ≥{" "}
                        {formatUnits(item.threshold, item.decimals)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleVerify(item)}
                      className="bg-[#e3e337] text-black px-4 md:px-5 py-2 rounded-full text-sm font-medium hover:bg-[#d4d42e] transition-colors self-start md:self-auto"
                    >
                      Verify
                    </button>
                  </div>
                  {index < (verifyData?.length || 0) - 1 && (
                    <div className="hidden md:block w-px h-24 bg-gray-300 mt-8"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : null}

        {/* Links & Apps Section */}
        <div className="flex flex-col items-center gap-6 md:gap-8 py-10 md:py-12 md:py-16 w-full max-w-6xl mx-auto">
          <h2 className="text-black text-2xl md:text-3xl font-bold text-center">
            Links & Apps
          </h2>
          <div className="flex items-center justify-around gap-4 w-full max-w-6xl">
            {theme?.socials?.map((app, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-[#f8f8f8] rounded-2xl px-5 py-[30px] w-full aspect-square max-w-[160px] mx-auto gap-3"
              >
                <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden">
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col items-center justify-center flex-1 px-1">
                  <p className="text-black text-[10px] sm:text-xs font-bold text-center break-words line-clamp-2 leading-tight">
                    {app.name}
                  </p>
                </div>
                <button
                  onClick={() => window.open(app.link, "_blank")}
                  className="bg-[#e3e337] text-black px-2 py-1 rounded-full text-[10px] sm:text-xs font-medium hover:bg-[#d4d42e] transition-colors whitespace-nowrap w-full max-w-[80px]"
                >
                  {app.text}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Community News Section */}
        {theme?.news && theme.news.length > 0 && (
          <div className="flex flex-col items-center gap-6 md:gap-8 px-[30px] py-6 md:py-8 w-full max-w-6xl mx-auto">
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
                  <div className="absolute md:relative top-4 left-2 md:top-auto md:left-auto z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 font-[1000] bg-[#e3e337] rounded-xl text-black text-sm md:text-base font-bold flex-shrink-0">
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
                        Source: {news.category}
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
                          ? "bg-[#e3e337] text-black"
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
                          ? "bg-[#e3e337] text-black"
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
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[1280px] px-4 sm:px-6 md:px-8 py-6 md:py-8 mt-auto gap-4 md:gap-0">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-[#e3e337] rounded-full"></div>
          <span className="text-black text-sm md:text-base font-bold">
            {domainName}.web3.club
          </span>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 text-xs sm:text-sm text-black">
          <span>Powered by</span>
          <div className="flex items-center gap-2">
            <div className="bg-[#e3e337] px-2 sm:px-3 py-1 rounded text-black font-medium text-xs sm:text-sm">
              Web3.Club
            </div>
            <span>and</span>
            <div className="bg-[#e3e337] px-2 sm:px-3 py-1 rounded text-black font-medium text-xs sm:text-sm">
              OrbitLink.Me
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

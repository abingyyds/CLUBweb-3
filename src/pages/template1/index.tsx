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
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

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

  return (
    <div className="flex flex-col items-center bg-white w-full min-h-screen">
      {/* Member Modal */}
      <MemberModal
        open={modalOpen}
        setOpen={setModalOpen}
        data={memberData}
        onConfirm={handleConfirmJoin}
        isVerifyMode={isVerifyMode}
      />

      {/* Header */}
      <div className="flex justify-between items-center w-full max-w-[1280px] px-8 py-5">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-[#e3e337] rounded-full"></div>
          <span className="text-black text-base font-bold">abc.web3.club</span>
        </div>
        <ConnectButton className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors" />
      </div>

      {/* Main Content Container */}
      <div className="flex flex-col items-stretch w-full max-w-[1280px] px-32 py-10 gap-20">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center bg-[#f8f8f8] rounded-[40px] px-15 py-15 relative">
          {/* Floating Hero Cells */}
          <div className="absolute top-6 right-32 bg-[#f0bd24] rounded-full px-4 py-2">
            <span className="text-white text-sm font-medium">Cody Fisher</span>
          </div>
          <div className="absolute top-20 left-40 bg-[#4a6af3] rounded-full px-4 py-2">
            <span className="text-white text-sm font-medium">Henry</span>
          </div>
          <div className="absolute bottom-32 right-48 bg-[#ff8678] rounded-full px-4 py-2">
            <span className="text-white text-sm font-medium">Annette Black</span>
          </div>

          <div className="flex flex-col items-center gap-5 pt-16 pb-48">
            <h1 className="text-black text-5xl font-bold text-center leading-tight">
              Eternal Profit
            </h1>
            <div className="flex items-center gap-2.5">
              <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-300 shadow-lg"></div>
              <span className="text-black text-5xl font-bold">Community</span>
              <div className="flex">
                <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-300 shadow-lg"></div>
                <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-300 shadow-lg -ml-5"></div>
              </div>
            </div>
            <p className="text-black/80 text-sm text-center max-w-2xl mt-10 leading-relaxed">
              Welcome to the Eternal Profit Community! We are a professional community focused on blockchain technology
              innovation and DeFi investment. Here, you will gain access to the most cutting-edge Alpha information, professional
              investment advice, and a wealth of learning resources.
            </p>
          </div>

          {/* Join the Option Section - Overlapping */}
          <div className="absolute -bottom-28 left-20 right-20 bg-[#e3e337] rounded-lg p-8 border-[20px] border-[#e3e337]">
            <h2 className="text-black text-3xl font-bold text-center mb-6">Join the Option</h2>
            <div className="flex items-center gap-5 mb-6">
              <div className="flex-1">
                <p className="text-black text-base font-bold mb-2">Plan</p>
                <div className="flex items-center justify-between bg-white border border-black rounded-lg px-4 py-2">
                  <span className="text-black/80 text-sm">Lifetime Member</span>
                  <ChevronDown className="w-6 h-6 text-black" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-black text-base font-bold mb-2">Price</p>
                <div className="flex items-center justify-center bg-white border border-black rounded-lg px-4 py-3 h-10">
                  <span className="text-black text-sm">$</span>
                  <span className="text-black/80 text-sm ml-1">5.0</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleJoin("lifetime")}
              className="w-80 bg-black text-white py-2 px-5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors mx-auto block"
            >
              Join Now
            </button>
          </div>
        </div>

        {/* Position Verification Section */}
        <div className="flex flex-col items-center gap-8 px-15 py-5 mt-20">
          <h2 className="text-black text-3xl font-bold text-center">Position Verification</h2>
          <div className="flex items-start justify-center gap-5 w-full">
            {verifyData?.map((item, index) => (
              <React.Fragment key={index}>
                <div className="flex-1 flex items-start justify-end gap-2.5 bg-white rounded-2xl shadow-lg p-5">
                  <div className="flex flex-col flex-1 gap-1">
                    <div className="flex items-center justify-center mb-2">
                      <img src={theme?.ethImg} alt="Chain" className="w-24 h-10" />
                    </div>
                    <p className="text-black text-base font-bold">{item.chainName} Chain</p>
                    <p className="text-black/80 text-xs">
                      Hold {item.tokenSymbol} ≥ {formatUnits(item.threshold, item.decimals)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleVerify(item)}
                    className="bg-[#e3e337] text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-[#d4d42e] transition-colors"
                  >
                    Verify
                  </button>
                </div>
                {index < (verifyData?.length || 0) - 1 && (
                  <div className="w-px h-24 bg-gray-300 mt-8"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Links & Apps Section */}
        <div className="flex flex-col items-center gap-8 px-15 py-5">
          <h2 className="text-black text-3xl font-bold text-center">Links & Apps</h2>
          <div className="flex flex-wrap items-start gap-2.5 w-full">
            {theme?.socials?.map((app, index) => (
              <div key={index} className="flex-1 flex flex-col items-center justify-center bg-[#f8f8f8] rounded-2xl p-8 gap-5 min-w-[160px]">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl overflow-hidden bg-[#3088ff]">
                  <img src={app.icon} alt={app.name} className="w-8 h-8" />
                </div>
                <div className="flex flex-col items-center gap-2.5">
                  <p className="text-black text-base font-bold">{app.name}</p>
                  <button
                    onClick={() => window.open(app.link, "_blank")}
                    className="bg-[#e3e337] text-black px-5 py-2 rounded-full text-sm font-medium hover:bg-[#d4d42e] transition-colors"
                  >
                    {app.text}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community News Section */}
        <div className="flex flex-col items-center gap-8 px-15 py-5">
          <h2 className="text-black text-3xl font-bold text-center">Community News</h2>
          <div className="flex flex-col w-full gap-0">
            {currentNewsData.map((news, index) => (
              <div key={index} className="flex items-center gap-5 py-4 border-b border-gray-200 last:border-b-0">
                <div className="flex items-center justify-center w-8 h-8 bg-[#e3e337] rounded text-black text-sm font-bold">
                  {(currentPage - 1) * 5 + index + 1}
                </div>
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-24 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="text-black text-base font-bold mb-1">{news.title}</p>
                  <p className="text-black/80 text-xs">Source: {news.category}</p>
                </div>
                <button
                  onClick={() => window.open(news.link, "_blank")}
                  className="p-1"
                >
                  <ChevronRight className="w-6 h-6 text-black" />
                </button>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex items-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5 text-black" />
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 rounded text-sm font-medium ${
                      currentPage === pageNum
                        ? 'bg-[#e3e337] text-black'
                        : 'text-black hover:bg-gray-100'
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
                        ? 'bg-[#e3e337] text-black'
                        : 'text-black hover:bg-gray-100'
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
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center w-full max-w-[1280px] px-8 py-8 mt-auto">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-[#e3e337] rounded-full"></div>
          <span className="text-black text-base font-bold">abc.web3.club</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-black">
          <span>Powered by</span>
          <div className="bg-[#e3e337] px-3 py-1 rounded text-black font-medium">
            Web3.Club
          </div>
          <span>and</span>
          <div className="bg-[#e3e337] px-3 py-1 rounded text-black font-medium">
            OrbitLink.Me
          </div>
        </div>
      </div>
    </div>
  );
};

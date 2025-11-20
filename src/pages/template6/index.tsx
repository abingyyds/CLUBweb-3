import React from "react";
import { ConnectButton } from "../../components/ConnectButton";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";
import Pagination from "../../components/Pagination";
import { ITheme } from "@/types";
import { MemberModal } from "./MemberModal";
import { usePagination } from "../../hooks/usePagination";
import { useClubData } from "../../hooks/useClubData";
import { useClubMembership } from "../../hooks/useClubMembership";
import { Heart, Gift, ExternalLink } from "lucide-react";

const Template6: React.FC<{ theme?: ITheme; club: string }> = ({
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
    itemsPerPage: 4,
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

  return (
    <div
      className="flex flex-col items-center min-h-screen w-full"
      style={{ background: "#fefafe" }}
    >
      {/* Member Modal */}
      <MemberModal
        open={modalOpen}
        setOpen={setModalOpen}
        data={memberData}
        onConfirm={handleConfirmJoin}
        isVerifyMode={isVerifyMode}
      />

      {/* Main Container */}
      <div
        className="w-full max-w-[1280px] mx-auto overflow-x-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(252, 239, 253, 0.00) 81.35%, #FFE0E8 100%)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-center md:justify-between px-4 md:px-20 py-4 md:py-6">
          <div className="flex items-center gap-2 w-full justify-center md:w-auto md:justify-start">
            <img src="/ecg_heart.png" className="w-6 h-6 text-[#ef5da8]" />
            <span className="text-black font-bold text-base md:text-lg">
              {domainName}.web3.club
            </span>
          </div>
          <ConnectButton
            className="bg-[#ef5da8] hidden md:flex  hover:bg-[#d64a94] text-white px-5 py-2 rounded-full text-sm font-medium"
            icon="/arrow-circle.png"
          />
        </div>

        {/* Hero Section */}
        <div className="relative px-4 md:px-52 py-10 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 bg-[#FDE2FF] mx-6">
          {/* Hero Content */}
          <div className="flex-1 max-w-md">
            <div className="relative mb-10">
              <h1 className="absolute z-[99] top-0 left-0 text-center md:text-left text-3xl md:text-5xl font-bold text-black uppercase leading-tight">
                {theme.heroTitle}{" "}
                <span className="text-[#ef5da8]">{theme.heroGradientText}</span>
              </h1>
              {/* Decorative underline */}
              <img
                src={"/lineicon.png"}
                alt="Vector"
                className="absolute z-[1] top-6 md:top-8 right-8 md:right-[40px] w-20 md:w-28 h-auto opacity-80"
              />
            </div>

            <p className="text-black/80 mt-24 md:mt-32 text-sm md:text-base leading-relaxed mb-8">
              {theme.clubIntroduction1}
              <br />
              <br />
              {theme.clubIntroduction2}
            </p>

            <div className="relative w-fit mx-auto md:mx-0">
              <ConnectButton
                className="bg-[#ef5da8] hover:bg-[#d64a94] text-white px-5 py-2 rounded-full text-sm font-medium relative z-10"
                icon="/arrow-circle.png"
              />
              <img
                src={"/Vector.png"}
                alt="Vector"
                className="absolute top-1/2 right-[-40px] md:right-[-50px] transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16"
              />
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex-shrink-0">
            <img
              src={theme?.heroImg}
              alt="Hero Illustration"
              className="w-64 md:w-80 h-auto"
            />
          </div>
        </div>

        {/* Join the Option Section */}
        {theme.showMemberOption ? (
          <div className="px-4 md:px-20 py-16">
            <div className="text-center mb-12">
              <div className="relative inline-block">
                <img
                  src={"/Vector.png"}
                  alt="Vector"
                  className="absolute top-1/3 left-0 md:left-[-20px] transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16"
                />
                <h2 className="text-2xl md:text-3xl font-bold text-black uppercase relative z-10">
                  Join the <span className="text-[#ef5da8]">Option</span>
                </h2>
                {/* <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#ef5da8]"></div> */}
              </div>
            </div>

            <div className="flex flex-wrap justify-start md:justify-center gap-4 md:gap-6 mx-auto">
              {[
                lifetimePrice && {
                  icon: theme?.lifeTimeImg || (
                    <Gift className="w-8 h-8 text-white" />
                  ),
                  title: "Lifetime Member",
                  price: `${lifetimePrice} ETH`,
                  type: "lifetime",
                },
                monthPrice && {
                  icon: theme?.monthImg || (
                    <Gift className="w-8 h-8 text-white" />
                  ),
                  title: "Monthly Membership",
                  price: `${monthPrice} ETH`,
                  type: "month",
                },
                quarterPrice && {
                  icon: theme?.quarterImg || (
                    <Gift className="w-8 h-8 text-white" />
                  ),
                  title: "Quarterly Membership",
                  price: `${quarterPrice} ETH`,
                  type: "quarter",
                },
                yearPrice && {
                  icon: theme?.yearImg || (
                    <Gift className="w-8 h-8 text-white" />
                  ),
                  title: "Yearly Membership",
                  price: `${yearPrice} ETH`,
                  type: "year",
                },
              ]
                .filter(Boolean)
                .map((option, index) => (
                  <div
                    key={index}
                    className={`w-[162px] md:w-auto group border-gray-200 bg-white rounded-2xl p-6 shadow-lg border-2 transition-all hover:shadow-xl hover:border-[#ef5da8] hover:bg-[#ef5da8] hover:text-white`}
                  >
                    <div className="text-center">
                      <div className="relative mb-4 flex justify-center">
                        {typeof option.icon === "string" ? (
                          <img
                            src={option.icon}
                            alt={option.title}
                            className="w-12 h-12"
                          />
                        ) : (
                          <div className="w-12 h-12 bg-[#ef5da8] rounded-lg flex items-center justify-center">
                            {option.icon}
                          </div>
                        )}
                      </div>
                      <h3
                        className={`font-bold text-lg mb-2 text-black group-hover:text-white`}
                      >
                        {option.title}
                      </h3>
                      <p
                        className={`text-2xl font-bold mb-6 text-[#ef5da8] group-hover:text-white`}
                      >
                        {option.price}
                      </p>
                      <button
                        onClick={() => handleJoin(option.type)}
                        className={`bg-[#ef5da8] text-white group-hover:bg-white group-hover:text-[#ef5da8] w-full py-3 px-0 md:px-6 rounded-full font-medium transition-colors `}
                      >
                        Join Now
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : null}

        {/* Position Verification Section */}
        {verifyData?.length ? (
          <div className="px-4 md:px-20 py-16">
            <div className="text-center mb-12">
              <div className="relative inline-block">
                <img
                  src={"/Vector.png"}
                  alt="Vector"
                  className="absolute top-1/4 right-[-40px] md:right-[-70px] transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16"
                />
                <h2 className="text-2xl md:text-3xl font-bold text-black uppercase relative z-10">
                  Position <span className="text-[#ef5da8]">Verification</span>
                </h2>
                {/* <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#ef5da8]"></div> */}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {verifyData?.map((chain, index) => (
                <div
                  key={index}
                  className="flex align-start justify-between bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:border-[#ef5da8] transition-all"
                >
                  <div className="flex flex-row md:flex-col justify-between">
                    <div className="mb-4">
                      <img
                        src={
                          theme?.verifyImgs?.[index] ||
                          theme?.verifyImgs?.[0] ||
                          "/aave.png"
                        }
                        alt={chain.name}
                        className="w-auto h-10"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-black mb-2">
                        {chain.chainName}
                      </h3>
                      <p className="text-gray-600 text-sm mb-6">
                        Hold {chain.tokenSymbol} ≥{" "}
                        {formatUnits(chain.threshold, chain.decimals)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleVerify(chain)}
                    className="h-[46px] bg-[#ef5da8] hover:bg-[#d64a94] text-white py-3 px-6 rounded-full font-medium transition-colors"
                  >
                    Verify
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Links & Apps Section */}
        <div className="px-4 md:px-20 py-16">
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <img
                src={"/Vector.png"}
                alt="Vector"
                className="absolute top-[20%] left-0 md:left-[-10px] transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16"
              />
              <h2 className="text-2xl md:text-3xl font-bold text-black uppercase relative z-10">
                Links <span className="text-[#ef5da8]">&</span> Apps
              </h2>
              {/* <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#ef5da8]"></div> */}
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {theme?.socials?.map((app, index) => (
              <div
                key={index}
                className="flex px-5 text-black group cursor-pointer py-[30px] flex-col justify-center items-center gap-2.5 flex-[1_0_0] rounded-[5rem] bg-[#FFF] shadow-[0_0.625rem_1.5rem_0_rgba(0,0,0,0.06)] hover:bg-[#EF5DA8] hover:shadow-[0_0.625rem_1.5rem_0_rgba(239,93,168,0.30)] hover:text-white"
              >
                <img
                  src={app.icon}
                  alt={app.name}
                  className="size-[64px] rounded-full"
                />
                <span className="text-sm font-medium text-center ">
                  {app.name}
                </span>
                <button
                  onClick={() => window.open(app.link, "_blank")}
                  className="text-[#FF6B6A] group-hover:text-white lining-nums tabular-nums font-[Inter] text-3.5 font-not-italic font-bold lh-normal"
                >
                  <span>{app.text}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Community News Section */}
        {theme?.news && theme.news.length > 0 && (
          <div className="px-4 md:px-20 py-16">
            <div className="text-center mb-12">
              <div className="relative inline-block">
                <img
                  src={"/Vector.png"}
                  alt="Vector"
                  className="absolute top-1/4 right-[-40px] md:right-[-70px] transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16"
                />
                <h2 className="text-2xl md:text-3xl font-bold text-black uppercase relative z-10">
                  Community <span className="text-[#ef5da8]">News</span>
                </h2>
                {/* <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#ef5da8]"></div> */}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto mb-8">
              {currentNewsData.map((news, index) => (
                <div
                  key={index}
                  onClick={() => window.open(news.link, "_blank")}
                  className="cursor-pointer bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg border border-gray-100 hover:border-[#ef5da8] transition-all duration-300"
                >
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-sm text-black mb-2 line-clamp-2 leading-tight">
                      {news.title}
                    </h3>
                    <p className="text-gray-500 text-xs">
                      Source: {news.source}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="w-full rounded-2xl py-4 px-6 mt-8">
                <div className="flex items-center justify-center gap-4">
                  {/* 左箭头按钮 */}
                  <button
                    onClick={() =>
                      currentPage > 1 && handlePageChange(currentPage - 1)
                    }
                    disabled={currentPage === 1}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                      currentPage === 1
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-600 hover:bg-gray-50 shadow-md hover:shadow-lg"
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 18L9 12L15 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* 圆点指示器 */}
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, index) => {
                      const pageNumber = index + 1;
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => handlePageChange(pageNumber)}
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            pageNumber === currentPage
                              ? "bg-[#ef5da8] scale-110"
                              : "bg-white hover:bg-gray-400"
                          }`}
                        />
                      );
                    })}
                  </div>

                  {/* 右箭头按钮 */}
                  <button
                    onClick={() =>
                      currentPage < totalPages &&
                      handlePageChange(currentPage + 1)
                    }
                    disabled={currentPage === totalPages}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                      currentPage === totalPages
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-600 hover:bg-gray-50 shadow-md hover:shadow-lg"
                    }`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
      </div>
      <div className="px-4 md:px-20 py-8 border-t border-gray-200 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/ecg_heart.png" className="w-6 h-6 text-[#ef5da8]" />
            <span className="text-black font-bold">{domainName}.web3.club</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Powered by</span>
            <span className="font-bold text-[#ef5da8]">Web3.Club</span>
            <span>and</span>
            <span className="font-bold text-[#ef5da8]">OrbitLink.Me</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template6;

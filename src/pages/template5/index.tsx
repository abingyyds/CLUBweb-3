import React from "react";
import { ConnectButton } from "./ConnectButton";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";
import Pagination from "../../components/Pagination";
import { ITheme } from "@/types";
import { MemberModal } from "./MemberModal";
import { usePagination } from "../../hooks/usePagination";
import { useClubData } from "../../hooks/useClubData";
import { useClubMembership } from "../../hooks/useClubMembership";
import { ArrowRight } from "lucide-react";
// Supports weights 400-700
import "@fontsource-variable/poltawski-nowy";
import newsImg from "/public/newsimg.png";

export const Template5: React.FC<{ theme?: ITheme; club: string }> = ({
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
    itemsPerPage: 6,
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
    <div className="tmeplate5 flex flex-col items-center bg-[#e1e1e1] w-full min-h-screen">
      {/* Member Modal */}
      <MemberModal
        open={modalOpen}
        setOpen={setModalOpen}
        data={memberData}
        onConfirm={handleConfirmJoin}
        isVerifyMode={isVerifyMode}
      />

      {/* Main Container */}
      <div className="flex flex-col items-center w-full max-w-[960px] px-5 md:px-10 py-5 gap-12 md:gap-[50px]">
        {/* Header Section */}
        <div className="flex flex-col items-center w-full gap-2.5 pt-5">
          <p className="text-black/80 text-base font-bold tracking-wider uppercase">
            {club}.WEB3.CLUB
          </p>
          <h1 className="text-black/80 text-3xl md:text-5xl font-bold text-center leading-tight tracking-wider uppercase">
            {theme?.heroTitle} {theme.heroGradientText}
          </h1>
        </div>

        {/* Hero Description Section */}
        <div className="flex flex-col items-start w-full gap-5 max-w-[650px]">
          <div className="flex items-start gap-0.5 w-full">
            <span className="text-black/80 text-2xl font-normal">
              {theme.clubIntroduction1.slice(0, 1)}
            </span>
            <p className="text-black/80 text-sm flex-1">
              {theme.clubIntroduction1.slice(1)}
            </p>
          </div>
        </div>

        {/* Hero Description Section */}
        <div className="flex flex-col items-start w-full gap-5 max-w-[650px]">
          <div className="flex items-start gap-0.5 w-full">
            <span className="text-black/80 text-2xl font-normal">
              {theme.clubIntroduction2.slice(0, 1)}
            </span>
            <p className="text-black/80 text-sm flex-1">
              {theme.clubIntroduction2.slice(1)}
            </p>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full max-w-[650px] h-[120px] bg-gray-300 rounded-lg overflow-hidden">
          <img
            src={newsImg}
            alt="Community Hero"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Connect Wallet Button */}
        <div className="flex justify-center lg:justify-start w-full max-w-[650px]">
          <ConnectButton />
        </div>

        {/* Join the Option Section */}
        {(lifetimePrice || monthPrice || yearPrice || quarterPrice) && (
          <div className="flex flex-col items-start w-full gap-5">
            <div className="w-full border-t-2 border-b border-black/80 py-2">
              <h2 className="text-black/80 text-xl md:text-2xl font-semibold uppercase tracking-wider">
                JOIN THE OPTION
              </h2>
            </div>

            <div className="flex flex-col md:flex-row items-start w-full gap-2.5">
              {[
                lifetimePrice && {
                  icon: theme?.lifeTimeImg,
                  title: "Lifetime Member",
                  price: `${lifetimePrice} ETH`,
                  type: "lifetime",
                },
                monthPrice && {
                  icon: theme?.monthImg,
                  title: "Monthly Membership",
                  price: `${monthPrice} ETH`,
                  type: "month",
                },
                quarterPrice && {
                  icon: theme?.quarterImg,
                  title: "Quarterly Membership",
                  price: `${quarterPrice} ETH`,
                  type: "quarter",
                },
                yearPrice && {
                  icon: theme?.yearImg,
                  title: "Yearly Membership",
                  price: `${yearPrice} ETH`,
                  type: "year",
                },
              ]
                .filter(Boolean)
                .map((option, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-center items-center lg:flex-col lg:items-start bg-transparent flex-1 gap-2.5"
                  >
                    <div className="w-[50px] h-[50px] overflow-hidden">
                      <img
                        src={option.icon}
                        alt={option.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <p className="text-black/80 text-base font-bold uppercase tracking-wider">
                        {option.title}
                      </p>
                      <p className="text-black/80 text-sm font-medium">
                        {option.price}
                      </p>
                    </div>
                    <button
                      onClick={() => handleJoin(option.type)}
                      className="bg-[#454545] text-white text-sm font-medium uppercase tracking-wider px-5 py-2 rounded-sm hover:bg-[#555] transition-colors flex-shrink-0"
                    >
                      Join Now
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Position Verification Section */}
        {verifyData?.length > 0 && (
          <div className="flex flex-col items-start w-full gap-5">
            <div className="w-full border-t border-b border-black/80 py-2">
              <h2 className="text-black/80 text-xl md:text-2xl font-semibold uppercase tracking-wider">
                POSITION VERIFICATION
              </h2>
            </div>

            <div className="flex flex-col md:flex-row items-start w-full gap-10">
              {verifyData.map((item, index) => (
                <div key={index} className="flex items-center gap-5 flex-1">
                  <div className="w-[70px] h-[70px] rounded-full overflow-hidden">
                    <img
                      src={theme?.verifyImgs?.[index] || theme?.verifyImgs?.[0] || "/aave.png"}
                      alt={`${item.chainName} Chain`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <p className="text-black/80 text-base font-bold">
                      {item.chainName} Chain
                    </p>
                    <p className="text-black/80 text-xs font-medium">
                      Hold {item.tokenSymbol} ≥{" "}
                      {formatUnits(item.threshold, item.decimals)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links & Apps Section */}
        <div className="flex flex-col items-start w-full gap-5">
          <div className="w-full border-t-2 border-black/80 pt-0.5 gap-1">
            <h2 className="text-black/80 text-xl md:text-2xl font-semibold uppercase tracking-wider">
              LINKS & APPS
            </h2>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 w-full">
            {theme?.socials?.map((social, index) => (
              <div
                key={index}
                className="bg-black/80 rounded p-4 w-16 h-16 flex items-center justify-center mx-auto"
              >
                <img
                  src={social.icon}
                  alt={social.name}
                  className="w-8 h-8 object-contain filter invert"
                />
              </div>
            )) ||
              // Default social icons if no theme socials
              Array.from({ length: 6 }, (_, index) => (
                <div
                  key={index}
                  className="bg-black/80 rounded p-4 w-16 h-16 flex items-center justify-center mx-auto"
                >
                  <div className="w-8 h-8 bg-white rounded"></div>
                </div>
              ))}
          </div>
        </div>

        {/* Community News Section */}
        <div className="flex flex-col items-center w-full gap-5">
          <div className="w-full border-t-2 border-black/80 pt-0.5 gap-1">
            <h2 className="text-black/80 text-xl md:text-2xl font-semibold uppercase tracking-wider">
              COMMUNITY NEWS
            </h2>
          </div>

          <div className="flex flex-col gap-5 w-full">
            {/* First row of news */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 w-full">
              {currentNewsData.map((news, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-white/40 flex-1 pb-5"
                >
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-[100px] md:h-[120px] object-cover"
                  />
                  <div className="flex flex-col gap-4 md:gap-7 p-2 md:p-2.5 pt-2 md:pt-2.5">
                    <p className="text-black/80 text-xs md:text-sm font-bold line-clamp-2">
                      {news.title ||
                        "WESTCLIFF SHOPPING CENTRE MADE MORL LHFICILNT"}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-black/80 text-xs font-medium flex-1">
                        Source: {news.source || "Twitter Alpha"}
                      </p>
                      <ArrowRight
                        className="w-6 h-6 text-black/80 cursor-pointer"
                        onClick={() => window.open(news.link, "_blank")}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {totalPages > 1 && (
              <div className="flex justify-center w-full">
                <button className="bg-[#454545] text-white text-sm font-medium uppercase tracking-wider px-5 py-2 rounded-sm hover:bg-[#555] transition-colors">
                  Load more
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col items-center w-full max-w-[960px] px-5 md:px-10 py-10 mt-5">
        <div className="w-full border-2 border-black p-0.5">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-2.5 border border-black/80 px-5 py-4 h-[130px] lg:h-[60px]">
            <div className="w-8 h-8 bg-black rounded overflow-hidden flex items-center justify-center">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_100_474"
                  style={{ maskType: "alpha" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                >
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_100_474)">
                  <path
                    d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM4 18H11V6H4V18ZM13 18H20V6H13V18ZM5 16H10V14H5V16ZM5 13H10V11H5V13ZM5 10H10V8H5V10ZM14 16H19V14H14V16ZM14 13H19V11H14V13ZM14 10H19V8H14V10Z"
                    fill="white"
                  />
                </g>
              </svg>
            </div>
            <p className="text-black/80 text-xs tracking-wide flex-1">
              {club.toUpperCase()}.WEB3.CLUB
            </p>
            <p className="text-black text-sm font-medium">
              <span className="text-black/80">Powered by </span>
              <span className="text-[#454545] underline">Web3.Club</span>
              <span className="text-black/80"> and </span>
              <span className="text-[#454545] underline">OrbitLink.Me</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

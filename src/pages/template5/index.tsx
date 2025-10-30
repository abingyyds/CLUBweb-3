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
import { ArrowRight } from "lucide-react";

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
    <div className="flex flex-col items-center bg-[#e1e1e1] w-full min-h-screen">
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
            {theme?.heroTitle || "Eternal Profit Community"}
          </h1>
        </div>

        {/* Hero Description Section */}
        <div className="flex flex-col items-start w-full gap-5 max-w-[650px]">
          <div className="flex items-start gap-0.5 w-full">
            <span className="text-black/80 text-2xl font-normal">W</span>
            <p className="text-black/80 text-sm flex-1">
              elcome to the Eternal Profit Community! We are a professional
              community focused on blockchain technology innovation and DeFi
              investment.
            </p>
          </div>
          <div className="flex items-start gap-0.5 w-full">
            <span className="text-black/80 text-2xl font-normal">H</span>
            <p className="text-black/80 text-sm flex-1">
              ere, you will gain access to the most cutting-edge Alpha
              information, professional investment advice, and a wealth of
              learning resources.
            </p>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full max-w-[650px] h-[120px] bg-gray-300 rounded-lg overflow-hidden">
          <img
            src={theme?.heroImg || "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=blockchain%20technology%20cryptocurrency%20trading%20charts%20professional%20community&image_size=landscape_16_9"}
            alt="Community Hero"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Connect Wallet Button */}
        <div className="flex justify-start w-full max-w-[650px]">
          <button className="bg-[#454545] text-white text-sm font-medium uppercase tracking-wider px-5 py-2.5 hover:bg-[#555] transition-colors">
            CONNECT WALLET
          </button>
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
                  price: `500 USDT`,
                  type: "month",
                },
                yearPrice && {
                  icon: theme?.yearImg,
                  title: "Yearly Membership",
                  price: `5000 USDT`,
                  type: "year",
                },
              ]
                .filter(Boolean)
                .map((option, index) => (
                  <div key={index} className="flex flex-col items-start bg-transparent flex-1 gap-2.5">
                    <div className="w-[50px] h-[50px] overflow-hidden">
                      <img
                        src={option.icon || "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=award%20cup%20trophy%20icon%20minimalist&image_size=square"}
                        alt={option.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-black/80 text-base font-bold uppercase tracking-wider">
                        {option.title}
                      </p>
                      <p className="text-black/80 text-sm font-medium">
                        {option.price}
                      </p>
                    </div>
                    <button
                      onClick={() => handleJoin(option.type)}
                      className="bg-[#454545] text-white text-sm font-medium uppercase tracking-wider px-5 py-2 rounded-sm hover:bg-[#555] transition-colors"
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
                      src={theme?.ethImg || "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=ethereum%20logo%20cryptocurrency%20icon&image_size=square"}
                      alt={`${item.chainName} Chain`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-1 flex-1">
                    <p className="text-black/80 text-base font-bold">
                      {item.chainName} Chain
                    </p>
                    <p className="text-black/80 text-xs font-medium">
                      Hold {item.tokenSymbol} ≥ {formatUnits(item.threshold, item.decimals)}
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
          
          <div className="flex flex-wrap items-start justify-between w-full gap-4">
            {theme?.socials?.map((social, index) => (
              <div key={index} className="bg-black/80 rounded p-4 w-16 h-16 flex items-center justify-center">
                <img
                  src={social.icon || "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=social%20media%20icon%20white%20minimalist&image_size=square"}
                  alt={social.name}
                  className="w-8 h-8 object-contain filter invert"
                />
              </div>
            )) || (
              // Default social icons if no theme socials
              Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="bg-black/80 rounded p-4 w-16 h-16 flex items-center justify-center">
                  <div className="w-8 h-8 bg-white rounded"></div>
                </div>
              ))
            )}
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
            <div className="flex flex-col md:flex-row gap-5 w-full">
              {currentNewsData.slice(0, 3).map((news, index) => (
                <div key={index} className="flex flex-col bg-white/40 flex-1 pb-5">
                  <img
                    src={news.image || "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=news%20article%20business%20technology&image_size=landscape_4_3"}
                    alt={news.title}
                    className="w-full h-[120px] object-cover"
                  />
                  <div className="flex flex-col gap-7 p-2.5 pt-2.5">
                    <p className="text-black/80 text-sm font-bold">
                      {news.title || "WESTCLIFF SHOPPING CENTRE MADE MORL LHFICILNT"}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-black/80 text-xs font-medium flex-1">
                        Source: {news.source || "Twitter Alpha"}
                      </p>
                      <ArrowRight className="w-6 h-6 text-black/80 cursor-pointer" onClick={() => window.open(news.link, "_blank")} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Second row of news */}
            {currentNewsData.length > 3 && (
              <div className="flex flex-col md:flex-row gap-5 w-full">
                {currentNewsData.slice(3, 6).map((news, index) => (
                  <div key={index + 3} className="flex flex-col bg-white/40 flex-1 pb-5">
                    <img
                      src={news.image || "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=news%20article%20business%20technology&image_size=landscape_4_3"}
                      alt={news.title}
                      className="w-full h-[120px] object-cover"
                    />
                    <div className="flex flex-col gap-7 p-2.5 pt-2.5">
                      <p className="text-black/80 text-sm font-bold">
                        {news.title || "WESTCLIFF SHOPPING CENTRE MADE MORL LHFICILNT"}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-black/80 text-xs font-medium flex-1">
                          Source: {news.source || "Twitter Alpha"}
                        </p>
                        <ArrowRight className="w-6 h-6 text-black/80 cursor-pointer" onClick={() => window.open(news.link, "_blank")} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
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
          <div className="flex items-center justify-center gap-2.5 border border-black/80 px-5 py-4 h-[58px]">
            <div className="w-8 h-8 bg-black rounded overflow-hidden">
              <div className="w-full h-full bg-white/20"></div>
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
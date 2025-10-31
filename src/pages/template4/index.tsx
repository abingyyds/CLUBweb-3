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
import iconImg from "@/assets/images/Group 6.png";
import bgImg_1 from "@/assets/images/Group 1.png";
import bgImg_2 from "@/assets/images/Group 2.png";
import bgImg_3 from "@/assets/images/Group 3.png";
import bgImg_4 from "@/assets/images/Group 4.png";

export const Template4 = ({ club, theme }: { club: string; theme: ITheme }) => {
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
    <div className="flex flex-col items-center bg-[#f7f3e7] w-full min-h-screen overflow-hidden">
      {/* Member Modal */}
      <MemberModal
        open={modalOpen}
        setOpen={setModalOpen}
        data={memberData}
        onConfirm={handleConfirmJoin}
        isVerifyMode={isVerifyMode}
      />

      {/* Header */}
      <div className="w-full max-w-[1280px] bg-[#9fb471] px-5 py-7 flex justify-center">
        <p className="text-white text-base font-bold uppercase tracking-wider">
          {club}.web3.club
        </p>
      </div>

      {/* Hero Section */}
      <div className="relative w-full max-w-[1280px] px-5 lg:px-20 py-16 lg:py-20">
        {/* Floating Icon */}
              <div className="absolute top-[16%] left-[10%] w-[20vw] h-[20vw] lg:top-[-50px] lg:left-[60px] lg:w-36 lg:h-35 lg:h-35 z-0">
                <img
                  src={iconImg}
                  alt="Hero Icon"
                  className="w-full h-full object-contain"
                />
              </div>
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10">
          {/* Left Content */}
          <div className="relative flex-2 w-full lg:max-w-[654px] relative z-10">
              <div className="lg:pl-28 text-center">
                <h1 className="w-full text-[40px] lg:text-[80px] font-bold text-black leading-tight mb-10">
                  Eternal Profit<br />
                  Community
                </h1>
              </div>

              {/* Right Floating Elements - Mobile Version */}
              <div className="relative w-full h-[400px] mb-10 lg:hidden">
                {/* Festival Card */}
                <div 
                  className="absolute top-[-20px] right-[8%] w-[54vw] h-[54vw] lg:top-2 lg:right-2 lg:w-[120px] lg:h-[120px] rounded-[10px] rotate-[-5deg] flex flex-col items-center justify-center gap-1"
                  style={{
                    backgroundImage: `url(${bgImg_1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <p className="text-xs font-semibold text-black text-center">Festival</p>
                  <p className="text-[10px] text-black text-center">23/04/24</p>
                </div>

                {/* Charity Event Circle */}
                <div 
                  className="absolute top-[160px] right-[30%] w-[64vw] h-[64vw] lg:top-2 lg:right-2 lg:w-[120px] lg:h-[120px] rounded-full rotate-[30deg] flex flex-col items-center justify-center gap-1"
                  style={{
                    backgroundImage: `url(${bgImg_4})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                >
                  <p className="text-xs font-semibold text-black text-center">Charity event</p>
                  <p className="text-[10px] text-black text-center">23/04/24</p>
                </div>

                {/* Opera Star 1 */}
                <div className="absolute top-[36px] right-[50%] w-[50vw] h-[50vw] lg:top-2 lg:right-2 lg:w-[120px] lg:h-[120px] rotate-[-30deg]">
                  <div className="relative w-full h-full">
                    <div 
                      className="absolute inset-0 rounded-full"
                      style={{
                        backgroundImage: `url(${bgImg_2})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    ></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <p className="text-xs font-semibold text-black">Opera</p>
                      <p className="text-[10px] text-black">23/04/24</p>
                    </div>
                  </div>
                </div>

                {/* Opera Star 2 */}
                <div className="absolute top-[124px] right-0 w-[50vw] h-[50vw] lg:top-2 lg:right-2 lg:w-[120px] lg:h-[120px] rotate-[45deg]">
                  <div className="relative w-full h-full">
                    <div 
                      className="absolute inset-0 rounded-full"
                      style={{
                        backgroundImage: `url(${bgImg_3})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                      }}
                    ></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <p className="text-xs font-semibold text-black">Opera</p>
                      <p className="text-[10px] text-black">23/04/24</p>
                    </div>
                  </div>
                </div>
              </div>

            <div className="space-y-7 mb-10">
              <p className="text-xl text-black text-center lg:text-left leading-7">
                Welcome to the Eternal Profit Community! We are a professional
                community focused on blockchain technology innovation and DeFi
                investment.
              </p>
              <p className="text-xl text-black text-center lg:text-left leading-7">
                Here, you will gain access to the most cutting-edge Alpha
                information, professional investment advice, and a wealth of
                learning resources.
              </p>
            </div>

            <button className="inline-flex items-center gap-2.5 bg-[#f2b1dc] text-black text-2xl font-bold uppercase px-11 py-8 rounded-[40px] hover:opacity-90 transition-opacity">
              Connect Wallet
              <ArrowRight className="w-8 h-8" />
            </button>
          </div>

          {/* Right Floating Elements */}
          <div className="relative flex-1 lg:max-w-[583px] h-[658px] hidden lg:block">
            {/* Festival Card */}
            <div 
              className="absolute top-7 right-0 w-[30vw] h-[30vw] lg:w-[300px] lg:h-[300px] rounded-[10px] rotate-[-10deg] flex flex-col items-center justify-center gap-1"
              style={{
                backgroundImage: `url(${bgImg_1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <p className="text-base font-semibold text-black text-center">Festival</p>
              <p className="text-xs text-black text-center">23/04/24</p>
            </div>

            {/* Charity Event Circle */}
            <div 
              className="absolute top-[43%] right-[29%] w-[30vw] h-[30vw] lg:w-[320px] lg:h-[320px] rounded-full rotate-[30deg] flex flex-col items-center justify-center gap-1"
              style={{
                backgroundImage: `url(${bgImg_4})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              <p className="text-base font-semibold text-black text-center">Charity event</p>
              <p className="text-xs text-black text-center">23/04/24</p>
            </div>

            {/* Opera Star 1 */}
            <div className="absolute top-[16%] right-[50%] w-[30vw] h-[30vw] lg:w-[280px] lg:h-[280px] rotate-[-30deg]">
              <div className="relative w-full h-full">
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundImage: `url(${bgImg_2})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                ></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <p className="text-base font-semibold text-black">Opera</p>
                  <p className="text-xs text-black">23/04/24</p>
                </div>
              </div>
            </div>

            {/* Opera Star 2 */}
            <div className="absolute top-[36%] right-[-10%] w-[30vw] h-[30vw] lg:w-[280px] lg:h-[280px] rotate-[45deg]">
              <div className="relative w-full h-full">
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundImage: `url(${bgImg_3})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                ></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <p className="text-base font-semibold text-black">Opera</p>
                  <p className="text-xs text-black">23/04/24</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Join the Option Section */}
      {(lifetimePrice || monthPrice || yearPrice || quarterPrice) && (
        <div className="w-full max-w-[1280px] px-5 lg:px-20 mb-16">
          <div className="bg-[#9fb471] rounded-[40px] p-12 lg:p-16">
            <h2 className="text-3xl lg:text-4xl font-semibold text-black text-center uppercase mb-5">
              Join the Option
            </h2>
            
            <div className="space-y-0.5">
              {[
                lifetimePrice && {
                  icon: theme?.lifeTimeImg,
                  title: "Lifetime Member",
                  price: `${lifetimePrice} ETH`,
                  type: "lifetime",
                  selected: true,
                },
                monthPrice && {
                  icon: theme?.monthImg,
                  title: "Monthly member",
                  price: `${monthPrice} ETH`,
                  type: "month",
                  selected: false,
                },
                yearPrice && {
                  icon: theme?.yearImg,
                  title: "Yearly member",
                  price: `${yearPrice} ETH`,
                  type: "year",
                  selected: false,
                },
              ]
                .filter(Boolean)
                .map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-5 px-2.5 py-2.5 rounded-[50px] ${
                      option.selected ? "bg-white" : "bg-white/40"
                    }`}
                  >
                    <div className="w-8.5 h-8.5 rounded-full bg-gray-200 flex-shrink-0">
                      {option.icon && (
                        <img
                          src={option.icon}
                          alt={option.title}
                          className="w-full h-full rounded-full object-cover"
                        />
                      )}
                    </div>
                    <p className="flex-1 text-base font-medium text-black">
                      {option.title}
                    </p>
                    <p className="text-base font-semibold text-black mr-4">
                      {option.price}
                    </p>
                    <button
                      onClick={() => handleJoin(option.type)}
                      className="w-5 h-5 flex-shrink-0"
                    >
                      <ArrowRight className="w-full h-full text-black" />
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Position Verification Section */}
      {verifyData?.length ? (
        <div className="w-full max-w-[1280px] px-5 lg:px-20 mb-16">
          <h2 className="text-3xl lg:text-4xl font-semibold text-black uppercase mb-5">
            Position Verification
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {verifyData.slice(0, 3).map((item, index) => {
              const cardColors = ["bg-[#f4b0df]", "bg-[#bacaeb]", "bg-[#f7dc75]"];
              const buttonColors = ["bg-[#aa2f80]", "bg-[#4a6af3]", "bg-[#d97f02]"];
              
              return (
                <div
                  key={index}
                  className={`${cardColors[index]} rounded-[40px] p-12 flex flex-col items-center gap-5`}
                >
                  <div className="flex items-center gap-5 w-full">
                    <div className="w-15 h-15 bg-white rounded-[40px] flex items-center justify-center flex-shrink-0">
                      <img
                        src={theme?.ethImg || "/eth.png"}
                        alt={`${item.chainName} Chain`}
                        className="w-10 h-10"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-bold text-black">
                        {item.chainName} Chain
                      </p>
                      <p className="text-xs font-medium text-black/80">
                        Hold {item.tokenSymbol} ≥ {formatUnits(item.threshold, item.decimals)}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleVerify(item)}
                    className={`${buttonColors[index]} text-white text-base font-medium rounded-[50px] px-12 py-2.5 w-full flex items-center justify-between hover:opacity-90 transition-opacity`}
                  >
                    <span className="flex-1 text-center">Verify</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {/* Links & Apps Section */}
      <div className="w-full max-w-[1280px] px-5 lg:px-20 mb-16">
        <h2 className="text-3xl lg:text-4xl font-semibold text-black uppercase mb-5">
          Links & Apps
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          {theme?.socials?.slice(0, 6).map((app, index) => (
            <div
              key={index}
              className="bg-[#f7dc75] rounded-[20px] p-7 flex flex-col items-center justify-center gap-5"
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden">
                <img
                  src={app.icon}
                  alt={app.name}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community News Section */}
      <div className="w-full max-w-[1280px] px-5 lg:px-20 mb-20">
        <h2 className="text-3xl lg:text-4xl font-semibold text-black uppercase mb-5">
          Community News
        </h2>
        
        <div className="bg-[#f4de7b] rounded-[40px]" style={{ padding: '50px' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-10">
            {currentNewsData.map((news, index) => (
              <div key={index} className="flex flex-col gap-7">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-base font-bold text-black">
                    {news.title}
                  </p>
                  <p className="text-xs font-medium text-black/80">
                    Source: {news.source || "Twitter Alpha"}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="w-full bg-[#9fb471] px-5 lg:px-20 py-10">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6">
              <img
                src="/award-star.svg"
                alt="Award"
                className="w-full h-full"
              />
            </div>
            <p className="text-white text-base font-bold uppercase">
              {club}.web3.club
            </p>
          </div>
          <p className="text-white text-sm">
            <span>Powered by </span>
            <span className="font-bold">Web3.Club</span>
            <span> and </span>
            <span className="font-bold">OrbitLink.Me</span>
          </p>
        </div>
      </div>
    </div>
  );
};

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

export const Template10: React.FC<{ theme?: ITheme; club: string }> = ({
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
  const { lifetimePrice, yearPrice, monthPrice, quarterPrice, verifyData, memberData } =
    useClubData({
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
      className="min-h-screen w-full bg-white font-['Manrope'] overflow-x-hidden"
      style={{ 
        fontFamily: 'Manrope, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif'
      }}
    >
      {/* Member Modal */}
      <MemberModal
        open={modalOpen}
        setOpen={setModalOpen}
        data={memberData}
        onConfirm={handleConfirmJoin}
        isVerifyMode={isVerifyMode}
      />

      {/* Main Container - Fixed 1280px width */}
      <div className="w-[1280px] mx-auto bg-white">
        
        {/* Header Section with Purple Gradient Background */}
        <div 
          className="px-[100px] pt-5 pb-[60px]"
          style={{
            background: 'linear-gradient(0deg, rgba(242, 234, 255, 0) 0%, #e3b9f9 100%)',
            backgroundColor: '#f6f5fd'
          }}
        >
          {/* Header Navigation */}
          <div className="flex justify-between items-center py-5">
            <h1 className="text-black text-base font-bold uppercase tracking-[-0.16px] leading-[19px]">
              ABC.WEB3.CLUB
            </h1>
            <div 
              className="inline-flex items-center gap-[5px] px-5 py-[10px] rounded-[30px] text-white text-sm font-bold leading-[17px] tracking-[-0.14px]"
              style={{
                background: 'linear-gradient(90deg, #8384f0 0%, #7135ff 100%)'
              }}
            >
              Connect Wallet
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {/* Hero Section */}
          <div className="flex items-center justify-between relative mt-5">
            {/* Left Content */}
            <div className="flex flex-col items-start gap-[30px] z-10">
              <div className="flex flex-col gap-5">
                <h2 className="text-black text-[40px] font-bold leading-[48px] tracking-[-0.4px] w-[312px]">
                  ETERNAL PROFIT COMMUNITY
                </h2>
              </div>
              
              <img 
                src={theme?.heroImg || "/hero-image.png"} 
                alt="Hero" 
                className="w-[150px] h-[210px] object-cover"
              />
              
              <div className="flex flex-col gap-[10px] pr-[70px]">
                <h3 className="text-black text-2xl font-bold leading-[29px] tracking-[-0.24px]">
                  Summer
                </h3>
                <p className="text-black/60 text-sm font-medium leading-[17px] tracking-[-0.14px] w-[302px]">
                  Welcome to the Eternal Profit Community!We are a professional community focused on blockchain technology innovation and DeFi investment.
                </p>
                <div className="inline-flex items-center gap-1 cursor-pointer">
                  <span className="text-black text-sm font-medium leading-[17px] tracking-[-0.14px]">
                    Read more
                  </span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="inline-flex flex-col items-start gap-[50px]">
              <div className="flex flex-col gap-[10px] pr-[70px]">
                <h3 className="text-black text-2xl font-bold leading-[29px] tracking-[-0.24px]">
                  Fresh
                </h3>
                <p className="text-black/60 text-sm font-medium leading-[17px] tracking-[-0.14px] w-[222px]">
                  Here,you will gain access to the most cutting-edge Alpha information,professional investment advice,and a wealth of learning resources.
                </p>
                <div className="inline-flex items-center gap-1 cursor-pointer">
                  <span className="text-black text-sm font-medium leading-[17px] tracking-[-0.14px]">
                    Read more
                  </span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* Decorative Image Section */}
              <div 
                className="flex items-center gap-[10px] rounded-[50px] px-[5px] py-[5px] pr-[155px]"
                style={{
                  backgroundColor: '#927361',
                  backgroundImage: 'url(/hero-bg.png)',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="inline-flex items-center justify-center gap-[10px] rounded-[50px] bg-black/10 p-[10px]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="inline-flex items-start gap-[5px]">
                <div className="inline-flex flex-col items-center justify-center gap-1 rounded-[5px] bg-[#ffe7e2] px-5 py-[10px]">
                  <span className="text-black text-xl font-bold leading-6 tracking-[-0.2px] text-center">
                    Free
                  </span>
                  <span className="text-black text-sm leading-[17px] tracking-[-0.14px] text-center">
                    with summer
                  </span>
                </div>
                
                <div className="flex flex-col gap-[5px]">
                  <div className="flex items-center gap-[10px] rounded-[5px] bg-[#f9e1f1] px-5 py-[10px]">
                    <span className="text-black text-lg font-bold leading-6 tracking-[-0.2px]">42+</span>
                    <span className="text-black text-sm leading-[17px] tracking-[-0.14px]">Join us</span>
                  </div>
                  <div className="flex items-center gap-[10px] rounded-[5px] bg-[#ede5fd] px-5 py-[10px]">
                    <span className="text-black text-lg font-bold leading-6 tracking-[-0.2px]">300+</span>
                    <span className="text-black text-sm leading-[17px] tracking-[-0.14px]">wealth</span>
                  </div>
                </div>
              </div>

              {/* Connect Wallet Button */}
              <div 
                className="inline-flex items-center gap-[5px] px-5 py-[10px] rounded-[30px] text-white text-sm font-bold leading-[17px] tracking-[-0.14px] cursor-pointer"
                style={{
                  background: 'linear-gradient(90deg, #8384f0 0%, #7135ff 100%)'
                }}
              >
                Connect Wallet
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Background Hero Image */}
            <div className="absolute top-[-18px] left-[328px] w-[437px] h-[605px]">
              <div 
                className="absolute top-[42px] left-[42px] w-[352px] h-[519px] bg-[#d9d9d9]"
                style={{
                  backgroundImage: 'url(/hero-main.png)',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}
              />
              <div className="absolute top-[100px] left-[342px] inline-flex items-center justify-center gap-[10px] rounded-[50px] bg-[#e5e0fe] p-[15px] w-[62px] h-[62px]">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M9.33334 22.6667L22.6667 9.33337M22.6667 9.33337H9.33334M22.6667 9.33337V22.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Join The Option Section */}
        <div className="flex flex-col items-center justify-center px-[100px] py-[60px] gap-5">
          <h2 className="text-black text-[32px] font-bold leading-[38px] tracking-[-0.32px] text-center w-[381px]">
            Join The Option
          </h2>
          
          <div 
            className="inline-flex items-start justify-center gap-5 rounded-[40px] px-[60px] py-[40px]"
            style={{ background: '#e4bafa' }}
          >
            {/* Lifetime Member Card */}
            <div className="relative w-[302px] h-[260px]">
              <div 
                className="absolute top-[22px] left-[17px] flex flex-col items-start gap-4 rounded-[50px] bg-white p-[30px] w-[268px] h-[217px] shadow-[10px_10px_0px_0px_rgba(0,0,0,0.25)]"
                style={{ transform: 'rotate(-10deg)' }}
              >
                <div className="inline-flex items-center gap-[10px]">
                  <img 
                    src={theme?.lifeTimeImg || "/lifetime-icon.png"} 
                    alt="Lifetime" 
                    className="w-12 h-12 rounded-[20px]"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-black text-sm font-bold leading-[17px] tracking-[-0.14px]">
                      Lifetime Member
                    </p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 1L10.09 5.26L15 6L11 9.74L11.91 14.5L8 12.27L4.09 14.5L5 9.74L1 6L5.91 5.26L8 1Z" fill="#FFD700"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-black text-sm leading-[17px] tracking-[-0.14px] w-[208px]">
                  For organizing every corner of your work life.
                </p>
                <div className="flex items-center justify-between w-full">
                  <div className="inline-flex items-center gap-[5px] rounded-[30px] bg-[#ffedf9] px-5 py-[10px]">
                    <span className="text-black text-sm font-bold leading-[17px] tracking-[-0.14px]">
                      ${lifetimePrice || '500'}
                    </span>
                  </div>
                  <img src="/card-decoration.png" alt="" className="w-[35px] h-[31px]" />
                </div>
              </div>
            </div>

            {/* Monthly Member Card */}
            <div 
              className="flex flex-col items-start gap-4 rounded-[50px] bg-white p-[30px] shadow-[10px_10px_0px_0px_rgba(0,0,0,0.25)]"
            >
              <div className="inline-flex items-center gap-[10px]">
                <img 
                  src={theme?.monthImg || "/monthly-icon.png"} 
                  alt="Monthly" 
                  className="w-11 h-11 rounded-[20px]"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-black text-sm font-bold leading-[17px] tracking-[-0.14px]">
                    Monthly Membership
                  </p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M8 1L10.09 5.26L15 6L11 9.74L11.91 14.5L8 12.27L4.09 14.5L5 9.74L1 6L5.91 5.26L8 1Z" fill="#FFD700"/>
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-black text-sm leading-[17px] tracking-[-0.14px] w-[208px]">
                A place for small groups to plan get organized.
              </p>
              <div className="flex items-center justify-between w-full">
                <div className="inline-flex items-center gap-[5px] rounded-[30px] bg-[#dde3e1] px-5 py-[10px]">
                  <span className="text-black text-sm font-bold leading-[17px] tracking-[-0.14px]">
                    ${monthPrice || '50'}
                  </span>
                </div>
                <img src="/card-decoration.png" alt="" className="w-[35px] h-[31px]" />
              </div>
            </div>

            {/* Yearly Member Card */}
            <div className="relative w-[305px] h-[277px]">
              <div 
                className="absolute top-[21px] left-[18px] flex flex-col items-start gap-4 rounded-[50px] bg-white p-[30px] w-[268px] h-[234px] shadow-[10px_10px_0px_0px_rgba(0,0,0,0.25)]"
                style={{ transform: 'rotate(10deg)' }}
              >
                <div className="inline-flex items-center gap-[10px]">
                  <img 
                    src={theme?.yearImg || "/yearly-icon.png"} 
                    alt="Yearly" 
                    className="w-11 h-11 rounded-[20px]"
                  />
                  <div className="flex flex-col gap-1">
                    <p className="text-black text-sm font-bold leading-[17px] tracking-[-0.14px]">
                      Yearly Membership
                    </p>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 1L10.09 5.26L15 6L11 9.74L11.91 14.5L8 12.27L4.09 14.5L5 9.74L1 6L5.91 5.26L8 1Z" fill="#FFD700"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-black text-sm leading-[17px] tracking-[-0.14px] w-[208px]">
                  For companies using PRODUCT NAME to connect several teams tools.
                </p>
                <div className="flex items-center justify-between w-full">
                  <div className="inline-flex items-center gap-[5px] rounded-[30px] bg-[#fee6e6] px-5 py-[10px]">
                    <span className="text-black text-sm font-bold leading-[17px] tracking-[-0.14px]">
                      ${yearPrice || '1000'}
                    </span>
                  </div>
                  <img src="/card-decoration.png" alt="" className="w-[35px] h-[31px]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Position Verification Section */}
        {verifyData?.length ? (
          <div className="px-[60px]">
            <div 
              className="flex items-center gap-[40px] rounded-[40px] px-[60px] py-[40px]"
              style={{ background: '#f2eaff' }}
            >
              <h2 className="text-black text-[40px] font-bold leading-[48px] tracking-[-0.4px] w-[250px]">
                Position Verification
              </h2>
              
              <div className="flex flex-grow items-start gap-[30px]">
                {verifyData.map((item, index) => (
                  <div 
                    key={index}
                    className="flex flex-col flex-grow items-start justify-center gap-[5px] rounded-[30px] px-5 py-[10px]"
                    style={{ 
                      background: '#cecffd',
                      outline: '10px solid rgba(206, 207, 253, 0.6)'
                    }}
                  >
                    <div className="inline-flex flex-col items-start justify-center h-[40px] gap-[10px]">
                      <img 
                        src={item.chainName === 'ETH' ? '/eth.png' : item.chainName === 'BNB' ? '/bnb.png' : '/polygon.png'} 
                        alt={item.chainName} 
                        className="w-[97px] h-4 object-contain"
                      />
                    </div>
                    <h3 className="text-[#050505] text-lg font-bold leading-6 tracking-[-0.13px] w-[190px] h-6">
                      {item.chainName} Chain
                    </h3>
                    <p className="text-[#121212] text-base leading-[23px] tracking-[0.01px]">
                      Hold {item.tokenSymbol}≥{formatUnits(item.threshold, item.decimals)}
                    </p>
                    <div 
                      className="inline-flex items-center gap-[5px] rounded-[30px] bg-white px-5 py-[10px] cursor-pointer"
                      onClick={() => handleVerify(item)}
                    >
                      <span className="text-black text-sm font-bold leading-[17px] tracking-[-0.14px]">
                        Verify
                      </span>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M5 12h14m-7-7l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* Links & Apps Section */}
        <div className="flex flex-col items-center justify-center px-[100px] py-[60px] gap-[30px]">
          <h2 className="text-black text-[32px] font-bold leading-[38px] tracking-[-0.32px] text-center w-[381px]">
            Links & Apps
          </h2>
          
          <div className="flex items-start justify-center gap-[30px]">
            {theme?.socials?.slice(0, 6).map((app, index) => (
              <div 
                key={index}
                className="inline-flex items-center gap-[5px] px-5 py-[10px] cursor-pointer"
                onClick={() => window.open(app.link, '_blank')}
                style={{
                  background: index % 3 === 0 ? '#ffc1cc' : index % 3 === 1 ? '#ffeb9c' : '#e1c4fd'
                }}
              >
                <span className="text-black text-lg font-bold leading-[22px] tracking-[-0.18px]">
                  {app.name}
                </span>
              </div>
            )) || (
              <>
                <div className="inline-flex items-center gap-[5px] px-5 py-[10px] bg-[#ffc1cc]">
                  <span className="text-black text-lg font-bold leading-[22px] tracking-[-0.18px]">Telegram</span>
                </div>
                <div className="inline-flex items-center gap-[5px] px-5 py-[10px] bg-[#ffeb9c]">
                  <span className="text-black text-lg font-bold leading-[22px] tracking-[-0.18px]">Twitter/X</span>
                </div>
                <div className="inline-flex items-center gap-[5px] px-5 py-[10px] bg-[#e1c4fd]">
                  <span className="text-black text-lg font-bold leading-[22px] tracking-[-0.18px]">Discord</span>
                </div>
                <div className="inline-flex items-center gap-[5px] px-5 py-[10px] bg-[#ffc1cc]">
                  <span className="text-black text-lg font-bold leading-[22px] tracking-[-0.18px]">YouTube</span>
                </div>
                <div className="inline-flex items-center gap-[5px] px-5 py-[10px] bg-[#e1c4fd]">
                  <span className="text-black text-lg font-bold leading-[22px] tracking-[-0.18px]">OnlyCluber</span>
                </div>
                <div className="inline-flex items-center gap-[5px] px-5 py-[10px] bg-[#ffeb9c]">
                  <span className="text-black text-lg font-bold leading-[22px] tracking-[-0.18px]">ClubBot</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Community News Section */}
        <div className="px-[100px] pb-[60px]">
          <h2 className="text-black text-[32px] font-bold leading-[38px] tracking-[-0.32px] text-center mb-[40px]">
            Community News
          </h2>
          
          <div className="flex gap-5 mb-[40px]">
            {currentNewsData.map((news, index) => (
              <div 
                key={index}
                className="flex-1 cursor-pointer"
                onClick={() => window.open(news.link, '_blank')}
              >
                <div 
                  className="w-full h-[200px] rounded-lg mb-4 bg-cover bg-center relative"
                  style={{ backgroundImage: `url(${news.image})` }}
                >
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-lg font-bold mb-2">
                      {news.title}
                    </h3>
                    <p className="text-white text-sm leading-[17px] tracking-[-0.14px]">
                       {news.category}
                     </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4">
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => handlePageChange(i + 1)}
                  className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium ${
                    currentPage === i + 1
                      ? 'bg-black text-white'
                      : 'bg-gray-200 text-black hover:bg-gray-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded hover:bg-gray-300"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center gap-4 px-[100px] py-[40px]">
          <img src="/logo.png" alt="Logo" className="w-[60px] h-[60px]" />
          <p className="text-black text-base font-bold leading-[19px] tracking-[-0.16px] uppercase">
            abc.web3.club
          </p>
          <div className="text-center">
            <span className="text-black text-sm">Powered by </span>
            <span className="text-[#7135ff] text-sm font-medium">Web3.Club</span>
            <span className="text-black text-sm"> and </span>
            <span className="text-[#7135ff] text-sm font-medium">OrbitLink.Me</span>
          </div>
        </div>
      </div>
    </div>
  );
};
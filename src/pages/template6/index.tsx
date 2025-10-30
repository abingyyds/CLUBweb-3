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
    <div className="flex flex-col items-center min-h-screen w-full" style={{ background: '#fefafe' }}>
      {/* Member Modal */}
      <MemberModal
        open={modalOpen}
        setOpen={setModalOpen}
        data={memberData}
        onConfirm={handleConfirmJoin}
        isVerifyMode={isVerifyMode}
      />

      {/* Main Container */}
      <div className="w-full max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-20 py-4 md:py-6">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-[#ef5da8]" />
            <span className="text-black font-bold text-base md:text-lg">abc.web3.club</span>
          </div>
          <ConnectButton className="bg-[#ef5da8] hover:bg-[#d64a94] text-white px-5 py-2 rounded-full text-sm font-medium" />
        </div>

        {/* Hero Section */}
        <div 
          className="relative px-4 md:px-52 py-10 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16"
          style={{ background: 'linear-gradient(180deg, rgba(252, 239, 253, 0) 81.35%, #ffe0e8 100%)' }}
        >
          {/* Hero Content */}
          <div className="flex-1 max-w-md">
            <div className="relative mb-10">
              <h1 className="text-3xl md:text-5xl font-bold text-black uppercase leading-tight">
                ETERNAL PROFIT{" "}
                <span className="text-[#ef5da8]">COMMUNITY</span>
              </h1>
              {/* Decorative underline */}
              <div className="absolute top-8 md:top-12 left-64 w-32 h-3 bg-[#ef5da8] opacity-30 transform rotate-1"></div>
            </div>
            
            <p className="text-black/80 text-sm md:text-base leading-relaxed mb-8">
              Welcome to the Eternal Profit Community! We are a professional
              community focused on blockchain technology innovation and DeFi
              investment.
              <br /><br />
              Here, you will gain access to the most cutting-edge Alpha
              information, professional investment advice, and a wealth of
              learning resources.
            </p>

            <button 
              className="flex items-center gap-6 bg-[#ef5da8] hover:bg-[#d64a94] text-white px-8 py-3 rounded-full font-medium shadow-lg transition-colors"
              onClick={() => {/* Connect wallet logic */}}
            >
              Connect Wallet
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <ExternalLink className="w-4 h-4" />
              </div>
            </button>
          </div>

          {/* Hero Image */}
          <div className="flex-shrink-0">
            <img 
              src={theme?.heroImg || "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=cute%20couple%20sitting%20at%20cafe%20table%20with%20hearts%20floating%20around%20them%20in%20pink%20theme%20illustration%20style&image_size=square"}
              alt="Hero Illustration"
              className="w-64 md:w-80 h-auto"
            />
          </div>
        </div>

        {/* Join the Option Section */}
        <div className="px-4 md:px-20 py-16">
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <h2 className="text-2xl md:text-3xl font-bold text-black uppercase">
                Join the <span className="text-[#ef5da8]">Option</span>
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#ef5da8]"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              {
                icon: theme?.lifeTimeImg || <Gift className="w-8 h-8 text-white" />,
                title: "Lifetime Member",
                price: `${lifetimePrice || "5.0"} ETH`,
                type: "lifetime",
                featured: true,
              },
              {
                icon: theme?.monthImg || <Gift className="w-8 h-8 text-white" />,
                title: "Monthly Membership",
                price: `${monthPrice || "500"} USDT`,
                type: "month",
              },
              {
                icon: theme?.quarterImg || <Gift className="w-8 h-8 text-white" />,
                title: "Yearly Membership",
                price: `${yearPrice || "5000"} USDT`,
                type: "year",
              },
            ].map((option, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all hover:shadow-xl ${
                  option.featured ? 'border-[#ef5da8] bg-[#ef5da8] text-white' : 'border-gray-200 hover:border-[#ef5da8]'
                }`}
              >
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    {typeof option.icon === 'string' ? (
                      <img src={option.icon} alt={option.title} className="w-12 h-12" />
                    ) : (
                      <div className="w-12 h-12 bg-[#ef5da8] rounded-lg flex items-center justify-center">
                        {option.icon}
                      </div>
                    )}
                  </div>
                  <h3 className={`font-bold text-lg mb-2 ${option.featured ? 'text-white' : 'text-black'}`}>
                    {option.title}
                  </h3>
                  <p className={`text-2xl font-bold mb-6 ${option.featured ? 'text-white' : 'text-[#ef5da8]'}`}>
                    {option.price}
                  </p>
                  <button
                    onClick={() => handleJoin(option.type)}
                    className={`w-full py-3 px-6 rounded-full font-medium transition-colors ${
                      option.featured 
                        ? 'bg-white text-[#ef5da8] hover:bg-gray-100' 
                        : 'bg-[#ef5da8] text-white hover:bg-[#d64a94]'
                    }`}
                  >
                    Join Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Position Verification Section */}
        <div className="px-4 md:px-20 py-16">
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <h2 className="text-2xl md:text-3xl font-bold text-black uppercase">
                Position <span className="text-[#ef5da8]">Verification</span>
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#ef5da8]"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {verifyData?.map((chain, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:border-[#ef5da8] transition-all">
                <div className="text-center">
                  <div className="mb-4 flex justify-center">
                    <img src={chain.icon} alt={chain.name} className="w-12 h-12" />
                  </div>
                  <h3 className="font-bold text-lg text-black mb-2">{chain.name}</h3>
                  <p className="text-gray-600 text-sm mb-6">{chain.requirement}</p>
                  <button
                    onClick={() => handleVerify(chain)}
                    className="w-full bg-[#ef5da8] hover:bg-[#d64a94] text-white py-3 px-6 rounded-full font-medium transition-colors"
                  >
                    Verify
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Links & Apps Section */}
        <div className="px-4 md:px-20 py-16">
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <h2 className="text-2xl md:text-3xl font-bold text-black uppercase">
                Links <span className="text-[#ef5da8]">&</span> Apps
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#ef5da8]"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {theme?.socials?.map((app, index) => (
              <div key={index} className="flex flex-col items-center gap-3 p-4 hover:bg-white/50 rounded-xl transition-colors">
                <div className="w-16 h-16 bg-[#ef5da8] rounded-2xl flex items-center justify-center">
                  <img src={app.icon} alt={app.name} className="w-8 h-8" />
                </div>
                <span className="text-black text-sm font-medium text-center">{app.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Community News Section */}
        <div className="px-4 md:px-20 py-16">
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <h2 className="text-2xl md:text-3xl font-bold text-black uppercase">
                Community <span className="text-[#ef5da8]">News</span>
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#ef5da8]"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {currentNewsData.map((news, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 hover:border-[#ef5da8] transition-all">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-lg text-black mb-2 line-clamp-2">{news.title}</h3>
                  <p className="text-gray-600 text-sm">Source: {news.source}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 md:px-20 py-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-[#ef5da8]" />
              <span className="text-black font-bold">abc.web3.club</span>
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
    </div>
  );
};

export default Template6;
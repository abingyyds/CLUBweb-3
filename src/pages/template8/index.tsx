import React, { useState } from 'react';
import { ConnectButton } from '../../components/ConnectButton';
import { useAccount } from 'wagmi';
import Pagination from '../../components/Pagination';
import { MemberModal } from '../template3/MemberModal';
import { usePagination } from '../../hooks/usePagination';
import { useClubData } from '../../hooks/useClubData';
import { useClubMembership } from '../../hooks/useClubMembership';
import { 
  MessageCircle, 
  Twitter, 
  MessageSquare, 
  Youtube, 
  Globe, 
  Bot,
  Star,
  Heart
} from 'lucide-react';

interface Template8Props {
  club: string;
  theme: any;
}

export const Template8: React.FC<Template8Props> = ({ club, theme }) => {
  const { address } = useAccount();
  const domainName = club;
  
  // Mock news data for pagination
  const newsItems = [
    {
      id: 1,
      title: "Weekly Alpha Information Summary",
      source: "Source: Twitter Alpha",
      image: "/news1.png"
    },
    {
      id: 2,
      title: "Complete DeFi Beginner's Guide",
      source: "Source: Twitter Alpha", 
      image: "/news2.png"
    },
    {
      id: 3,
      title: "Community AMA Event Announcement",
      source: "Source: Twitter Alpha",
      image: "/news3.png"
    },
    {
      id: 4,
      title: "Latest Project Research Report Analysis",
      source: "Source: Twitter Alpha",
      image: "/news4.png"
    }
  ];

  const { 
    currentPage, 
    totalPages, 
    currentData: currentNewsData,
    handlePageChange 
  } = usePagination({
    data: newsItems,
    itemsPerPage: 4
  });
  
  const { verifyData, memberData, yearPrice, monthPrice, quarterPrice, isLoading, isError } = useClubData({
    domainName,
    address,
  });
  
  const { 
    modalOpen: showMemberModal, 
    setModalOpen: setShowMemberModal,
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

  // 创建会员选项数组
  const membershipOptions = [
    {
      title: "Lifetime Member",
      price: "5.0 ETH",
      type: "lifetime",
    },
    monthPrice && {
      title: "Monthly Member", 
      price: monthPrice,
      type: "month",
    },
    quarterPrice && {
      title: "Yearly Member",
      price: quarterPrice,
      type: "quarter",
    },
  ].filter(Boolean);

  // Mobile Phone Component
  const MobilePhone = () => (
    <div className="relative">
      {/* Phone Frame */}
      <div className="relative w-[346px] h-[453px] bg-white border-2 border-black rounded-[52px] shadow-[0_10px_0_rgba(0,0,0,0.25)] overflow-hidden">
        {/* Phone Screen Content */}
        <div 
          className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 p-12 flex flex-col justify-between"
          style={{
            backgroundImage: `url("https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=mobile%20app%20interface%20with%20golden%20coins%20floating%20cryptocurrency%20trading%20app%20blue%20gradient%20background%20modern%20ui%20design&image_size=portrait_4_3")`
          }}
        >
          {/* Floating Stars */}
          <div className="absolute top-12 left-7">
            <Star className="w-14 h-17 text-yellow-400 fill-yellow-400" />
          </div>
          <div className="absolute bottom-5 right-3">
            <Star className="w-18 h-23 text-yellow-400 fill-yellow-400" />
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 -left-12">
        <Star className="w-24 h-24 text-yellow-400 fill-yellow-400" />
      </div>

      {/* Tags */}
      <div className="absolute bottom-2 -left-6 bg-black text-white px-6 py-4 rounded-2xl backdrop-blur-sm">
        <span className="text-2xl font-medium">Fresh</span>
      </div>
      
      <div className="absolute top-24 -right-8 bg-black text-white px-6 py-4 rounded-2xl backdrop-blur-sm">
        <span className="text-xl font-medium">Summer</span>
      </div>

      {/* Secondary Phone Frame */}
      <div className="absolute top-48 right-0 w-[223px] h-[343px] bg-white border-2 border-black rounded-[40px] shadow-[0_10px_0_rgba(0,0,0,0.25)]">
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#ffbd43] text-black">
      {/* Header & Hero Section */}
      <div className="flex items-center justify-between px-16 py-15 gap-6">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-base font-semibold mb-2.5 tracking-wide">ABC.WEB3.CLUB</h1>
            <div className="border-b-2 border-black pb-2.5">
              <h2 className="text-[59px] font-bold leading-[65px] uppercase font-['Poller_One'] mb-2.5">
                Eternal Profit
              </h2>
            </div>
            <h2 className="text-[59px] font-bold leading-[65px] uppercase font-['Poller_One']">
              Community
            </h2>
          </div>

          {/* Description */}
          <div className="mb-13 space-y-5">
            <p className="text-xl leading-[26px] text-gray-700 font-medium">
              Welcome to the Eternal Profit Community!We are a professional community focused on blockchain technology innovation and DeFi investment.
            </p>
            <p className="text-xl leading-[26px] text-gray-700 font-medium">
              Here,you will gain access to the most cutting-edge Alpha information. professional investment advice,and a wealth of learning resources.
            </p>
          </div>

          {/* Connect Button */}
          <div className="inline-block">
            <div className="bg-black text-white px-12 py-6 rounded-2xl">
              <ConnectButton className="bg-black text-white hover:bg-gray-800" />
            </div>
          </div>
        </div>

        {/* Right Content - Mobile Phone */}
        <div className="flex-shrink-0">
          <MobilePhone />
        </div>
      </div>

      {/* Join the Option Section */}
      <div className="px-10 py-10">
        <div className="text-center mb-10">
          <h2 className="text-[32px] font-bold uppercase font-['Poller_One'] text-black">
            JOIN THE OPTION
          </h2>
        </div>

        <div className="bg-[#252525] rounded-[50px] shadow-[0_10px_0_rgba(0,0,0,0.25)] p-16">
          <div className="grid grid-cols-3 gap-[118px]">
            {/* Lifetime Member */}
            <div className="flex flex-col items-start space-y-2.5">
              <div className="flex flex-col items-start space-y-3 mb-2.5">
                <Heart className="w-[70px] h-[70px] text-white" />
                <h3 className="text-[32px] font-extrabold text-white font-['Avenir']">
                  Lifetime Member
                </h3>
              </div>
              <p className="text-2xl text-white font-['Avenir'] mb-2.5">
                {yearPrice || '5.0 ETH'}
              </p>
              <button
                onClick={() => handleJoin('lifetime')}
                className="bg-[#f49f00] text-black px-6 py-4 rounded-2xl text-base font-medium uppercase w-[185px] h-[43px] flex items-center justify-center backdrop-blur-sm"
              >
                Join now
              </button>
            </div>

            {/* Monthly Member */}
            <div className="flex flex-col items-start space-y-2.5">
              <div className="flex flex-col items-start space-y-3 mb-2.5">
                <MessageSquare className="w-[70px] h-[70px] text-white" />
                <h3 className="text-[32px] font-extrabold text-white font-['Avenir']">
                  Monthly member
                </h3>
              </div>
              <p className="text-2xl text-white font-['Avenir'] mb-2.5">
                {monthPrice || '500 ETH'}
              </p>
              <button
                onClick={() => handleJoin('month')}
                className="bg-[#f49f00] text-black px-6 py-4 rounded-2xl text-base font-medium uppercase w-[185px] h-[43px] flex items-center justify-center backdrop-blur-sm"
              >
                Join now
              </button>
            </div>

            {/* Yearly Member */}
            <div className="flex flex-col items-start space-y-2.5">
              <div className="flex flex-col items-start space-y-3 mb-2.5">
                <Globe className="w-[70px] h-[70px] text-white" />
                <h3 className="text-[32px] font-extrabold text-white font-['Avenir']">
                  Yearly member
                </h3>
              </div>
              <p className="text-2xl text-white font-['Avenir'] mb-2.5">
                {quarterPrice || '5000 ETH'}
              </p>
              <button
                onClick={() => handleJoin('quarter')}
                className="bg-[#f49f00] text-black px-6 py-4 rounded-2xl text-base font-medium uppercase w-[185px] h-[43px] flex items-center justify-center backdrop-blur-sm"
              >
                Join now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Position Verification Section */}
      <div className="px-10 py-10">
        <div className="text-center mb-10">
          <div className="border-b-2 border-black pb-2 inline-block">
            <h2 className="text-[32px] font-bold uppercase font-['Poller_One'] text-black">
              POSITION VERIFICATION
            </h2>
          </div>
        </div>

        <div className="bg-white/70 border border-gray-800 rounded-[40px] shadow-[0_10px_0_rgba(0,0,0,0.25)] p-10">
          <div className="grid grid-cols-3 gap-20">
            {/* ETH Chain */}
            <div className="flex items-center space-x-2">
              <div className="w-15 h-15 bg-blue-500 rounded-[40px] flex items-center justify-center">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-blue-500 font-bold text-sm">ETH</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-extrabold text-black font-['Avenir'] leading-[26px]">
                  ETH Chain
                </h3>
                <p className="text-xs font-medium text-black/80 font-['Avenir']">
                  Hold AAVE ≥ 100
                </p>
              </div>
              <button 
                onClick={() => handleVerify({ name: 'ETH Chain', requirement: 'Hold AAVE ≥ 100' })}
                className="w-10 h-10 bg-gray-300 rounded-[50px] hover:bg-gray-400 transition-colors"
              ></button>
            </div>

            {/* BNB Chain */}
            <div className="flex items-center space-x-2">
              <div className="w-15 h-15 bg-white rounded-[40px] flex items-center justify-center p-2.5">
                <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">BNB</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-extrabold text-black font-['Avenir'] leading-[26px]">
                  BNB Chain
                </h3>
                <p className="text-xs font-medium text-black/80 font-['Avenir']">
                  Hold BNB ≥ 10
                </p>
              </div>
              <button 
                onClick={() => handleVerify({ name: 'BNB Chain', requirement: 'Hold BNB ≥ 10' })}
                className="w-10 h-10 bg-gray-300 rounded-[50px] hover:bg-gray-400 transition-colors"
              ></button>
            </div>

            {/* Polygon Chain */}
            <div className="flex items-center space-x-2">
              <div className="w-15 h-15 bg-white rounded-[40px] flex items-center justify-center p-2.5">
                <div className="w-10 h-9 bg-purple-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">MATIC</span>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-extrabold text-black font-['Avenir'] leading-[26px]">
                  Polygon Chain
                </h3>
                <p className="text-xs font-medium text-black/80 font-['Avenir']">
                  Hold MATIC ≥ 1000
                </p>
              </div>
              <button 
                onClick={() => handleVerify({ name: 'Polygon Chain', requirement: 'Hold MATIC ≥ 1000' })}
                className="w-10 h-10 bg-gray-300 rounded-[50px] hover:bg-gray-400 transition-colors"
              ></button>
            </div>
          </div>
        </div>

        {/* Decorative Circle */}
        <div className="flex justify-center mt-15">
          <div className="w-[114px] h-[114px] border border-black rounded-full flex items-center justify-center">
            <Heart className="w-8 h-7 text-black" />
          </div>
        </div>
      </div>

      {/* Links & Apps Section */}
      <div className="px-15 py-10">
        <div className="text-center mb-7.5">
          <div className="border-b-2 border-black pb-2 inline-block">
            <h2 className="text-[32px] font-bold uppercase font-['Poller_One'] text-black">
              Links & APPS
            </h2>
          </div>
        </div>

        <div className="bg-white/70 border border-black rounded-[40px] shadow-[0_10px_0_rgba(0,0,0,0.25)] p-15">
          <div className="grid grid-cols-6 gap-2.5">
            {/* Telegram */}
            <div className="flex flex-col items-center space-y-5 rounded-xl">
              <div className="w-[74px] h-[74px] bg-[#3088ff] rounded-[36px] flex items-center justify-center p-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <div className="flex flex-col items-center space-y-2.5">
                <span className="text-xl font-medium text-gray-700 font-['Lato']">Telegram</span>
                <button className="bg-black text-white px-5 py-2 rounded-xl text-sm font-medium">
                  Join
                </button>
              </div>
            </div>

            {/* Twitter/X */}
            <div className="flex flex-col items-center space-y-5 rounded-xl">
              <div className="w-[74px] h-[74px] bg-[#6aabe9] rounded-[36px] flex items-center justify-center p-5.5">
                <Twitter className="w-8 h-8 text-white" />
              </div>
              <div className="flex flex-col items-center space-y-2.5">
                <span className="text-xl font-medium text-gray-700 font-['Lato']">Twitter/X</span>
                <button className="bg-black text-white px-5 py-2 rounded-xl text-sm font-medium">
                  Follow
                </button>
              </div>
            </div>

            {/* Discord */}
            <div className="flex flex-col items-center space-y-5 rounded-xl">
              <div className="w-[74px] h-[74px] bg-[#778cd3] rounded-[46px] flex items-center justify-center p-4">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <div className="flex flex-col items-center space-y-2.5">
                <span className="text-xl font-medium text-gray-700 font-['Lato']">Discord</span>
                <button className="bg-black text-white px-5 py-2 rounded-xl text-sm font-medium">
                  Join
                </button>
              </div>
            </div>

            {/* YouTube */}
            <div className="flex flex-col items-center space-y-5 rounded-xl">
              <div className="w-[74px] h-[74px] bg-[#eb3323] rounded-[46px] flex items-center justify-center p-5.5">
                <Youtube className="w-8 h-8 text-white" />
              </div>
              <div className="flex flex-col items-center space-y-2.5">
                <span className="text-xl font-medium text-gray-700 font-['Lato']">YouTube</span>
                <button className="bg-black text-white px-5 py-2 rounded-xl text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>

            {/* OnlyCluber */}
            <div className="flex flex-col items-center space-y-5 rounded-xl">
              <div className="w-[74px] h-[74px] bg-[#04231e] rounded-[46px] flex items-center justify-center p-5.5">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <div className="flex flex-col items-center space-y-2.5">
                <span className="text-xl font-medium text-gray-700 font-['Lato']">OnlyCluber</span>
                <button className="bg-black text-white px-5 py-2 rounded-xl text-sm font-medium">
                  Open
                </button>
              </div>
            </div>

            {/* ClubBot */}
            <div className="flex flex-col items-center space-y-5 rounded-xl">
              <div className="w-[74px] h-[74px] bg-[#01cd88] rounded-[56px] flex items-center justify-center p-5.5">
                <Bot className="w-10 h-10 text-white" />
              </div>
              <div className="flex flex-col items-center space-y-2.5">
                <span className="text-xl font-medium text-gray-700 font-['Lato']">ClubBot</span>
                <button className="bg-black text-white px-5 py-2 rounded-xl text-sm font-medium">
                  Mint
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community News Section */}
      <div className="px-10 py-10">
        <div className="text-center mb-10">
          <h2 className="text-[32px] font-bold uppercase font-['Poller_One'] text-black">
            COMMUNITY NEWS
          </h2>
        </div>

        <div className="space-y-8">
          {/* News Grid */}
          <div className="grid grid-cols-2 gap-8">
            {currentNewsData.map((news, index) => (
              <div key={index} className="flex items-start space-x-4">
                <img
                  src={`https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=cryptocurrency%20news%20thumbnail%20blockchain%20technology%20digital%20assets%20modern%20design&image_size=square`}
                  alt="News thumbnail"
                  className="w-[71px] h-[71px] rounded object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-black font-medium mb-1">
                    {news.title || 'Weekly Alpha Information Summary'}
                  </h3>
                  <p className="text-black/80 text-sm">
                    {news.source || 'Source: Twitter Alpha'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium ${
                  currentPage === i + 1
                    ? 'bg-black text-white'
                    : 'bg-transparent text-black border border-black'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Decorative Circle */}
        <div className="flex justify-center mt-15">
          <div className="w-[114px] h-[114px] border border-black rounded-full flex items-center justify-center">
            <Heart className="w-8 h-7 text-black" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-black text-white px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-white" />
            <span className="text-white font-medium">abc.web3.club</span>
          </div>
          <p className="text-sm">
            <span className="text-white">Powered by </span>
            <span className="text-white font-medium">Web3.Club</span>
            <span className="text-white"> and </span>
            <span className="text-white font-medium">OrbitLink.Me</span>
          </p>
        </div>
      </div>

      {/* Member Modal */}
      <MemberModal
        open={showMemberModal}
        setOpen={setShowMemberModal}
        data={memberData}
        onConfirm={handleConfirmJoin}
        isVerifyMode={isVerifyMode}
      />
    </div>
  );
};
import React, { useState } from 'react';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { ConnectButton } from '../../components/ConnectButton';
import { MemberModal } from '../template3/MemberModal';
import { usePagination } from '../../hooks/usePagination';
import { useClubData } from '../../hooks/useClubData';
import { useClubMembership } from '../../hooks/useClubMembership';
import { useAccount } from 'wagmi';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import testImg from "@/assets/images/test.png";

interface Template2Props {
  club: string;
  theme?: any;
}

export const Template2 = ({ club, theme }: Template2Props) => {
  const { address } = useAccount();
  const domainName = club;
  
  // Mock news data for pagination
  const newsItems = [
    {
      id: 1,
      title: "Weekly Alpha Information Summary",
      source: "Source: Twitter Alpha",
      image: "/news1.png",
      link: "https://example.com/news1"
    },
    {
      id: 2,
      title: "Complete DeFi Beginner's Guide",
      source: "Source: Twitter Alpha", 
      image: "/news2.png",
      link: "https://example.com/news2"
    },
    {
      id: 3,
      title: "Community AMA Event Announcement",
      source: "Source: Twitter Alpha",
      image: "/news3.png",
      link: "https://example.com/news3"
    },
    {
      id: 4,
      title: "Latest Project Research Report Analysis",
      source: "Source: Twitter Alpha",
      image: "/news4.png",
      link: "https://example.com/news4"
    },
    {
      id: 5,
      title: "Interpretation of Major Industry News",
      source: "Source: Twitter Alpha",
      image: "/news1.png",
      link: "https://example.com/news5"
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
  const [selectedPlan, setSelectedPlan] = useState<string>("lifetime");
  const [selectedPrice, setSelectedPrice] = useState<string>("5.0");

  // 创建会员选项数组（基于template1结构）
  const membershipOptions = [
    {
      title: "Lifetime Member",
      price: "5.0",
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

  const socialLinks = [
    { name: 'Telegram', icon: '/telegram.png', color: 'bg-blue-500' },
    { name: 'Twitter', icon: '/twitter.png', color: 'bg-sky-400' },
    { name: 'Discord', icon: '/discord.png', color: 'bg-indigo-500' },
    { name: 'YouTube', icon: '/youtube.png', color: 'bg-red-500' },
    { name: 'OnlyCluber', icon: '/onlycluber.png', color: 'bg-gray-800' },
    { name: 'ClubBot', icon: '/clubbot.png', color: 'bg-green-500' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="max-w-6xl mx-auto px-4 lg:px-20 py-5">
        <h1 className="text-black font-bold text-base uppercase tracking-wide">
          abc.web3.club
        </h1>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 lg:px-20 py-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold text-black leading-tight mb-0">
              Eternal Profit
            </h1>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold leading-tight -mt-2 bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent">
              Community
            </h1>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="text-2xl lg:text-3xl font-extrabold text-black tracking-wider">
              🔥 👍 😄
            </div>
            <p className="text-sm text-black max-w-80 leading-5">
              Here, you will gain access to the most cutting-edge Alpha information,
              professional investment advice, and a wealth of learning resources.
            </p>
          </div>
        </div>
      </section>

      {/* Fun with us & Connect Wallet Section */}
      <section className="max-w-6xl mx-auto px-4 lg:px-20 py-6 lg:py-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 min-h-[300px] lg:h-96">
          {/* Left side - Fun with us */}
          <div className="flex gap-1 lg:gap-4 w-[58%] lg:w-[71%] h-[58lvw] lg:h-full">
            {/* Fun with us card */}
            <div className="flex-1 bg-gradient-to-br from-teal-500 to-purple-500 rounded-3xl lg:rounded-3xl p-6 lg:p-16 flex flex-col justify-between">
              <h2 className="text-2xl lg:text-5xl font-extrabold text-white leading-tight">
                Fun with us
              </h2>
              <div className="flex items-center">
                <img src="/hero.png" alt="User 1" className="w-10 lg:w-14 h-10 lg:h-14 rounded-full border-2 border-white" />
                <img src="/hero.png" alt="User 2" className="w-10 lg:w-14 h-10 lg:h-14 rounded-full border-2 border-white -ml-2" />
                <img src="/hero.png" alt="User 3" className="w-10 lg:w-14 h-10 lg:h-14 rounded-full border-2 border-white -ml-2" />
              </div>
            </div>
            {/* Background images - now visible on mobile */}
            <div className="absolute left-[77%] lg:static flex flex-col items-end gap-3 lg:gap-5 w-auto ml-[-116px]">
              <img src={testImg} alt="Background 1" className="w-[31dvw] lg:w-[240px] h-[31dvw] lg:h-[208px] rounded-3xl object-cover" />
              <img src={testImg} alt="Background 2" className="w-[45dvw] lg:w-[360px] h-[24dvw] lg:h-[156px] rounded-3xl object-cover" />
            </div>
          </div>

          {/* Right side - Connect Wallet */}
          <div className="flex flex-col items-center lg:items-end gap-4 w-full lg:w-auto">
            <div className="bg-teal-500 w-full max-w-lg lg:w-72 rounded-[50px] px-6 py-4 flex items-center justify-center gap-2 cursor-pointer hover:bg-teal-600 transition-colors order-2 lg:order-1">
              <ConnectButton />
              <ArrowRight className="w-6 lg:w-8 h-6 lg:h-8 text-white" />
            </div>
            <div className="w-full lg:w-72 h-[70vw] lg:h-[300px] order-1 lg:order-2">
              <img src={testImg} alt="Side image" className="w-full h-full rounded-2xl lg:rounded-3xl object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Text with Background Decorations */}
      <section className="max-w-6xl mx-auto px-4 lg:px-20 py-6 lg:py-10 relative">
        {/* Background decoration bars - hidden on mobile */}
        <div className="hidden lg:block absolute top-16 left-96 w-96 h-6 bg-teal-500 opacity-70"></div>
        <div className="hidden lg:block absolute top-32 left-20 w-96 h-6 bg-teal-500 opacity-70"></div>
        <div className="hidden lg:block absolute top-32 right-32 w-24 h-6 bg-teal-500 opacity-70"></div>
        <div className="hidden lg:block absolute top-40 left-20 w-64 h-6 bg-teal-500 opacity-70"></div>
        
        <p className="text-2xl lg:text-5xl font-extrabold text-black leading-tight relative z-10">
          Welcome to the Eternal Profit Community! We are a professional community
          focused on blockchain technology innovation and DeFi investment.
        </p>
      </section>

      {/* Join the Option Section */}
      <section className="max-w-6xl mx-auto px-4 lg:px-20 py-6 lg:py-10">
        <div className="bg-gray-900 rounded-2xl lg:rounded-3xl p-6 lg:p-20 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-20">
          <img src={testImg} alt="Join option" className="w-full lg:w-96 h-48 lg:h-72 rounded-xl object-cover" />
          <div className="flex-1 space-y-4 lg:space-y-5">
            <h2 className="text-2xl lg:text-5xl font-extrabold text-white">Join the Option</h2>
            <div className="space-y-4 lg:space-y-5">
              <div>
                <label className="block text-white font-bold mb-2">Plan</label>
                <Select
                  value={selectedPlan}
                  onValueChange={(value) => {
                    setSelectedPlan(value);
                    const selectedOption = membershipOptions.find(option => option.type === value);
                    if (selectedOption) {
                      setSelectedPrice(selectedOption.price);
                    }
                  }}
                >
                  <SelectTrigger className="bg-white rounded-lg px-4 py-3 text-gray-600">
                    <SelectValue placeholder="选择计划" />
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
                <label className="block text-white font-bold mb-2">Price</label>
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

      {/* Position Verification Section */}
      <section className="max-w-6xl mx-auto px-4 lg:px-20 py-6 lg:py-10">
        <h2 className="text-2xl lg:text-5xl font-extrabold text-black mb-6 lg:mb-10">Position Verification</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
          {verifyData?.map((item, index) => (
            <div key={index} className="bg-gray-100 rounded-xl p-4 lg:p-5 flex items-center justify-between">
              <div className="flex items-center gap-3 lg:gap-5">
                <div className="w-12 lg:w-18 h-12 lg:h-18 rounded-lg overflow-hidden">
                  <img src={item.icon} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-black text-sm lg:text-base">{item.name}</h3>
                  <p className="text-xs lg:text-sm text-gray-600">{item.requirement}</p>
                </div>
              </div>
              <button 
                onClick={() => handleVerify(item)}
                className="text-gray-400 hover:text-gray-600"
              >
                <ArrowRight className="w-5 lg:w-6 h-5 lg:h-6" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Links & Apps Section */}
      <section className="max-w-6xl mx-auto px-4 lg:px-20 py-6 lg:py-10">
        <h2 className="text-2xl lg:text-5xl font-extrabold text-black mb-6 lg:mb-10">Links & Apps</h2>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-10">
          {socialLinks.map((link, index) => (
            <div key={index} className="bg-gray-100 rounded-xl p-4 lg:p-8 flex flex-col items-center justify-center">
              <div className={`w-12 lg:w-16 h-12 lg:h-16 rounded-xl lg:rounded-2xl ${link.color} flex items-center justify-center p-3 lg:p-5`}>
                <img src={link.icon} alt={link.name} className="w-6 lg:w-8 h-6 lg:h-8" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community News Section */}
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
                className="w-full md:w-64 lg:w-80 h-32 md:h-20 lg:h-24 object-cover rounded-xl flex-shrink-0"
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

      {/* Footer */}
      <footer className="w-full mx-auto bg-[#2AADA5]">
        <div className="max-w-6xl mx-auto px-4 lg:px-20 py-6 lg:py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center justify-center lg:justify-start">
              <img src="/hero.png" alt="User 1" className="w-10 lg:w-14 h-10 lg:h-14 rounded-full border-2 border-white" />
              <img src="/hero.png" alt="User 2" className="w-10 lg:w-14 h-10 lg:h-14 rounded-full border-2 border-white -ml-2" />
              <img src="/hero.png" alt="User 3" className="w-10 lg:w-14 h-10 lg:h-14 rounded-full border-2 border-white -ml-2" />
              <img src="/hero.png" alt="User 4" className="w-10 lg:w-14 h-10 lg:h-14 rounded-full border-2 border-white -ml-2" />
            </div>
            <div className="text-center">
              <h3 className="font-bold text-black">abc.web3.club</h3>
            </div>
            <p className="text-sm text-black text-center lg:text-left">
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

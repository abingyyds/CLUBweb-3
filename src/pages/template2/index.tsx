import React from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { ConnectButton } from '../../components/ConnectButton';
import { MemberModal } from '../template3/MemberModal';
import { usePagination } from '../../hooks/usePagination';
import { useClubData } from '../../hooks/useClubData';
import { useClubMembership } from '../../hooks/useClubMembership';
import { useAccount } from 'wagmi';

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
    },
    {
      id: 5,
      title: "Interpretation of Major Industry News",
      source: "Source: Twitter Alpha",
      image: "/news1.png"
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
      <header className="max-w-6xl mx-auto px-20 py-5">
        <h1 className="text-black font-bold text-base uppercase tracking-wide">
          abc.web3.club
        </h1>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-20 py-5">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-8xl font-extrabold text-black leading-tight mb-0">
              Eternal Profit
            </h1>
            <h1 className="text-8xl font-extrabold leading-tight -mt-2 bg-gradient-to-r from-teal-500 to-purple-500 bg-clip-text text-transparent">
              Community
            </h1>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="text-3xl font-extrabold text-black tracking-wider">
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
      <section className="max-w-6xl mx-auto px-20 py-10">
        <div className="flex items-center justify-between h-96">
          {/* Left side - Fun with us */}
          <div className="relative w-96 h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-purple-500 rounded-3xl p-16 flex flex-col justify-between">
              <h2 className="text-5xl font-extrabold text-white leading-tight">
                Fun with us
              </h2>
              <div className="flex items-center">
                <img src="/hero.png" alt="User 1" className="w-14 h-14 rounded-full border-2 border-white" />
                <img src="/hero.png" alt="User 2" className="w-14 h-14 rounded-full border-2 border-white -ml-2" />
                <img src="/hero.png" alt="User 3" className="w-14 h-14 rounded-full border-2 border-white -ml-2" />
              </div>
            </div>
            {/* Background images */}
            <div className="absolute -right-80 top-0 flex flex-col gap-5">
              <img src="/hero.png" alt="Background 1" className="w-72 h-64 rounded-3xl ml-24" />
              <img src="/hero.png" alt="Background 2" className="w-96 h-44 rounded-3xl" />
            </div>
          </div>

          {/* Right side - Connect Wallet */}
          <div className="flex flex-col items-end gap-5">
            <div className="bg-teal-500 rounded-3xl px-11 py-8 flex items-center gap-2 cursor-pointer hover:bg-teal-600 transition-colors">
              <ConnectButton />
              <ArrowRight className="w-8 h-8 text-white" />
            </div>
            <div className="w-72 h-80">
              <img src="/hero.png" alt="Side image" className="w-full h-full rounded-3xl object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Text with Background Decorations */}
      <section className="max-w-6xl mx-auto px-20 py-10 relative">
        {/* Background decoration bars */}
        <div className="absolute top-16 left-96 w-96 h-6 bg-teal-500 opacity-70"></div>
        <div className="absolute top-32 left-20 w-96 h-6 bg-teal-500 opacity-70"></div>
        <div className="absolute top-32 right-32 w-24 h-6 bg-teal-500 opacity-70"></div>
        <div className="absolute top-40 left-20 w-64 h-6 bg-teal-500 opacity-70"></div>
        
        <p className="text-5xl font-extrabold text-black leading-tight relative z-10">
          Welcome to the Eternal Profit Community! We are a professional community
          focused on blockchain technology innovation and DeFi investment.
        </p>
      </section>

      {/* Join the Option Section */}
      <section className="max-w-6xl mx-auto px-20 py-10">
        <div className="bg-gray-900 rounded-3xl p-20 flex items-center gap-20">
          <img src="/hero.png" alt="Join option" className="w-96 h-72 rounded-xl object-cover" />
          <div className="flex-1 space-y-5">
            <h2 className="text-5xl font-extrabold text-white">Join the Option</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-white font-bold mb-2">Plan</label>
                <div className="bg-white rounded-lg px-4 py-3 flex items-center justify-between">
                  <span className="text-gray-600">Lifetime Member</span>
                  <ChevronDown className="w-6 h-6 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-white font-bold mb-2">Price</label>
                <div className="bg-white rounded-lg px-4 py-3 flex items-center gap-2">
                  <span className="text-black">$</span>
                  <span className="text-gray-600">5.0</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => handleJoin('lifetime')}
              className="w-full bg-teal-500 text-white font-medium py-3 rounded-lg hover:bg-teal-600 transition-colors"
            >
              Join Now
            </button>
          </div>
        </div>
      </section>

      {/* Position Verification Section */}
      <section className="max-w-6xl mx-auto px-20 py-10">
        <h2 className="text-5xl font-extrabold text-black mb-10">Position Verification</h2>
        <div className="grid grid-cols-3 gap-5">
          {verifyData?.map((item, index) => (
            <div key={index} className="bg-gray-100 rounded-xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-18 h-18 rounded-lg overflow-hidden">
                  <img src={item.icon} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-black">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.requirement}</p>
                </div>
              </div>
              <button 
                onClick={() => handleVerify(item)}
                className="text-gray-400 hover:text-gray-600"
              >
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Links & Apps Section */}
      <section className="max-w-6xl mx-auto px-20 py-10">
        <h2 className="text-5xl font-extrabold text-black mb-10">Links & Apps</h2>
        <div className="grid grid-cols-6 gap-10">
          {socialLinks.map((link, index) => (
            <div key={index} className="bg-gray-100 rounded-xl p-8 flex flex-col items-center justify-center">
              <div className={`w-16 h-16 rounded-2xl ${link.color} flex items-center justify-center p-5`}>
                <img src={link.icon} alt={link.name} className="w-8 h-8" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community News Section */}
      <section className="max-w-6xl mx-auto px-20 py-10">
        <div className="bg-gray-100 rounded-3xl p-10">
          <h2 className="text-5xl font-extrabold text-black mb-10">Community News</h2>
          <div className="space-y-8">
            {currentNewsData.map((item, index) => (
              <div key={item.id} className="flex items-center gap-8">
                <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black">{index + 1}</span>
                </div>
                <img src={item.image} alt={item.title} className="w-20 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <h3 className="font-bold text-black">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.source}</p>
                </div>
                <ChevronDown className="w-6 h-6 text-gray-400" />
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-black ${
                  currentPage === page 
                    ? 'bg-teal-500 text-white' 
                    : 'bg-white text-black hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
            {currentPage < totalPages && (
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="w-10 h-10 rounded-lg flex items-center justify-center font-black bg-white text-black hover:bg-gray-200"
              >
                &gt;
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-20 py-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="/hero.png" alt="User 1" className="w-14 h-14 rounded-full border-2 border-white" />
            <img src="/hero.png" alt="User 2" className="w-14 h-14 rounded-full border-2 border-white -ml-2" />
            <img src="/hero.png" alt="User 3" className="w-14 h-14 rounded-full border-2 border-white -ml-2" />
            <img src="/hero.png" alt="User 4" className="w-14 h-14 rounded-full border-2 border-white -ml-2" />
          </div>
          <div className="text-center">
            <h3 className="font-bold text-black">abc.web3.club</h3>
          </div>
          <p className="text-sm text-black">
            <span>Powered by </span>
            <span className="font-bold">Web3.Club</span>
            <span> and </span>
            <span className="font-bold">OrbitLink.Me</span>
          </p>
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

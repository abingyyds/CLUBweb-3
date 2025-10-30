import React, { useState } from "react";
import { useAccount } from "wagmi";
import { MemberModal } from "../template3/MemberModal";
import { usePagination } from "../../hooks/usePagination";
import { useClubData } from "../../hooks/useClubData";
import { useClubMembership } from "../../hooks/useClubMembership";
import { ConnectButton } from "@/components/ConnectButton";

interface Template9Props {
  club?: string;
  theme: any;
}

const Template9: React.FC<Template9Props> = ({ club = "abc", theme }) => {
  const { address, isConnected } = useAccount();
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [selectedMembership, setSelectedMembership] = useState<string>("");
  const domainName = club;

  const {
    verifyData,
    memberData,
    yearPrice,
    monthPrice,
    quarterPrice,
    isLoading,
    isError,
  } = useClubData({
    domainName: club,
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

  // Mock news data for pagination
  const newsItems = [
    {
      title: "Weekly Alpha Information Summary",
      source: "Twitter Alpha",
      date: "2024/01/15",
      content: "Latest market insights and alpha information from our community experts.",
    },
    {
      title: "Community AMA Event Announcement",
      source: "Twitter Alpha", 
      date: "2024/01/14",
      content: "Join our upcoming AMA session with industry leaders.",
    },
    {
      title: "DeFi Protocol Analysis Report",
      source: "Twitter Alpha",
      date: "2024/01/13", 
      content: "Comprehensive analysis of the latest DeFi protocols and opportunities.",
    },
    {
      title: "Complete DeFi Beginner's Guide",
      source: "Twitter Alpha",
      date: "2024/01/12",
      content: "Everything you need to know to get started in DeFi.",
    },
  ];

  const {
    currentPage,
    totalPages,
    currentData: paginatedNews,
    handlePageChange: nextPage,
  } = usePagination({ data: newsItems });

  const handleJoinClick = (membershipType: string) => {
    setSelectedMembership(membershipType);
    setShowMemberModal(true);
  };

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Main Container - 1280px width, centered */}
      <div className="w-[1280px] mx-auto bg-white">
        
        {/* Header */}
        <header className="flex items-center justify-between px-[106px] py-[14px] border-b border-gray-200">
          <div className="flex items-center gap-[10px]">
            {/* Logo placeholder */}
            <div className="w-3 h-[15px] bg-gray-300"></div>
            <span className="text-[#f5a200] font-semibold text-base">ABC.WEB3.CLUB</span>
          </div>
          <button className="bg-[#ffbb33] text-black px-[11px] py-[6px] rounded-[5px] font-semibold text-base shadow-sm hover:shadow-md transition-shadow">
            Connect Wallet
          </button>
        </header>

        {/* Main Content */}
        <div className="px-[124px] pb-[100px] space-y-10">
          
          {/* Hero Section */}
          <section className="flex items-center justify-between pt-10">
            <div className="flex flex-col space-y-8 max-w-[440px]">
              <h1 className="text-[61px] font-bold leading-[65px] text-[#050505] tracking-[-1.92px]">
                ETERNAL PROFIT COMMUNITY
              </h1>
              <button className="bg-[#ffbb33] text-black px-[14px] py-[6px] rounded-[5px] font-semibold text-base shadow-sm hover:shadow-md transition-shadow w-fit">
                Connect Wallet
              </button>
            </div>
            <div className="w-[578px] h-[316px] bg-gray-200 rounded-lg flex items-center justify-center">
              {/* Hero Image Placeholder */}
              <span className="text-gray-500">Hero Image</span>
            </div>
          </section>

          {/* Info Cards Section */}
          <section className="flex gap-4">
            {/* Card 01 */}
            <div className="flex-1 border-2 border-gray-100 rounded-xl bg-white p-4 space-y-8">
              <div className="space-y-2">
                <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                  <div className="w-5 h-5 bg-gray-400 rounded"></div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-semibold text-[#050505]">01</h3>
                  <p className="text-sm text-[#050505] leading-relaxed">
                    Welcome to the Eternal Profit Community!We are a professional community focused on blockchain technology innovation and DeFi investment.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[#996600] text-sm font-semibold">
                <span>View more</span>
                <span>→</span>
              </div>
            </div>

            {/* Card 02 */}
            <div className="flex-1 border-2 border-gray-100 rounded-xl bg-gray-50 p-4 space-y-8">
              <div className="space-y-2">
                <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                  <div className="w-5 h-5 bg-gray-400 rounded"></div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-semibold text-[#050505]">02</h3>
                  <p className="text-sm text-[#050505] leading-relaxed">
                    Here,you will gain access to the most cutting-edge Alpha information,professional investment advice,and a wealth of learning resources.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[#996600] text-sm font-semibold">
                <span>View more</span>
                <span>→</span>
              </div>
            </div>
          </section>

          {/* Join The Option Section */}
          <section className="relative py-10">
            <h2 className="text-[40px] font-bold text-center text-[#050505] leading-[49px] tracking-[-1.21px] mb-11">
              Join The Option
            </h2>
            
            <div className="flex gap-10">
              {/* Lifetime Member */}
              <div className="flex-1 border-4 border-gray-100 rounded-xl bg-gray-50">
                <div className="bg-white rounded-t-xl p-6 space-y-3">
                  <div className="w-7 h-8 bg-gray-300 rounded"></div>
                  <h3 className="text-2xl font-bold text-[#050505]">Lifetime Member</h3>
                  <p className="text-sm text-[#050505]">
                    For organizing every corner of your<br />work & life.
                  </p>
                </div>
                <div className="p-6 space-y-3">
                  <div className="text-[36px] font-bold text-[#050505]">$500</div>
                  <button 
                    onClick={() => handleJoinClick("lifetime")}
                    className="w-full bg-white border border-gray-200 text-[#121212] py-2 px-4 rounded-md font-semibold shadow-sm hover:shadow-md transition-shadow"
                  >
                    Get started
                  </button>
                </div>
              </div>

              {/* Monthly Membership */}
              <div className="flex-1 border-4 border-gray-100 rounded-xl bg-gray-50 relative">
                <div className="absolute top-0 right-0 bg-gray-100 px-3 py-1 rounded-bl-lg rounded-tr-xl">
                  <span className="text-xs font-semibold text-gray-600">Most popular</span>
                </div>
                <div className="bg-white rounded-t-xl p-6 space-y-3">
                  <div className="w-9 h-8 bg-gray-300 rounded"></div>
                  <h3 className="text-2xl font-bold text-[#050505]">Monthly Membership</h3>
                  <p className="text-sm text-[#050505]">
                    A place for small groups to plan &<br />get organized.
                  </p>
                </div>
                <div className="p-6 space-y-3">
                  <div className="text-[36px] font-bold text-[#050505]">$50</div>
                  <button 
                    onClick={() => handleJoinClick("monthly")}
                    className="w-full bg-[#121212] text-white py-2 px-4 rounded-md font-semibold shadow-sm hover:shadow-md transition-shadow"
                  >
                    Get started
                  </button>
                </div>
              </div>

              {/* Yearly Membership */}
              <div className="flex-1 border-4 border-gray-100 rounded-xl bg-gray-50">
                <div className="bg-white rounded-t-xl p-6 space-y-3">
                  <div className="w-7 h-8 bg-gray-300 rounded"></div>
                  <h3 className="text-2xl font-bold text-[#050505]">Yearly Membership</h3>
                  <p className="text-sm text-[#050505]">
                    For companies using PRODUCT NAME to connect several teams & tools.
                  </p>
                </div>
                <div className="p-6 space-y-3">
                  <div className="text-[36px] font-bold text-[#050505]">$100</div>
                  <button 
                    onClick={() => handleJoinClick("yearly")}
                    className="w-full bg-white border border-gray-200 text-[#121212] py-2 px-4 rounded-md font-semibold shadow-sm hover:shadow-md transition-shadow"
                  >
                    Get started
                  </button>
                </div>
              </div>
            </div>

            {/* Decorative image */}
            <div className="absolute top-0 right-0 w-[221px] h-[150px] bg-gray-200 rounded"></div>
          </section>

          {/* Position Verification Section */}
          <section className="relative py-10">
            <div className="absolute top-0 left-20 w-[178px] h-[181px] bg-gray-200 rounded"></div>
            
            <h2 className="text-[40px] font-bold text-center text-[#050505] leading-[49px] tracking-[-1.21px] mb-11 relative z-10">
              Position Verification
            </h2>
            
            <div className="flex gap-6 relative z-10">
              {/* ETH Chain */}
              <div className="flex-1 bg-gray-50 rounded-xl p-7 space-y-2">
                <div className="space-y-1">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <div className="w-8 h-8 bg-blue-500 rounded"></div>
                  </div>
                  <h3 className="text-lg font-bold text-[#050505]">ETH Chain</h3>
                  <p className="text-base text-[#121212]">Hold AAVE≥100</p>
                </div>
                <div className="flex items-center gap-1 text-[#996600] font-medium">
                  <span>Verify</span>
                  <span>→</span>
                </div>
              </div>

              {/* BNB Chain */}
              <div className="flex-1 bg-gray-50 rounded-xl p-7 space-y-2">
                <div className="space-y-1">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <div className="w-8 h-8 bg-yellow-500 rounded"></div>
                  </div>
                  <h3 className="text-lg font-bold text-[#050505]">BNB Chain</h3>
                  <p className="text-base text-[#121212]">Hold BNB≥10</p>
                </div>
                <div className="flex items-center gap-1 text-[#996600] font-medium">
                  <span>Verify</span>
                  <span>→</span>
                </div>
              </div>

              {/* Polygon Chain */}
              <div className="flex-1 bg-gray-50 rounded-xl p-7 space-y-2">
                <div className="space-y-1">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <div className="w-8 h-8 bg-purple-500 rounded"></div>
                  </div>
                  <h3 className="text-lg font-bold text-[#050505]">Polygon Chain</h3>
                  <p className="text-base text-[#121212]">Hold MATIC≥1000</p>
                </div>
                <div className="flex items-center gap-1 text-[#996600] font-medium">
                  <span>Verify</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </section>

          {/* Links & Apps Section */}
          <section className="relative py-10">
            <h2 className="text-[40px] font-bold text-center text-[#050505] leading-[49px] tracking-[-1.21px] mb-11">
              Links & Apps
            </h2>
            
            <div className="grid grid-cols-3 gap-6">
              {/* Telegram */}
              <div className="space-y-3">
                <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
                  <div className="w-10 h-10 bg-white rounded"></div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-[#050505]">Telegram</h3>
                  <div className="bg-[#ffbb33] text-black px-2 py-1 rounded text-xs font-semibold w-fit">
                    Join
                  </div>
                </div>
              </div>

              {/* Twitter/X */}
              <div className="space-y-3">
                <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center">
                  <div className="w-10 h-10 bg-white rounded"></div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-[#050505]">Twitter/X</h3>
                  <div className="bg-[#ffbb33] text-black px-2 py-1 rounded text-xs font-semibold w-fit">
                    Follow
                  </div>
                </div>
              </div>

              {/* Discord */}
              <div className="space-y-3">
                <div className="w-16 h-16 bg-indigo-500 rounded-lg flex items-center justify-center">
                  <div className="w-10 h-10 bg-white rounded"></div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-[#050505]">Discord</h3>
                  <div className="bg-[#ffbb33] text-black px-2 py-1 rounded text-xs font-semibold w-fit">
                    Join
                  </div>
                </div>
              </div>

              {/* YouTube */}
              <div className="space-y-3">
                <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center">
                  <div className="w-10 h-10 bg-white rounded"></div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-[#050505]">YouTube</h3>
                  <div className="bg-[#ffbb33] text-black px-2 py-1 rounded text-xs font-semibold w-fit">
                    Subscribe
                  </div>
                </div>
              </div>

              {/* OnlyCluber */}
              <div className="space-y-3">
                <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center">
                  <div className="w-10 h-10 bg-white rounded"></div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-[#050505]">OnlyCluber</h3>
                  <div className="bg-[#ffbb33] text-black px-2 py-1 rounded text-xs font-semibold w-fit">
                    Open
                  </div>
                </div>
              </div>

              {/* ClubBot */}
              <div className="space-y-3">
                <div className="w-16 h-16 bg-gray-500 rounded-lg flex items-center justify-center">
                  <div className="w-10 h-10 bg-white rounded"></div>
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-[#050505]">ClubBot</h3>
                  <div className="bg-[#ffbb33] text-black px-2 py-1 rounded text-xs font-semibold w-fit">
                    Mint
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative image */}
            <div className="absolute top-0 right-0 w-[200px] h-[150px] bg-gray-200 rounded"></div>
          </section>

          {/* Community News Section */}
          <section className="relative py-10">
            <div className="absolute top-0 left-0 w-[150px] h-[120px] bg-gray-200 rounded"></div>
            
            <h2 className="text-[40px] font-bold text-center text-[#050505] leading-[49px] tracking-[-1.21px] mb-11 relative z-10">
              Community News
            </h2>
            
            <div className="space-y-4 relative z-10">
              {paginatedNews.map((news, index) => (
                <div key={index} className="flex items-start justify-between p-4 border-b border-gray-100">
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#050505] mb-1">{news.title}</h3>
                    <p className="text-sm text-gray-600">{news.source}</p>
                  </div>
                  <div className="text-sm text-gray-500">{news.date}</div>
                  <button className="ml-4 text-[#996600] hover:text-[#b8770a]">+</button>
                </div>
              ))}
              
              {/* Featured News with Image */}
              <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-24 h-16 bg-gray-300 rounded flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="text-sm text-[#050505] leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p className="text-xs text-gray-500 mt-2">2026/09/10</p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <button className="bg-[#ffbb33] text-black px-6 py-2 rounded font-semibold shadow-sm hover:shadow-md transition-shadow">
                View More
              </button>
            </div>
          </section>

          {/* Bottom Decorative Image */}
          <div className="flex justify-center py-10">
            <div className="w-[400px] h-[200px] bg-gray-200 rounded-lg"></div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-50 py-8 px-[124px] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
            <span className="text-[#f5a200] font-semibold">abc.web3.club</span>
          </div>
          <div className="text-sm text-gray-600">
            <span>Powered by </span>
            <span className="text-[#f5a200]">Web3.Club</span>
            <span> and </span>
            <span className="text-[#f5a200]">OrbitLink.Me</span>
          </div>
        </footer>
      </div>

      {/* Member Modal */}
      {showMemberModal && (
        <MemberModal
          open={showMemberModal}
          setOpen={setShowMemberModal}
          data={memberData}
          isVerifyMode={false}
          onConfirm={handleConfirmJoin}
        />
      )}
    </div>
  );
};

export default Template9;

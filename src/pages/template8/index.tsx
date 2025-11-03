import React, { useState } from "react";
import { ConnectButton } from "../../components/ConnectButton";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";
import Pagination from "../../components/Pagination";
import { MemberModal } from "./MemberModal";
import { usePagination } from "../../hooks/usePagination";
import { useClubData } from "../../hooks/useClubData";
import { useClubMembership } from "../../hooks/useClubMembership";
import { Star, Heart } from "lucide-react";
import { ITheme } from "@/types";
import "@fontsource/poller-one";

interface Template8Props {
  club: string;
  theme: ITheme;
}

export const Template8: React.FC<Template8Props> = ({ club, theme }) => {
  const { address } = useAccount();
  const domainName = club;

  const {
    currentPage,
    totalPages,
    currentData: currentNewsData,
    handlePageChange,
  } = usePagination({
    data: theme.news,
    itemsPerPage: 4,
  });

  const {
    verifyData,
    memberData,
    lifetimePrice,
    yearPrice,
    monthPrice,
    quarterPrice,
    isLoading,
    isError,
  } = useClubData({
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
    lifetimePrice && {
      title: "Lifetime Member",
      price: `${lifetimePrice} ETH`,
      type: "lifetime",
      icon: theme.lifeTimeImg,
    },
    monthPrice && {
      title: "Monthly Member",
      price: `${monthPrice} ETH`,
      type: "month",
      icon: theme.monthImg,
    },
    quarterPrice && {
      title: "Yearly Member",
      price: `${quarterPrice} ETH`,
      type: "quarter",
      icon: theme.quarterImg,
    },
    yearPrice && {
      title: "Yearly Member",
      price: `${yearPrice} ETH`,
      type: "year",
      icon: theme.yearImg,
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
            backgroundImage: `url("https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=mobile%20app%20interface%20with%20golden%20coins%20floating%20cryptocurrency%20trading%20app%20blue%20gradient%20background%20modern%20ui%20design&image_size=portrait_4_3")`,
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
      <div className="absolute top-48 right-0 w-[223px] h-[343px] bg-white border-2 border-black rounded-[40px] shadow-[0_10px_0_rgba(0,0,0,0.25)]"></div>
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
            <h1 className="text-base font-semibold mb-2.5 tracking-wide">
              {club}.WEB3.CLUB
            </h1>
            <div className="border-b-2 border-black pb-2.5">
              <h2 className="text-[59px] font-bold leading-[65px] uppercase font-['Poller_One'] mb-2.5">
                {theme.heroTitle}
              </h2>
            </div>
            <h2 className="text-[59px] font-bold leading-[65px] uppercase font-['Poller_One']">
              {theme.heroGradientText}
            </h2>
          </div>

          {/* Description */}
          <div className="mb-13 space-y-5">
            <p className="text-xl leading-[26px] text-gray-700 font-medium">
              {theme.clubIntroduction1}
            </p>
            <p className="text-xl leading-[26px] text-gray-700 font-medium">
              {theme.clubIntroduction2}
            </p>
          </div>

          {/* Connect Button */}
          <div className="inline-block mt-6">
            <ConnectButton className="bg-black text-white rounded-[16px] hover:bg-gray-800" />
          </div>
        </div>

        {/* Right Content - Mobile Phone */}
        <div className="flex-shrink-0">
          <MobilePhone />
        </div>
      </div>

      {/* Join the Option Section */}
      {membershipOptions?.length ? (
        <div className="px-10 py-10">
          <div className="text-center mb-10">
            <h2 className="text-[32px] font-bold uppercase font-['Poller_One'] text-black">
              JOIN THE OPTION
            </h2>
          </div>

          <div className="bg-[#252525] rounded-[50px] shadow-[0_10px_0_rgba(0,0,0,0.25)] p-16">
            <div className="grid grid-cols-3 gap-[118px]">
              {membershipOptions.length > 0
                ? membershipOptions.map((option, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col items-start space-y-2.5"
                      >
                        <div className="flex flex-col items-start space-y-3 mb-2.5">
                          <img
                            src={option.icon}
                            alt={option.title}
                            className="w-[70px] h-[70px] object-contain"
                          />
                          <h3 className="text-[32px] font-extrabold text-white font-['Avenir']">
                            {option.title}
                          </h3>
                        </div>
                        <p className="text-2xl text-white font-['Avenir'] mb-2.5">
                          {option.price}
                        </p>
                        <button
                          onClick={() => handleJoin(option.type)}
                          className="bg-[#f49f00] text-black px-6 py-4 rounded-2xl text-base font-medium uppercase w-[185px] h-[43px] flex items-center justify-center backdrop-blur-sm"
                        >
                          Join now
                        </button>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      ) : null}

      {/* Position Verification Section */}
      {verifyData?.length ? (
        <div className="px-10 py-10">
          <div className="text-center mb-10">
            <div className="border-b-2 border-black pb-2 inline-block">
              <h2 className="text-[32px] font-bold uppercase font-['Poller_One'] text-black">
                POSITION VERIFICATION
              </h2>
            </div>
          </div>

          <div className="bg-white/70 border border-gray-800 rounded-[40px] shadow-[0_10px_0_rgba(0,0,0,0.25)] p-10">
            <div
              className={`grid gap-20 ${
                verifyData.length === 1
                  ? "grid-cols-1 justify-center"
                  : verifyData.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-3"
              }`}
            >
              {verifyData.map((it, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-15 h-15 flex items-center justify-center">
                    <img
                      src={theme?.verifyImgs?.[index] || theme?.verifyImgs?.[0] || "/aave.png"}
                      alt={it.chainName}
                      className="w-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-extrabold text-black font-['Avenir'] leading-[26px]">
                      {it.chainName} Chain
                    </h3>
                    <p className="text-xs font-medium text-black/80 font-['Avenir']">
                      Hold {it.tokenSymbol} ≥{" "}
                      {formatUnits(it.threshold, it.decimals)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleVerify(it)}
                    className="w-10 h-10 bg-gray-300 rounded-[50px] hover:bg-gray-400 transition-colors"
                  ></button>
                </div>
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
      ) : null}

      {/* Links & Apps Section */}
      <div className="px-15 py-10">
        <div className="text-center mb-7.5">
          <div className="border-b-2 border-black pb-2 inline-block">
            <h2 className="text-[32px] font-bold uppercase font-['Poller_One'] text-black">
              Links & APPS
            </h2>
          </div>
        </div>

        <div className="bg-white/70 border border-black rounded-[40px] shadow-[0_10px_0_rgba(0,0,0,0.25)] p-15 mt-6">
          <div
            className={`grid gap-2.5 ${
              theme.socials.length <= 3
                ? "grid-cols-3"
                : theme.socials.length <= 4
                ? "grid-cols-4"
                : theme.socials.length <= 5
                ? "grid-cols-5"
                : "grid-cols-6"
            }`}
          >
            {theme.socials.map((app, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-5 rounded-xl"
              >
                <div className="w-[74px] h-[74px] flex items-center justify-center p-2">
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="w-full h-full rounded-full"
                  />
                </div>
                <div className="flex flex-col items-center space-y-2.5">
                  <span className="text-xl font-medium text-gray-700 font-['Lato']">
                    {app.name}
                  </span>
                  <button
                    onClick={() => {
                      window.open(app.link, "_blank");
                    }}
                    className="bg-black text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    {app.text}
                  </button>
                </div>
              </div>
            ))}
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
              <div
                key={index}
                onClick={() => {
                  window.open(news.link, "_blank");
                }}
                className="flex items-start cursor-pointer space-x-4 p-5 text-black hover:bg-[#000] hover:text-white rounded-[2.5rem] border-1 border-solid border-[#000] bg-[rgba(255,255,255,0.70)] shadow-[0_0.625rem_0_0_rgba(0,0,0,0.25)]"
              >
                <img
                  src={news.image}
                  alt="News thumbnail"
                  className="w-[71px] h-[71px] rounded object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium mb-1">
                    {news.title || "Weekly Alpha Information Summary"}
                  </h3>
                  <p className="text-sm">
                    {news.source || "Source: Twitter Alpha"}
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
                    ? "bg-black text-white"
                    : "bg-transparent text-black border border-black"
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
          <div className="flex p-5 justify-center items-center gap-3 rounded-[2.5rem] border-1 border-solid border-[#000] bg-[#FFBD42] shadow-[0_0.3125rem_0_0_rgba(255,92,22,0.50)]">
            <Heart className="w-6 h-6 fill-black stroke-black" />
            <span className="text-[#000] lining-nums tabular-nums font-[Inter] text-4 font-not-italic font-700 lh-normal">
              {club}.web3.club
            </span>
          </div>
          <p className="text-sm">
            <span className="text-white">Powered by </span>
            <span className="text-[#ffbd42] underline font-medium">
              Web3.Club
            </span>
            <span className="text-white"> and </span>
            <span className="text-[#ffbd42] underline  font-medium">
              OrbitLink.Me
            </span>
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

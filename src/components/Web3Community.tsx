import React, { useState } from "react";
import { ConnectButton } from "./ConnectButton";
import { useWeb3ClubService } from "./AppkitProvider";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";
import { parseSearchParams, parseSubdomain } from "@/lib/utils";

const newsData = [
  {
    image: "/news1.png",
    title: "Weekly Alpha Information Summary",
    category: "designer",
    time: "now",
    source: "Twitter Alpha",
    link: "",
  },
  {
    image: "/news2.png",
    title: "Complete DeFi Beginner's Guide",
    category: "designer",
    time: "2015",
    source: "Twitter Alpha",
    link: "",
  },
  {
    image: "/news3.png",
    title: "Latest Project Research Report Analysis",
    category: "designer",
    time: "2011",
    source: "Twitter Alpha",
    link: "",
  },
  {
    image: "/news4.png",
    title: "Market Trend Analysis Report",
    category: "designer",
    time: "2010",
    source: "Twitter Alpha",
    link: "",
  },
];

const Web3CommunityResponsive: React.FC = () => {
  const web3ClubService = useWeb3ClubService();
  const { address } = useAccount();
  const search = parseSearchParams(window.location.href) as any;
  const domainName = search.club || parseSubdomain(window.location.host);
  const [club] = useState(domainName);

  const { data: yearPrice } = useQuery({
    queryKey: ["clubYearPrice", domainName],
    queryFn: () =>
      web3ClubService.temporaryMembershipClient.getClubYearPrice(domainName),
  });

  const { data: monthPrice } = useQuery({
    queryKey: ["clubMonthPrice", domainName],
    queryFn: () =>
      web3ClubService.temporaryMembershipClient.getClubPrice(domainName),
  });

  const { data: verifyData } = useQuery({
    queryKey: ["clubCrossChainRequirements", domainName],
    queryFn: () =>
      web3ClubService.tokenBasedAccessClient.getTokenGates(domainName),
  });

  console.log(yearPrice, "year");
  console.log(monthPrice, verifyData, "month");

  const handleJoin = async (type: string) => {
    try {
      if (type === "lifetime") {
        await web3ClubService.clubPassFactoryClient.purchaseMembershipFor(
          domainName
        );
      } else if (type === "month") {
        await web3ClubService.temporaryMembershipClient.purchaseMembership(
          domainName,
          monthPrice || "0"
        );
      } else if (type === "year") {
        await web3ClubService.temporaryMembershipClient.purchaseYearMembership(
          domainName,
          yearPrice || "0"
        );
      }
      toast.success("Purchase successful");
    } catch (error) {
      toast.error(error.message || "Purchase failed");
    }
  };

  const handleVerify = async (it: any) => {
    try {
      await web3ClubService.simpleCrossChainVerificationClient.requestVerification(
        domainName,
        it.chainId,
        it.crossChainAddress
      );
      toast.success("Verification successful");
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Verification failed");
    }
  };
  return (
    <div className="flex flex-col items-center bg-[#0b0b0d] pb-24 w-full min-h-screen overflow-hidden gap-2.5">
      {/* Header */}
      <div
        className="w-full px-5 py-5 text-center text-sm font-bold text-white tracking-wider 
                      lg:flex lg:justify-between lg:items-center lg:px-20 lg:py-5 lg:min-w-[1080px] lg:text-left"
      >
        <p className="lg:flex-grow">{club}.web3.club</p>
        <ConnectButton className="hidden md:inline-flex" />
      </div>

      {/* Hero Section */}
      <div
        className="flex flex-col items-center w-full px-5 py-10 gap-5 
                      lg:relative lg:flex-row lg:justify-between lg:items-end lg:px-20 lg:py-20 lg:min-w-[1080px] lg:mx-auto"
      >
        {/* Desktop Background Image */}
        <img
          src="/hero.png"
          alt="Hero Background"
          className="hidden lg:block lg:absolute lg:top-0 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:w-auto lg:h-full lg:z-0"
        />

        {/* Mobile/Tablet Hero Content */}
        <div className="flex flex-col items-center gap-5 lg:hidden">
          <h1 className="text-white text-2xl md:text-3xl font-bold text-center leading-9 md:leading-10 tracking-wider uppercase">
            Eternal <br />
            Profit Community
          </h1>
          <img
            src="/hero.png"
            alt="Community Logo"
            className="w-64 md:w-80 h-auto"
          />
          <p className="text-white text-sm md:text-base tracking-wider">
            Fun with us
          </p>
          <p className="text-white text-sm md:text-base leading-4 md:leading-5 tracking-wider text-center max-w-sm md:max-w-md">
            Welcome to the Eternal Profit Community!We are a professional
            community focused on blockchain technology innovation and DeFi
            investment. <br />
            <br />
            Here, you will gain access to the most cutting-edge Alpha
            information, professional investment advice, and a wealth of
            learning resources.
          </p>
          <ConnectButton className="md:hidden inline-flex" />
        </div>

        {/* Desktop Hero Content */}
        <div className="hidden lg:flex lg:flex-col lg:items-start lg:z-10 lg:relative">
          <h1 className="text-white text-5xl xl:text-6xl font-bold leading-12 xl:leading-14 tracking-wider uppercase mb-4">
            Eternal <br />
            Profit <br />
            Community
          </h1>
          <p className="text-white text-lg tracking-wider mb-8">Fun with us</p>
        </div>

        <div className="hidden lg:block lg:z-10 lg:relative md:w-[250px]">
          <p className="text-white text-base xl:text-[14px] leading-6 xl:leading-7 tracking-wider">
            Welcome to the Eternal Profit Community!We are a professional
            community focused on blockchain technology innovation and DeFi
            investment. <br />
            <br />
            Here, you will gain access to the most cutting-edge Alpha
            information, professional investment advice, and a wealth of
            learning resources.
          </p>
        </div>
      </div>

      {/* Scrolling Banner */}
      <div className="relative w-full overflow-hidden h-[130px]">
        <div className="absolute inline-flex items-center justify-center gap-5 bg-white px-5 py-2.5 w-[1500px] h-[44px] left-[1px] top-[39px] rotate-[-3deg] whitespace-nowrap">
          {Array.from({ length: 8 }, (_, i) => (
            <React.Fragment key={i}>
              <img
                src={`/${
                  [
                    "cat_fill",
                    "cursor_3_fill",
                    "cat_fill",
                    "cursor_3_fill",
                    "cat_fill",
                    "cursor_3_fill",
                    "cat_fill",
                    "cursor_3_fill",
                  ][i]
                }.png`}
                alt="Logo"
                className="w-6 h-6 flex-shrink-0"
              />
              <span className="flex-shrink-0 text-black text-[14px] leading-[14px] tracking-[0.28px] font-bold uppercase">
                abc.web3.club
              </span>
            </React.Fragment>
          ))}
        </div>
        <div className="absolute inline-flex items-center justify-center gap-5 bg-[#bcf045] px-5 py-2.5 w-[1500px] h-[44px] left-[1px] top-[47px] rotate-[3deg] whitespace-nowrap">
          {Array.from({ length: 8 }, (_, i) => (
            <React.Fragment key={i}>
              <img
                src={`/${
                  [
                    "cat_fill",
                    "cursor_3_fill",
                    "cat_fill",
                    "cursor_3_fill",
                    "cat_fill",
                    "cursor_3_fill",
                    "cat_fill",
                    "cursor_3_fill",
                  ][i]
                }.png`}
                alt="Logo"
                className="w-6 h-6 flex-shrink-0"
              />
              <span className="flex-shrink-0 text-black text-[14px] leading-[14px] tracking-[0.28px] font-bold uppercase">
                abc.web3.club
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full gap-12 px-4 md:px-8 lg:px-20 lg:gap-16 lg:max-w-[1080px] lg:mx-auto">
        {/* Join Options Section */}
        <div className="flex flex-col items-center gap-12 lg:gap-16">
          <div className="flex flex-col gap-2.5 w-full">
            <p className="text-white text-sm md:text-base lg:text-lg text-center tracking-wider">
              meta text
            </p>
            <h2 className="text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center leading-5 md:leading-6 lg:leading-8 xl:leading-10 tracking-wider uppercase">
              Join the Option
            </h2>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="flex flex-col md:flex-row items-center md:justify-between gap-5 w-full">
            {[
              {
                icon: "/lifetime.png",
                title: "Lifetime Member",
                price: "5.0 ETH",
                type: "lifetime",
              },
              {
                icon: "/month.png",
                title: "Monthly Member",
                price: `${monthPrice} ETH`,
                type: "month",
              },
              {
                icon: "/year.png",
                title: "Yearly Member",
                price: `${yearPrice} ETH`,
                type: "year",
              },
            ].map((option, index) => (
              <React.Fragment key={index}>
                <div className="flex items-center gap-5 px-6 md:px-0">
                  <img
                    src={option.icon}
                    alt="Membership"
                    className="w-12 h-12 md:size-20 rounded-full"
                  />
                  <div className="flex flex-row md:flex-col items-center md:gap-5">
                    <div className="flex-1 flex flex-col gap-2.5">
                      <p className="text-[#bfea52] text-[12px] uppercase tracking-wider">
                        {option.title}
                      </p>
                      <p className="text-[#bfea52] text-[20px] font-bold uppercase tracking-wider">
                        {option.price}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        handleJoin(option.type);
                      }}
                      className="flex items-center justify-center gap-2.5 bg-[#bfea52] text-black text-sm md:text-base font-bold uppercase tracking-wider rounded-[20px] pl-[15px] pr-[5px] py-1 hover:bg-[#a8d142] transition-colors"
                    >
                      Join now
                      <img
                        src={"/arrow_right_circle_fill.png"}
                        alt="Arrow"
                        className="w-6 h-6 md:w-7 md:h-7"
                      />
                    </button>
                  </div>
                </div>
                {index < 2 && (
                  <div className="w-px h-20 bg-gray-600 hidden md:block"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Position Verification Section */}
        <div className="flex flex-col items-center gap-12 lg:gap-16">
          <div className="flex flex-col gap-2.5 w-full">
            <p className="text-white text-sm md:text-base lg:text-lg text-center tracking-wider">
              meta text
            </p>
            <h2 className="text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center leading-5 md:leading-6 lg:leading-8 xl:leading-10 tracking-wider uppercase">
              Position Verification
            </h2>
          </div>

          {/* Frame 9 - 三链验证：按 Figma 文案与结构实现，使用当前图片资源且不加白色圆底 */}
          <div className="w-full max-w-[1080px] mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center gap-6 md:gap-[50px]">
            {/* ETH Chain */}
            {verifyData?.map((it, index) => {
              return (
                <React.Fragment key={index}>
                  <div className="flex items-center gap-6">
                    <img
                      src="/aave.png"
                      alt="ETH Chain"
                      className="size-[50px] md:size-20"
                    />
                    <div className="flex flex-row items-center md:flex-col md:items-start gap-2.5 flex-1">
                      <div className="flex flex-col gap-1">
                        <p className="text-white text-[14px] font-bold leading-[26px]">
                          {it.chainName} Chain
                        </p>
                        <p className="text-white/80 text-xs font-medium">
                          Hold {it.tokenSymbol} ≥{" "}
                          {formatUnits(it.threshold, it.decimals)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleVerify(it)}
                        className="inline-flex items-center justify-center gap-2.5 rounded-[20px] bg-[#bfea52] pl-[15px] pr-[5px] py-[5px] w-fit"
                      >
                        <span className="text-black text-[14px] leading-[14px] tracking-[0.28px] font-bold uppercase">
                          VERIFY
                        </span>
                        {/* 内联箭头图标 */}
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="12" cy="12" r="12" fill="white" />
                          <path
                            d="M10 7l5 5-5 5"
                            stroke="#000"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  {index < verifyData?.length - 1 && (
                    <div className="hidden lg:block w-px h-[100px] bg-white/60" />
                  )}
                </React.Fragment>
              );
            })}

            {/* <div className="flex items-center gap-10 flex-1">
              <img
                src="/bnb.png"
                alt="BNB Chain"
                className="size-[50px] md:size-20"
              />
              <div className="flex flex-row md:flex-col items-center gap-2.5 flex-1">
                <div className="flex flex-col gap-1">
                  <p className="text-white text-[14px] font-bold leading-[26px]">
                    BNB Chain
                  </p>
                  <p className="text-white/80 text-xs font-medium">
                    Hold BNB ≥ 10
                  </p>
                </div>
                <button className="inline-flex items-center justify-center gap-2.5 rounded-[20px] bg-[#bfea52] pl-[15px] pr-[5px] py-[5px] w-fit">
                  <span className="text-black text-[14px] leading-[14px] tracking-[0.28px] font-bold uppercase">
                    VERIFY
                  </span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="12" fill="white" />
                    <path
                      d="M10 7l5 5-5 5"
                      stroke="#000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            
            <div className="hidden lg:block w-px h-[100px] bg-white/60" />

            
            <div className="flex items-center gap-10 flex-1">
              <img
                src="/polygon.png"
                alt="Polygon Chain"
                className="size-[50px] md:size-20"
              />
              <div className="flex flex-row md:flex-col items-center gap-2.5 flex-1">
                <div className="flex flex-col gap-1">
                  <p className="text-white text-[14px] font-bold leading-[26px]">
                    Polygon Chain
                  </p>
                  <p className="text-white/80 text-xs font-medium">
                    Hold MATIC ≥ 1000
                  </p>
                </div>
                <button className="inline-flex items-center justify-center gap-2.5 rounded-[20px] bg-[#bfea52] pl-[15px] pr-[5px] py-[5px] w-fit">
                  <span className="text-black text-[14px] leading-[14px] tracking-[0.28px] font-bold uppercase">
                    VERIFY
                  </span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="12" fill="white" />
                    <path
                      d="M10 7l5 5-5 5"
                      stroke="#000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div> */}
          </div>
        </div>

        {/* Links & Apps Section */}
        <div className="flex flex-col items-center gap-12 lg:gap-16">
          <div className="flex flex-col gap-2.5 w-full">
            <p className="text-white text-sm md:text-base lg:text-lg text-center tracking-wider">
              meta text
            </p>
            <h2 className="text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center leading-5 md:leading-6 lg:leading-8 xl:leading-10 tracking-wider uppercase">
              Links & Apps
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-4 w-full lg:grid-cols-6 lg:gap-2.5 px-4 lg:px-16">
            {[
              {
                icon: "/telegram.png",
                name: "Telegram",
                action: "Join",
                bgColor: "bg-[#3088ff]",
                buttonColor: "bg-[#bfea52]",
                iconPadding: "p-4",
              },
              {
                icon: "/twitter.png",
                name: "Twitter/X",
                action: "Follow",
                bgColor: "bg-[#6aabe9]",
                buttonColor: "bg-[#bfea52]",
                iconPadding: "p-[22px]",
              },
              {
                icon: "/discord.png",
                name: "Discord",
                action: "Join",
                bgColor: "bg-[#778cd3]",
                buttonColor: "bg-[#bfea52]",
                iconPadding: "p-4",
              },
              {
                icon: "/youtube.png",
                name: "YouTube",
                action: "Subscribe",
                bgColor: "bg-[#eb3323]",
                buttonColor: "bg-[#bfea52]",
                iconPadding: "p-[22px]",
              },
              {
                icon: "/cluber.png",
                name: "OnlyCluber",
                action: "Open",
                bgColor: "bg-[#04231e]",
                buttonColor: "bg-[#bfea52]",
                iconPadding: "p-4",
              },
              {
                icon: "/clubbot.png",
                name: "ClubBot",
                action: "Mint",
                bgColor: "bg-[#01cd88]",
                buttonColor: "bg-[#bfea52]",
                iconPadding: "p-4",
              },
            ].map((app, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center px-[20px] py-[30px] gap-5 lg:px-[20px] lg:py-[30px] lg:gap-6 rounded-2xl"
              >
                <div
                  className={`flex items-center justify-center w-16 h-16 rounded-2xl ${app.bgColor} ${app.iconPadding}`}
                >
                  <img src={app.icon} alt={app.name} className="w-8 h-auto" />
                </div>
                <div className="flex flex-col items-center gap-2.5 lg:gap-3">
                  <p className="text-white text-base md:text-lg lg:text-xl font-bold">
                    {app.name}
                  </p>
                  <button
                    className={`${app.buttonColor} text-black text-sm md:text-base lg:text-lg font-medium rounded-2xl px-5 py-2 lg:px-6 lg:py-3 hover:opacity-90 transition-opacity`}
                  >
                    {app.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community News Section */}
        <div className="flex flex-col items-center gap-12 lg:gap-16">
          <div className="flex flex-col gap-2.5 w-full">
            <p className="text-white text-sm md:text-base lg:text-lg text-center tracking-wider">
              meta text
            </p>
            <h2 className="text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-center leading-5 md:leading-6 lg:leading-8 xl:leading-10 tracking-wider uppercase">
              Community News
            </h2>
          </div>

          <div className="flex flex-col w-full px-5 gap-8 lg:gap-10 lg:px-0">
            {newsData.map((news, index) => (
              <div
                key={index}
                className="flex flex-col py-5 md:flex-row md: justify-between w-fll gap-6 border-b border-white/40"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full md:w-[200px] md:h-24 object-cover rounded-lg"
                  />
                  <div className="flex gap-4 justify-between md:justify-start text-white text-[20px] font-bold">
                    <div className="flex gap-4">
                      <div className="uppercase ">{news.time}</div>
                      <div>/</div>
                    </div>

                    <img
                      className="size-6 block md:hidden"
                      src="/arrow_right_up_circle_fill.png"
                      alt=""
                      onClick={() => window.open(news.link, "_blank")}
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1 md:gap-[30px]">
                    <div className="flex flex-col gap-2">
                      <p className="text-white text-[14px] uppercase tracking-wider">
                        {news.category}
                      </p>
                      <p className="text-white text-[20px] font-bold">
                        {news.title}
                      </p>
                    </div>
                    <p className="text-white text-[14px] uppercase tracking-wider">
                      Source: {news.source}
                    </p>
                  </div>
                </div>
                <div className="hidden md:block">
                  <img
                    className="size-6"
                    src="/arrow_right_up_circle_fill.png"
                    alt=""
                    onClick={() => window.open(news.link, "_blank")}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-2 px-5 py-8">
        {[1, 2, 3, 4, 5].map((num) => (
          <React.Fragment key={num}>
            <span className="text-white text-sm">{num}</span>
            {num < 5 && <div className="w-1 h-1 bg-white rounded-full" />}
          </React.Fragment>
        ))}
        <span className="text-white text-sm ml-2">&gt;</span>
      </div>

      {/* Bottom Scrolling Banner */}
      <div className="relative w-full overflow-hidden h-[130px]">
        <div className="absolute inline-flex items-center justify-center gap-5 bg-white px-5 py-2.5 w-[1500px] h-[44px] left-[1px] top-[39px] rotate-[-3deg] whitespace-nowrap">
          {Array.from({ length: 8 }, (_, i) => (
            <React.Fragment key={i}>
              <img
                src={`/${
                  [
                    "cat_fill",
                    "cursor_3_fill",
                    "cat_fill",
                    "cursor_3_fill",
                    "cat_fill",
                    "cursor_3_fill",
                    "cat_fill",
                    "cursor_3_fill",
                  ][i]
                }.png`}
                alt="Logo"
                className="w-6 h-6 flex-shrink-0"
              />
              <span className="flex-shrink-0 text-black text-[14px] leading-[14px] tracking-[0.28px] font-bold uppercase">
                abc.web3.club
              </span>
            </React.Fragment>
          ))}
        </div>
        <div className="absolute inline-flex items-center justify-center gap-5 bg-[#bcf045] px-5 py-2.5 w-[1500px] h-[44px] left-[1px] top-[47px] rotate-[3deg] whitespace-nowrap">
          {Array.from({ length: 8 }, (_, i) => (
            <React.Fragment key={i}>
              <img
                src={`/${
                  [
                    "cat_fill",
                    "cursor_3_fill",
                    "cat_fill",
                    "cursor_3_fill",
                    "cat_fill",
                    "cursor_3_fill",
                    "cat_fill",
                    "cursor_3_fill",
                  ][i]
                }.png`}
                alt="Logo"
                className="w-6 h-6 flex-shrink-0"
              />
              <span className="flex-shrink-0 text-black text-[14px] leading-[14px] tracking-[0.28px] font-bold uppercase">
                abc.web3.club
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full px-5 py-5 lg:px-20 lg:py-5 lg:max-w-[1080px] lg:mx-auto flex items-center md:justify-between justify-center gap-5 flex-wrap">
        <div className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#bfea52] px-4 py-1.5">
          <p className="text-black text-sm font-bold uppercase tracking-wider">
            {club}.WEB3.CLUB
          </p>
          <img src="/arrow.png" className="w-6 h-6" alt="Arrow" />
        </div>
        <p className="text-white text-xs md:text-sm text-right">
          <span className="text-white/80">Powered by </span>
          <a
            href="https://web3.club"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#bfea52] underline"
          >
            Web3.Club
          </a>
          <span className="text-white/80"> and </span>
          <a
            href="https://orbitlink.me"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#bfea52] underline"
          >
            OrbitLink.Me
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Web3CommunityResponsive;

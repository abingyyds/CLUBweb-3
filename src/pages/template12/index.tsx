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
import "@fontsource/jersey-25";
import { ArrowRight } from "lucide-react";

const Template12: React.FC<{ theme?: ITheme; club: string }> = ({
  theme,
  club,
}) => {
  const { address } = useAccount();
  const domainName = club;
  const newsData = theme?.news || [];

  const {
    currentPage,
    totalPages,
    currentData: currentNewsData,
    handlePageChange,
  } = usePagination({
    data: newsData,
    itemsPerPage: 4,
  });

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

  const membershipOptions = [
    lifetimePrice && {
      icon: theme?.lifeTimeImg,
      title: "Lifetime Member",
      text: theme?.lifeTimeText,
      price: `${lifetimePrice} ETH`,
      type: "lifetime",
    },
    monthPrice && {
      icon: theme?.monthImg,
      text: theme?.monthText,
      title: "Monthly Membership",
      price: `${monthPrice} ETH`,
      type: "month",
    },
    quarterPrice && {
      icon: theme?.quarterImg,
      text: theme?.quarterText,
      title: "Quarterly Membership",
      price: `${quarterPrice} ETH`,
      type: "quarter",
    },
    yearPrice && {
      icon: theme?.yearImg,
      text: theme?.yearText,
      title: "Yearly Membership",
      price: `${yearPrice} ETH`,
      type: "year",
    },
  ].filter(Boolean) as Array<{
    icon?: string;
    title: string;
    price: string;
    type: string;
    text?: string;
  }>;

  const sectionAImg = [
    "/SectionA.png",
    "/SectionB.png",
    "/SectionC.png",
    "/SectionD.png",
  ];

  return (
    <div className="flex flex-col items-center bg-white w-full min-h-screen overflow-hidden">
      <MemberModal
        open={modalOpen}
        setOpen={setModalOpen}
        data={memberData}
        onConfirm={handleConfirmJoin}
        isVerifyMode={isVerifyMode}
      />

      <div className="w-full flex items-center justify-between px-6 py-3 bg-[#ff3b3b]">
        <p className="text-white text-xs font-bold tracking-wide uppercase">
          {domainName}.WEB3.CLUB
        </p>
        <ConnectButton className="hidden md:flex px-[11px] py-1.5 items-start gap-2.5 rounded-[0.3125rem] !bg-[#FB3] shadow-[0_0.020375rem_0.0458125rem_0_rgba(0,0,0,0.12),0_0.0963125rem_0.1791875rem_0_rgba(0,0,0,0.07),0_0.25rem_0.5625rem_0_rgba(0,0,0,0.05)]" />
      </div>

      <div className="w-full flex flex-col items-center gap-0 bg-gradient-to-br from-[#fefefe] to-[#eef7ff]">
        <div className=" w-full bg-[url('/FrameBg.png')] bg-cover bg-center grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
          <div className="w-full relative px-15 py-15 flex flex-col">
            <div className="relative">
              <img
                src={theme.heroImg}
                alt="Hero"
                className="w-[400px] h-full object-cover rounded-xl"
              />
              <img
                src="/great 1.png"
                alt="Hero"
                className="absolute top-0 md:top-[-42px] left-[210px] size-[90px] md:size-[200px] object-cover rounded-xl"
              />
              <img
                src={theme.avatar1}
                alt="Hero"
                className="absolute top-[220px] left-[210px] size-[100px] md:size-[160px] object-cover rounded-xl"
              />
            </div>
          </div>
          <div className="flex flex-col items-center md:items-start gap-4 pb-10 md:pb-0">
            <h1 className="text-black text-center text-4xl md:text-5xl font-extrabold uppercase leading-tight">
              {theme.heroTitle}
            </h1>
            <div>
              <ConnectButton className="flex h-[52px] text-[36px] py-[6px] pl-[16px] pr-2.5 justify-center items-center gap-5 rounded-[3.75rem] !bg-[#FFBB33] shadow-[0_0.625rem_0_0_rgba(0,0,0,0.25)]" />
            </div>
          </div>
        </div>

        <div className="flex z-[10] md:mt-[-90px] w-full bg-[url('/FrameRed.png')] bg-cover bg-center rounded-none pt-15 pb-15">
          <div className="mx-auto flex gap-6 flex-col md:flex-row  max-w-[980px] px-6">
            {[theme?.clubIntroduction1, theme?.clubIntroduction2].map(
              (txt, i) => (
                <div
                  key={i}
                  className="flex flex-col w-full md:flex-row items-center gap-4 bg-white rounded-lg shadow p-3 md:p-5"
                >
                  <img
                    src={i === 0 ? theme?.clubIcon1 : theme?.clubIcon2}
                    className="w-full md:w-20 h-[90px] md:h-28 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-[#333] text-sm">{txt}</p>
                    <button
                      className="text-[#ff3b3b] text-sm font-semibold mt-2"
                      onClick={() => {
                        window.open(
                          i === 0 ? theme?.clubLink1 : theme?.clubLink2,
                          "_blank"
                        );
                      }}
                    >
                      View more →
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {theme?.showMemberOption ? (
        <div className="w-full max-w-[1180px] px-5 md:px-10 py-12">
          <div className="w-full bg-cover bg-center text-white text-center font-extrabold uppercase tracking-wider rounded-md py-3">
            <img
              src="/join12.png"
              className="w-full h-auto mt-[-15px] inline-block mr-2"
            />
          </div>
          <div className="mt-8 flex flex-wrap justify-center items-center gap-6">
            {membershipOptions.map((opt, i) => (
              <div
                key={opt.title}
                className="bg-cover bg-top flex flex-col justify-between items-center gap-3 p-4 md:p-6 w-[152px] md:w-[218px] h-[220px] md:h-[330px]"
                style={{
                  backgroundImage: `url(${
                    sectionAImg[i % sectionAImg.length]
                  })`,
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                }}
              >
                <div>
                  <p className="font-jersey-25 self-stretch text-[#050505] text-[18px]/[20px] md:text-[32px]/[30px] font-not-italic">
                    {opt.title}
                  </p>
                  <div>
                    <p className="text-[#050505] text-[12px] md:text-[13px]">
                      {opt.text}
                    </p>
                  </div>
                </div>
                <div className="w-full">
                  <p className="flex h-10 flex-col justify-center self-stretch text-[#050505] text-[20px] md:text-[40px] font-not-italic  font-jersey-25">
                    {opt.price}
                  </p>
                  <button
                    className="w-[108px] md:w-[158px] flex px-0.5 py-1.5 justify-center items-center gap-2.5 self-stretch rounded-[0.3125rem] border-1 border-solid border-[rgba(0,0,0,0.10)] bg-[#FFF] shadow-[0_0.25rem_0_0_rgba(0,0,0,0.10)]"
                    onClick={() => handleJoin(opt.type)}
                  >
                    Get started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {verifyData?.length ? (
        <div className="w-full max-w-[1180px] px-5 md:px-10 py-12">
          <div className="relative w-full bg-[url('/BBgr.png')] bg-cover bg-center text-white text-center font-extrabold uppercase tracking-wider rounded-md py-3">
            {/* <img
              src="/GoImg.png"
              className="absolute top-[-30px] left-[15%] w-[140px] h-auto mt-[-15px] inline-block mr-2"
            /> */}
            <img
              src="/position12.png"
              className="w-full h-auto mt-[-15px] inline-block mr-2"
            />
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {verifyData.map((it, idx) => (
              <div key={idx} className="flex flex-col gap-3">
                <div className="flex p-5 flex-col items-center gap-2.5 self-stretch bg-[#FEE46B]">
                  <img
                    src={
                      theme?.verifyImgs?.[idx] ||
                      theme?.verifyImgs?.[0] ||
                      "/aave.png"
                    }
                    className="w-auto h-10"
                  />
                </div>
                <p className="flex h-6 flex-col justify-center self-stretch text-[#050505] font-jersey-25 text-[28px] font-not-italic tracking--0.0325">
                  {it.chainName} Chain
                </p>
                <p className="self-stretch text-[#121212] font-[Inter] text-[16px] font-not-italic font-400 lh-5.75 tracking-0.002">
                  Hold {it.tokenSymbol} ≥{" "}
                  {formatUnits(it.threshold, it.decimals)}
                </p>
                <button
                  className="text-[#960] flex gap-2 items-center font-[Inter] text-[16px] font-not-italic font-400 lh-6"
                  onClick={() => handleVerify(it)}
                >
                  Verify
                  <ArrowRight />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="w-full max-w-[1180px] px-5 md:px-10 py-12">
        <div className="w-full bg-cover bg-center text-white text-center font-extrabold uppercase tracking-wider rounded-md py-3">
          <img
            src="/app12.png"
            className="w-full h-auto mt-[-15px] inline-block mr-2"
          />
        </div>
        <div className="mt-8 flex justify-center items-center flex-wrap gap-6">
          {theme?.socials?.map((app, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 px-5 py-[30px] w-[122px] md:w-[180px]"
            >
              <img src={app.icon} className="w-10 h-10" />
              <p className="text-[#333] font-jersey-25 text-5.5 font-not-italic font-400 lh-normal">
                {app.name}
              </p>
              <button
                className="text-black text-[14px] flex px-5 py-2 justify-center items-center gap-2.5 rounded-[1.25rem] bg-[#FEE46B]"
                onClick={() => window.open(app.link, "_blank")}
              >
                {app.text}
              </button>
            </div>
          ))}
        </div>
      </div>

      {theme?.news && theme.news.length > 0 && (
        <div className="w-full max-w-[1180px] px-5 md:px-10 py-12">
          <div className="w-full bg-cover bg-center text-white text-center font-extrabold uppercase tracking-wider rounded-md py-3">
            <img
              src="/news12.png"
              className="w-full h-auto mt-[-15px] inline-block mr-2"
            />
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentNewsData.map((news, idx) => (
              <div
                key={idx}
                onClick={() => window.open(news.link, "_blank")}
                className="flex p-5 flex-col justify-center items-start gap-7.5 flex-[1_0_0] bg-[#F7F7F7]"
              >
                <img
                  src={news.image}
                  className="w-full h-[150px] object-cover"
                />
                <p className="self-stretch text-[#121212] font-jersey-25 mt-6 text-6 font-not-italic font-400 lh-5.75 tracking--0.003">
                  {news.title}
                </p>
                <div className="text-sm text-gray-700 flex justify-between gap-4">
                  <span>Source: {news.source}</span>
                  <span>{news.time}</span>
                </div>
              </div>
            ))}
          </div>
          {newsData.length > 4 && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                textClassName="text-[#FFF] lining-nums tabular-nums font-[Inter] text-3.5 font-not-italic font-medium"
                activeTextClassName="text-white"
                hoverTextClassName="text-white/80"
                dotClassName="opacity-0"
                bgClassName="flex w-10 px-2.5 py-2 justify-center items-center gap-2.5 rounded-[0.3125rem] bg-[#E23335]"
              />
            </div>
          )}
        </div>
      )}

      <img src="/LabiImg.png" className="w-[400px]" alt="" />

      <div className="w-full bg-[#F8F49B] px-6 py-8 flex flex-col md:flex-row items-center justify-between">
        <div className="pl-10 flex justify-center items-center">
          <img src="/pets.png" className="w-[30px] h-auto mr-2" />
          <span className="text-[#1f1f1f] text-sm font-semibold">
            {domainName}.web3.club
          </span>
        </div>
        <p className="text-[#1f1f1f] text-sm">
          <span>Powered by </span>
          <a href="https://web3.club" className="underline">
            Web3.Club
          </a>
          <span> and </span>
          <a href="https://orbitlink.me" className="underline">
            OrbitLink.Me
          </a>
        </p>
      </div>
    </div>
  );
};

export default Template12;

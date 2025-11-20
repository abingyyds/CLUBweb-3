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

const Template12: React.FC<{ theme?: ITheme; club: string }> = ({ theme, club }) => {
  const { address } = useAccount();
  const domainName = club;
  const newsData = theme?.news || [];

  const { currentPage, totalPages, currentData: currentNewsData, handlePageChange } = usePagination({
    data: newsData,
    itemsPerPage: 4,
  });

  const { lifetimePrice, yearPrice, monthPrice, quarterPrice, verifyData, memberData } = useClubData({
    domainName,
    address,
  });

  const { modalOpen, setModalOpen, isVerifyMode, handleJoin, handleVerify, handleConfirmJoin } = useClubMembership({
    domainName,
    memberData,
    yearPrice,
    monthPrice,
    quarterPrice,
  });

  const membershipOptions = [
    lifetimePrice && { icon: theme?.lifeTimeImg, title: "Lifetime Member", price: `${lifetimePrice} ETH`, type: "lifetime" },
    monthPrice && { icon: theme?.monthImg, title: "Monthly Membership", price: `${monthPrice} ETH`, type: "month" },
    quarterPrice && { icon: theme?.quarterImg, title: "Quarterly Membership", price: `${quarterPrice} ETH`, type: "quarter" },
    yearPrice && { icon: theme?.yearImg, title: "Yearly Membership", price: `${yearPrice} ETH`, type: "year" },
  ].filter(Boolean) as Array<{ icon?: string; title: string; price: string; type: string }>;

  const sectionAImg = [
    "/SectionA.png",
    "/SectionB.png",
    "/SectionC.png",
    "/SectionD.png",
  ]

  return (
    <div className="flex flex-col items-center bg-white w-full min-h-screen overflow-hidden">
      <MemberModal open={modalOpen} setOpen={setModalOpen} data={memberData} onConfirm={handleConfirmJoin} isVerifyMode={isVerifyMode} />

      <div className="w-full flex items-center justify-between px-6 py-3 bg-[#ff3b3b]">
        <p className="text-white text-xs font-bold tracking-wide uppercase">{domainName}.WEB3.CLUB</p>
        <ConnectButton className="hidden md:inline-flex" />
      </div>

      <div className="w-full flex flex-col items-center gap-0 bg-gradient-to-br from-[#fefefe] to-[#eef7ff]">
        <div className=" w-full bg-[url('/FrameBg.png')] bg-cover bg-center grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
          <div className="w-full relative px-15 py-15">
            <img src="/Rectangle 2.png" alt="Hero" className="w-[400px] h-full object-cover rounded-xl" />
            <img src="/great 1.png" alt="Hero" className="absolute top-[20px] left-[350px] w-[200px] h-[200px] object-cover rounded-xl" />
            <img src="/avatar.png" alt="Hero" className="absolute top-[330px] left-[310px] w-[160px] h-[160px] object-cover rounded-xl" />
          </div>
          <div className="flex flex-col items-start gap-4">
            <h1 className="text-black text-4xl md:text-5xl font-extrabold uppercase leading-tight">ETERNAL PROFIT COMMUNITY</h1>
            <div className="inline-flex items-center bg-[#ffce34] text-black font-semibold rounded-full px-5 py-2">
              <ConnectButton />
            </div>
          </div>
        </div>

        <div className="flex z-[99] mt-[-90px] w-full bg-[url('/FrameRed.png')] bg-cover bg-center rounded-none pt-15 pb-15">
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-0 max-w-[980px] px-6">
            {[theme?.clubIntroduction1, theme?.clubIntroduction2].map((txt, i) => (
              <div key={i} className="flex mx-6 items-center gap-4 bg-white rounded-lg shadow p-3 md:p-5">
                <img src={theme?.heroImg} className="w-20 h-28 object-cover rounded" />
                <div className="flex-1">
                  <p className="text-[#333] text-sm">{txt}</p>
                  <button className="text-[#ff3b3b] text-sm font-semibold mt-2">View more →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {theme?.showMemberOption ? (
        <div className="w-full max-w-[1180px] px-5 md:px-10 py-12">
          <div className="w-full bg-cover bg-center text-white text-center font-extrabold uppercase tracking-wider rounded-md py-3" style={{ backgroundImage: `url(${sectionAImg[0]})` }}>
            <img src="/JoinTheOption.png" className="w-full h-auto mt-[-15px] inline-block mr-2" />
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            {membershipOptions.map((opt, i) => (
              <div key={opt.title} className="bg-cover bg-top flex flex-col items-center gap-3 p-6" style={{ backgroundImage: `url(${sectionAImg[i % sectionAImg.length]})` }}>
                <img src={opt.icon || "/lifetime.png"} className="w-16 h-16 rounded-full" />
                <p className="text-black font-bold">{opt.title}</p>
                <p className="text-black text-2xl font-extrabold">{opt.price}</p>
                <button className="bg-[#ff3b3b] text-white rounded-full px-4 py-2 font-semibold" onClick={() => handleJoin(opt.type)}>Get started</button>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {verifyData?.length ? (
        <div className="w-full max-w-[1180px] px-5 md:px-10 py-12">
          <div className="relative w-full bg-[url('/BBgr.png')] bg-cover bg-center text-white text-center font-extrabold uppercase tracking-wider rounded-md py-3">
            <img src="/GoImg.png" className="absolute top-[-30px] left-[15%] w-[140px] h-auto mt-[-15px] inline-block mr-2" />
            <img src="/PositionImg.png" className="w-full h-auto mt-[-15px] inline-block mr-2" />
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {verifyData.map((it, idx) => (
              <div key={idx} className="flex flex-col gap-3 rounded-xl shadow border p-5 bg-white">
                <div className="flex items-center gap-3">
                  <img src={theme?.verifyImgs?.[idx] || theme?.verifyImgs?.[0] || "/aave.png"} className="w-10 h-10" />
                  <p className="font-bold">{it.chainName} Chain</p>
                </div>
                <p className="text-sm">Hold {it.tokenSymbol} ≥ {formatUnits(it.threshold, it.decimals)}</p>
                <button className="self-end bg-[#ffce34] text-black rounded-lg px-3 py-1 font-semibold" onClick={() => handleVerify(it)}>Verify</button>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <div className="w-full max-w-[1180px] px-5 md:px-10 py-12">
          <div className="w-full bg-cover bg-center text-white text-center font-extrabold uppercase tracking-wider rounded-md py-3" style={{ backgroundImage: `url(${sectionAImg[1]})` }}>
            <img src="/linksApp.png" className="w-full h-auto mt-[-15px] inline-block mr-2" />
          </div>        
          <div className="mt-8 grid grid-cols-2 md:grid-cols-6 gap-6">
          {theme?.socials?.map((app, i) => (
            <div key={i} className="flex flex-col items-center gap-3 rounded-xl shadow border p-5 bg-white">
              <img src={app.icon} className="w-10 h-10" />
              <p className="text-black font-semibold">{app.name}</p>
              <button className="bg-[#989b5d] text-white rounded-md px-4 py-1" onClick={() => window.open(app.link, "_blank")}>{app.text}</button>
            </div>
          ))}
        </div>
      </div>

      {theme?.news && theme.news.length > 0 && (
        <div className="w-full max-w-[1180px] px-5 md:px-10 py-12">
          <div className="w-full bg-cover bg-center text-white text-center font-extrabold uppercase tracking-wider rounded-md py-3" style={{ backgroundImage: `url(${sectionAImg[2]})` }}>
            <img src="/communityNews.png" className="w-full h-auto mt-[-15px] inline-block mr-2" />
          </div>        
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentNewsData.map((news, idx) => (
              <div key={idx} className="flex flex-col gap-3 rounded-xl shadow border p-5 bg-white">
                <img src={news.image} className="w-full h-[150px] object-cover rounded" />
                <p className="text-black font-bold">{news.title}</p>
                <div className="text-sm text-gray-700 flex justify-between">
                  <span>Source: {news.source}</span>
                  <span>{news.time}</span>
                </div>
                <button className="self-end bg-[#ff3b3b] text-white rounded-md px-4 py-1" onClick={() => window.open(news.link, "_blank")}>View more</button>
              </div>
            ))}
          </div>
          {newsData.length > 4 && (
            <div className="mt-6">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          )}
        </div>
      )}

      <img src="/LabiImg.png" className="w-[400px]" alt="" />

      <div className="w-full bg-[#F8F49B] px-6 py-8 flex items-center justify-between">
        <div className="pl-10 flex justify-center items-center">
          <img src="/pets.png" className="w-[30px] h-auto mr-2" />
          <span className="text-[#1f1f1f] text-sm font-semibold">{domainName}.web3.club</span>
        </div>
        <p className="text-[#1f1f1f] text-sm">
          <span>Powered by </span>
          <a href="https://web3.club" className="underline">Web3.Club</a>
          <span> and </span>
          <a href="https://orbitlink.me" className="underline">OrbitLink.Me</a>
        </p>
      </div>
    </div>
  );
};

export default Template12;

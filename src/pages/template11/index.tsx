import React from "react";
import { ConnectButton } from "../../components/ConnectButton";
import { useAccount } from "wagmi";
import Pagination from "../../components/Pagination";
import { ITheme } from "@/types";
import { MemberModal } from "./MemberModal";
import { usePagination } from "../../hooks/usePagination";
import { useClubData } from "../../hooks/useClubData";
import { useClubMembership } from "../../hooks/useClubMembership";
import { formatUnits } from "viem";

const Template11: React.FC<{ theme?: ITheme; club: string }> = ({
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
      price: `${lifetimePrice} ETH`,
      type: "lifetime",
    },
    monthPrice && {
      icon: theme?.monthImg,
      title: "Monthly Membership",
      price: `${monthPrice} ETH`,
      type: "month",
    },
    quarterPrice && {
      icon: theme?.quarterImg,
      title: "Quarterly Membership",
      price: `${quarterPrice} ETH`,
      type: "quarter",
    },
    yearPrice && {
      icon: theme?.yearImg,
      title: "Yearly Membership",
      price: `${yearPrice} ETH`,
      type: "year",
    },
  ].filter(Boolean) as Array<{
    icon?: string;
    title: string;
    price: string;
    type: string;
  }>;

  return (
    <div className="flex flex-col items-center bg-[#ffffff] w-full min-h-screen overflow-hidden">
      <MemberModal
        open={modalOpen}
        setOpen={setModalOpen}
        data={memberData}
        onConfirm={handleConfirmJoin}
        isVerifyMode={isVerifyMode}
      />

      <div
        className="w-full flex flex-col items-center relative"
        style={{
          backgroundImage: `url(${theme?.heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full flex items-center justify-between px-8 py-6">
          <div className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2 shadow-sm">
            <span className="text-[#333] text-xs font-semibold tracking-wide">
              {domainName.toUpperCase()}.WEB3.CLUB
            </span>
          </div>
          <div>
            <ConnectButton className="bg-[#9b9e60] rounded-md px-5 py-2" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 px-8 py-8">
          <div
            className="w-[130px] h-[130px] rounded-[40px] outline outline-4 outline-[#999b5e] bg-center bg-cover"
            style={{ backgroundImage: `url(${theme?.avatar1})` }}
          />
          <h1 className="text-[#564119] text-4xl md:text-5xl font-serif tracking-[2px] text-center">
            {theme?.heroTitle || "ETERNAL PROFIT COMMUNITY"}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[900px]">
            {[theme?.clubIntroduction1, theme?.clubIntroduction2].map(
              (txt, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-6 rounded-md bg-[#dccfb3] p-10 shadow-md"
                >
                  <img
                    src={i === 0 ? theme?.clubIcon1 : theme?.clubIcon2}
                    className="w-[422px] h-[100px] object-cover"
                  />
                  <p className="text-[#050505] text-sm text-center">{txt}</p>
                  <button
                    className="text-[#573f19] text-base"
                    onClick={() => {
                      window.open(
                        i === 0 ? theme?.clubLink1 : theme?.clubLink2,
                        "_blank"
                      );
                    }}
                  >
                    View more
                  </button>
                </div>
              )
            )}
          </div>
          <div className="mt-4">
            <div>
              <ConnectButton className="inline-flex bg-[#9b9e60] text-white rounded-md px-10 py-4 shadow-md" />
            </div>
          </div>
        </div>
      </div>

      {theme?.showMemberOption ? (
        <div className="w-full bg-[#d3c29d] py-16 px-5 md:px-8 flex flex-col items-center gap-10">
          <div className="text-center">
            <p className="text-[#564119] text-4xl leading-[49px]">
              Join The Option
            </p>
            {/* <p className="text-[#564119] text-sm">little text description</p> */}
          </div>
          <div className="flex md:justify-center justify-between flex-wrap items-center w-full max-w-[1080px]">
            {membershipOptions.map((opt, i) => (
              <div
                key={opt.title}
                className="w-[48%] md:w-auto flex flex-col items-start gap-2 md:gap-4 border-2 border-[#ae9a76] rounded-sm shadow-md bg-white/30 p-3 md:p-6 mb-4 md:m-4"
              >
                <img
                  src={opt.icon || "/lifetime.png"}
                  className="w-full h-[80px] md:w-[200px] md:h-[140px] object-cover"
                />
                <p className="text-[#564119] text-sm md:text-lg min-h-[40px]">
                  {opt.title}
                </p>
                <p className="text-[#573f19] text-md font-bold md:text-2xl">
                  {opt.price}
                </p>
                <button
                  onClick={() => handleJoin(opt.type)}
                  className="w-full inline-flex text-sm md:text-base items-center justify-center gap-2 border border-[#787a40] rounded-sm bg-[#9a9d5f] text-white px-4 py-2 shadow"
                >
                  Get started
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {verifyData?.length ? (
        <div className="w-full bg-[#dfd1b3] py-16 px-8 flex flex-col items-center gap-10">
          <div className="text-center">
            <p className="text-[#564119] text-4xl leading-[49px]">
              Position Verification
            </p>
            {/* <p className="text-[#564119] text-sm">little text description</p> */}
          </div>
          <div className="flex flex-col md:flex-row items-start gap-10 w-full max-w-[1080px]">
            <div className="relative">
              <div
                className="w-[295px] md:w-[487px] h-[240px] md:h-[360px] border border-[#ae9a76] bg-center bg-cover shadow-md"
                style={{ backgroundImage: `url(${theme?.positionImg})` }}
              />
              {/* <div className="absolute -top-5 -left-4 w-[487px] h-[360px] bg-[#ae9a76] -rotate-3" /> */}
            </div>
            <div className="flex-1 w-full flex flex-col gap-6 z-10">
              {verifyData.map((it, idx) => (
                <div
                  key={idx}
                  className="w-full md:w-auto flex flex-col md:flex-row items-center"
                >
                  <div className="flex items-center justify-center w-full md:w-[180px] md:h-[82px] flex-1 bg-[#d0be97]">
                    <img
                      src={
                        theme?.verifyImgs?.[idx] ||
                        theme?.verifyImgs?.[0] ||
                        "/aave.png"
                      }
                      className="h-10 w-auto"
                    />
                  </div>
                  <div className="flex-1 w-full flex items-center justify-between border border-[#ae9a76] rounded-sm shadow bg-[#e1d3b9] px-6 py-4">
                    <div>
                      <p className="text-[#554018] font-bold">
                        {it.chainName} Chain
                      </p>
                      <p className="text-[#121212]">
                        Hold {it.tokenSymbol} ≥{" "}
                        {formatUnits(it.threshold, it.decimals)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleVerify(it)}
                      className="text-[#996600]"
                    >
                      Verify →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="w-full h-[35px] bg-[#dfd1b3]" />

      <div className="w-full bg-[#d3c29d] py-16 px-8 flex flex-col items-center gap-10">
        <div className="text-center">
          <p className="text-[#564119] text-4xl leading-[49px]">Links & Apps</p>
          {/* <p className="text-[#564119] text-sm">little text description</p> */}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-[1024px]">
          {theme?.socials?.map((app, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-4 border border-[#ae9a76] rounded-sm bg-[#dfd1b3] p-6 shadow"
            >
              <div className="flex items-center justify-center w-16 h-16 ">
                <img src={app.icon} className="w-full" />
              </div>
              <p className="text-[#715d36] text-lg">{app.name}</p>
              <button
                className="inline-flex items-center justify-center gap-2 border border-[#77793f] rounded bg-[#989b5d] text-white px-4 py-2 shadow"
                onClick={() => window.open(app.link, "_blank")}
              >
                {app.text}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full bg-[#ddcfb0] py-24 px-8 flex flex-col items-center gap-12">
        <div className="text-center">
          <p className="text-[#564119] text-4xl leading-[49px]">
            Community News
          </p>
          <p className="text-[#564119] text-sm">little text description</p>
        </div>
        <div className="flex flex-col gap-6 w-full max-w-[1080px]">
          {currentNewsData.map((news, idx) => (
            <div
              key={idx}
              className="w-full cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-start md:justify-between border-b border-[#c2b191] pb-3"
            >
              <div className="flex flex-col w-full md:flex-row items-start md:items-center gap-2 md:gap-6">
                <img
                  src={news.image}
                  className="w-full md:w-[248px] h-[90px] object-cover"
                />
                <div className="flex flex-col w-full md:w-[700px]">
                  <p className="text-[#564119] text-lg">{news.title}</p>
                  <div className="flex items-center justify-between w-full md:justify-start">
                    <div className="flex flex-col md:flex-row gap-3 text-[#121212] text-sm">
                      <span>Source: {news.source}</span>
                      <span>{news.time}</span>
                    </div>
                    <button
                      className="inline-flex items-center justify-center gap-2 border border-[#77793f] rounded bg-[#989b5d] text-white px-4 py-2 shadow whitespace-nowrap ml-3 md:hidden"
                      onClick={() => window.open(news.link, "_blank")}
                    >
                      View More
                    </button>
                  </div>
                </div>
              </div>
              <button
                className="hidden md:inline-flex whitespace-nowrap items-center justify-center gap-2 border border-[#77793f] rounded bg-[#989b5d] text-white px-4 py-2 shadow"
                onClick={() => window.open(news.link, "_blank")}
              >
                View More
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <Pagination
            dotClassName="bg-transparent"
            hoverTextClassName="text-[#787A40]/80"
            activeTextClassName="text-white"
            bgClassName="border-[2px] border-[#989B5D] bg-[#D2C099] text-[#787A40]"
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <div className="w-full bg-[#d2c19c] px-10 py-8 flex flex-col md:flex-row items-center justify-between">
        <div className="inline-flex items-center gap-2">
          <span className="text-[#554018] text-base">
            {domainName}.web3.club
          </span>
        </div>
        <p className="text-[#000] text-sm font-medium">
          <span className="text-[#554018cc]">Powered by </span>
          <a href="https://web3.club" className="underline">
            Web3.Club
          </a>
          <span className="text-[#554018cc]"> and </span>
          <a href="https://orbitlink.me" className="underline">
            OrbitLink.Me
          </a>
        </p>
      </div>
    </div>
  );
};

export default Template11;

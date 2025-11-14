import React from "react";
import { ConnectButton } from "../../components/ConnectButton";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";
import Pagination from "../../components/Pagination";
import { ITheme } from "@/types";
import { MemberModal } from "./MemberModal";
import { usePagination } from "../../hooks/usePagination";
import { useClubData } from "../../hooks/useClubData";
import { useClubMembership } from "../../hooks/useClubMembership";

const Web3Community: React.FC<{ theme?: ITheme; club: string }> = ({
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
    <div className="flex flex-col items-center bg-[#0b0b0d] pb-24 w-full min-h-screen overflow-hidden gap-2.5">
      {/* Header */}
      <MemberModal
        open={modalOpen}
        setOpen={setModalOpen}
        data={memberData}
        onConfirm={handleConfirmJoin}
        isVerifyMode={isVerifyMode}
      />
      <div
        className="w-full px-5 py-5 text-center text-sm font-bold text-white tracking-wider 
                      md:flex md:justify-between md:items-center md:px-20 md:py-5 md:min-w-[1080px] md:text-left"
      >
        <p className="md:flex-grow">{club}.web3.club</p>
        <ConnectButton className="hidden md:inline-flex" />
      </div>

      {/* Hero Section */}
      <div
        className="flex flex-col items-center w-full px-5 py-10 gap-5 
                      md:relative md:flex-row md:justify-between md:items-end md:px-20 md:py-20 md:min-w-[1080px] md:mx-auto"
      >
        {/* Desktop Background Image */}
        <div className="hidden md:block size-[400px] rounded-full md:absolute md:top-0 md:left-1/2 md:transform md:-translate-x-1/2 bg-[#6D8F20]">
           <img src={theme.heroImg} alt="Hero Background" className="size-[360px]"/>
        </div>

        {/* Mobile/Tablet Hero Content */}
        <div className="flex flex-col items-center gap-5 md:hidden">
          <h1 className="text-white text-2xl md:text-3xl font-bold text-center leading-9 md:leading-10 tracking-wider uppercase">
            {theme.heroTitle?.split(" ").map((it, i) => {
              return (
                <React.Fragment key={i}>
                  {it} <br />
                </React.Fragment>
              );
            })}
            <div>{theme.heroGradientText}</div>
          </h1>
          <div className="size-[211px] bg-[#6D8F20] rounded-full">
            <img
              src={theme.heroImg}
              alt="Community Logo"
              className="size-[189px]"
            />
          </div>

          <p className="text-white text-sm md:text-base tracking-wider">
            {theme.heroSubtitle}
          </p>
          <p className="text-white text-sm md:text-base leading-4 md:leading-5 tracking-wider text-center max-w-sm md:max-w-md">
            {theme.clubIntroduction1} <br />
            <br />
            {theme.clubIntroduction2}
          </p>
          <ConnectButton className="md:hidden inline-flex" />
        </div>

        {/* Desktop Hero Content */}
        <div className="hidden md:flex md:flex-col md:items-start md:z-10 md:relative">
          <h1 className="text-white text-5xl xl:text-6xl font-bold leading-12 xl:leading-14 tracking-wider uppercase mb-4">
            {theme.heroTitle?.split(" ").map((it, i) => {
              return (
                <React.Fragment key={i}>
                  {it} <br />
                </React.Fragment>
              );
            })}
            <div>{theme.heroGradientText}</div>
          </h1>
          <p className="text-white text-lg tracking-wider mb-8">
            {theme.heroSubtitle}
          </p>
        </div>

        <div className="hidden md:block md:z-10 md:relative md:w-[250px]">
          <p className="text-white text-base xl:text-[14px] leading-6 xl:leading-7 tracking-wider">
            {theme.clubIntroduction1} <br />
            <br />
            {theme.clubIntroduction2}
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
                {club}.web3.club
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
                {club}.web3.club
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col w-full gap-12 px-4 md:px-8 md:px-6 md:gap-16 md:max-w-[1180px] md:mx-auto">
        {/* Join Options Section */}
        {theme.showMemberOption ? (
          <div className="flex flex-col items-center gap-12 md:gap-16">
            <div className="flex flex-col gap-2.5 w-full">
              <h2 className="text-white text-xl md:text-2xl md:text-3xl xl:text-4xl font-bold text-center leading-5 md:leading-6 md:leading-8 xl:leading-10 tracking-wider uppercase">
                Join the Option
              </h2>
            </div>

            <div className="flex flex-col md:flex-row items-center md:justify-center gap-5 w-full">
              {[
                {
                  icon: theme.lifeTimeImg,
                  title: "Lifetime Member",
                  price: `${lifetimePrice} ETH`,
                  type: "lifetime",
                },
                monthPrice && {
                  icon: theme.monthImg,
                  title: "Monthly Member",
                  price: `${monthPrice} ETH`,
                  type: "month",
                },
                quarterPrice && {
                  icon: theme.quarterImg,
                  title: "Quarterly Member",
                  price: `${quarterPrice} ETH`,
                  type: "quarter",
                },
                yearPrice && {
                  icon: theme.yearImg,
                  title: "Yearly Member",
                  price: `${yearPrice} ETH`,
                  type: "year",
                },
              ]
                .filter(Boolean)
                .map((option, index) => (
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
        ) : null}

        {/* Position Verification Section */}
        {verifyData?.length ? (
          <div className="flex flex-col items-center gap-12 md:gap-16">
            <div className="flex flex-col gap-2.5 w-full">
              <h2 className="text-white text-xl md:text-2xl md:text-3xl xl:text-4xl font-bold text-center leading-5 md:leading-6 md:leading-8 xl:leading-10 tracking-wider uppercase">
                Position Verification
              </h2>
            </div>

            {/* Frame 9 - 三链验证：按 Figma 文案与结构实现，使用当前图片资源且不加白色圆底 */}
            <div className="w-full max-w-[1080px] mx-auto flex flex-col md:flex-row items-center md:items-start justify-center gap-6 md:gap-[50px]">
              {/* ETH Chain */}
              {verifyData?.map((it, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="flex items-center gap-6">
                      <img
                        src={
                          theme?.verifyImgs?.[index] ||
                          theme?.verifyImgs?.[0] ||
                          "/aave.png"
                        }
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
                      <div className="hidden md:block w-px h-[100px] bg-white/60" />
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

            
            <div className="hidden md:block w-px h-[100px] bg-white/60" />

            
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
        ) : null}

        {/* Links & Apps Section */}
        <div className="flex flex-col items-center gap-12 md:gap-16">
          <div className="flex flex-col gap-2.5 w-full">
            <h2 className="text-white text-xl md:text-2xl md:text-3xl xl:text-4xl font-bold text-center leading-5 md:leading-6 md:leading-8 xl:leading-10 tracking-wider uppercase">
              Links & Apps
            </h2>
          </div>

          <div className="flex items-center justify-around gap-4 w-full md:gap-2.5 px-4 md:px-16">
            {theme.socials.map((app, index) => {
              // const item = socialsData.find((item) => item.name === app.name);
              return (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center px-[20px] py-[30px] gap-5 md:px-[20px] md:py-[30px] md:gap-6 rounded-2xl"
                >
                  <div
                    className={`flex items-center justify-center size-16 rounded-2xl`}
                  >
                    <img
                      src={app.icon}
                      alt={app.name}
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="flex flex-col items-center gap-2.5 md:gap-3">
                    <p className="text-white text-base md:text-lg md:text-xl font-bold">
                      {app.name}
                    </p>
                    <button
                      onClick={() => {
                        window.open(app.link, "_blank");
                      }}
                      className={`bg-[#bfea52] text-black text-sm md:text-base md:text-lg font-medium rounded-2xl px-5 py-2 md:px-6 md:py-3 hover:opacity-90 transition-opacity`}
                    >
                      {app.text}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Community News Section */}
        {theme?.news && theme.news.length > 0 && (
          <div className="flex flex-col items-center gap-12 md:gap-16">
            <div className="flex flex-col gap-2.5 w-full">
              <h2 className="text-white text-xl md:text-2xl md:text-3xl xl:text-4xl font-bold text-center leading-5 md:leading-6 md:leading-8 xl:leading-10 tracking-wider uppercase">
                Community News
              </h2>
            </div>

            <div className="flex flex-col w-full px-5 gap-8 md:gap-10 md:px-0">
              {currentNewsData.map((news, index) => (
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
        )}
      </div>

      {/* Pagination - 只在newsData超过4条时显示 */}
      {newsData.length > 4 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

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
                {club}.web3.club
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
                {club}.web3.club
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full px-5 py-5 md:px-20 md:py-5 md:max-w-[1080px] md:mx-auto flex items-center md:justify-between justify-center gap-5 flex-wrap">
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

export default Web3Community;

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

const Template13: React.FC<{ theme?: ITheme; club: string }> = ({
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
    itemsPerPage: 3,
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
      title: "Monthly Member",
      price: `${monthPrice} ETH`,
      type: "month",
    },
    quarterPrice && {
      icon: theme?.quarterImg,
      title: "Quarterly Member",
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
    <div className="flex flex-col items-center w-full min-h-screen overflow-hidden bg-white">
      <MemberModal
        open={modalOpen}
        setOpen={setModalOpen}
        data={memberData}
        onConfirm={handleConfirmJoin}
        isVerifyMode={isVerifyMode}
      />

      {/* Hero */}
      <div className="w-full bg-black py-12">
        <div className="max-w-[1180px] mx-auto px-6 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="relative">
            <img
              src="RectangleImg.png"
              alt="Hero"
              className="w-[580px] h-auto"
            />
            <img
              src="lightning.png"
              alt="Hero"
              className="absolute top-[-8%] left-[16%] w-[540px] h-auto"
            />
          </div>
          <div className="flex flex-col items-center md:items-start gap-4 md:ml-14">
            <div className="flex flex-col items-center md:items-start gap-2">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img
                  src={theme?.heroImg}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[#eb2832] mt-2 font-bold uppercase">
                {domainName}.web3.club
              </span>
            </div>
            <h1 className="text-white text-center md:text-left text-4xl md:text-5xl font-extrabold uppercase">
              {theme?.heroTitle}
            </h1>
            <div>
              <ConnectButton className="bg-[#eb2832] text-white font-black rounded px-5 py-2" />
            </div>
          </div>
        </div>

        {/* Intro sections */}
        <div className="max-w-[1180px] mx-auto px-6 mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 text-white">
          {[theme?.clubIntroduction1, theme?.clubIntroduction2].map(
            (txt, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <img
                    src={i === 0 ? theme?.clubIcon1 : theme?.clubIcon2}
                    className="w-6 h-6 rounded"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between w-full items-center">
                    <div className="text-[#FFF] lining-nums tabular-nums text-4 font-not-italic font-bold lh-[100%] tracking-0.08 uppercase">
                      SECTION {i + 1}
                    </div>
                    <button
                      className="block md:hidden mt-2 border-b-[2px] border-[#f8cf01] text-white font-bold uppercase text-sm"
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
                  <p className="text-[14px] text-white/80 font-medium">{txt}</p>
                  <button
                    onClick={() => {
                      window.open(
                        i === 0 ? theme?.clubLink1 : theme?.clubLink2,
                        "_blank"
                      );
                    }}
                    className="mt-2 hidden md:block border-b-[2px] border-[#f8cf01] text-white font-bold uppercase text-sm"
                  >
                    View more
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Join The Option */}
      {theme?.showMemberOption ? (
        <div className="w-full bg-[#eb2832] py-12">
          <div className="max-w-[1180px] mx-auto px-6">
            <div className="text-center text-white">
              {/* <p className="text-sm">meta text</p> */}
              <h2 className="text-3xl md:text-4xl font-extrabold uppercase">
                Join the Option
              </h2>
            </div>
            <div className="mt-8 flex flex-col md:flex-row items-center flex-wrap justify-center gap-6">
              {membershipOptions.map((opt, i) => (
                <React.Fragment key={opt.title}>
                  <div className="flex items-center gap-5 bg-transparent w-full md:w-auto">
                    <img
                      src={opt.icon || "/lifetime.png"}
                      className="size-[50px] md:size-[80px] rounded-full"
                    />
                    <div className="flex-1 flex flex-row md:flex-col gap-3 justify-between">
                      <div>
                        <p className="text-white text-sm">{opt.title}</p>
                        <p className="text-white text-2xl font-extrabold uppercase">
                          {opt.price}
                        </p>
                      </div>
                      <button
                        className="inline-flex items-center gap-2 bg-[#f8cf01] text-black rounded px-2 h-[34px] md:px-4 py-2 text-[12px] font-bold uppercase shadow-[0.25rem_0.25rem_0_0_rgba(0,0,0,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0.35rem_0.35rem_0_0_rgba(0,0,0,0.25)] hover:brightness-95"
                        onClick={() => handleJoin(opt.type)}
                      >
                        Join now
                        <img
                          src="/arrow_right_circle_fill.png"
                          className="w-6 h-6"
                        />
                      </button>
                    </div>
                  </div>
                  {i < membershipOptions.length - 1 && (
                    <div className="w-px h-[100px] bg-white/60 hidden md:block" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* Position Verification */}
      {verifyData?.length ? (
        <div className="w-full py-16">
          <div className="max-w-[1180px] mx-auto px-6">
            <div className="text-center">
              {/* <p className="text-sm">meta text</p> */}
              <h2 className="text-3xl md:text-4xl font-extrabold uppercase">
                Position Verification
              </h2>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {verifyData.map((it, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-4 border border-black/40 bg-white p-5 rounded"
                >
                  <div className="w-full bg-[#f4f4f4] h-[60px] flex items-center justify-center rounded">
                    <img
                      src={
                        theme?.verifyImgs?.[idx] ||
                        theme?.verifyImgs?.[0] ||
                        "/aave.png"
                      }
                      className="h-10"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold">{it.chainName} Chain</p>
                      <p className="text-black/80 text-xs">
                        Hold {it.tokenSymbol} ≥{" "}
                        {formatUnits(it.threshold, it.decimals)}
                      </p>
                    </div>
                    <button
                      className="shadow-[0.25rem_0.25rem_0_0_rgba(0,0,0,0.50)] inline-flex items-center gap-2 bg-[#f8cf01] text-black rounded px-4 py-2 font-bold uppercase transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0.35rem_0.35rem_0_0_rgba(0,0,0,0.50)] hover:brightness-95"
                      onClick={() => handleVerify(it)}
                    >
                      Verify
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      {/* Links & Apps */}
      <div className="w-full py-20 bg-[#f8cf01] -skew-y-2">
        <div className="max-w-[1180px] mx-auto px-6 skew-y-2">
          <div className="text-center mb-8">
            {/* <p className="text-sm">meta text</p> */}
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase">
              Links & Apps
            </h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {theme?.socials?.map((app, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-3 bg-white rounded w-[141px] py-[30px] px-5 shadow"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{
                    background: [
                      "#3088ff",
                      "#6aabe9",
                      "#778cd3",
                      "#eb3323",
                      "#04231e",
                      "#01cd88",
                    ][i % 6],
                  }}
                >
                  <img src={app.icon} className="w-full" />
                </div>
                <p className="font-bold text-[16px] text-[#333]">{app.name}</p>
                <button
                  className="inline-flex items-center gap-2 bg-black text-white rounded px-5 py-2 shadow-[0.25rem_0.25rem_0_0_rgba(0,0,0,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0.35rem_0.35rem_0_0_rgba(0,0,0,0.25)] hover:brightness-95"
                  onClick={() => window.open(app.link, "_blank")}
                >
                  {app.text}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community News */}
      {theme?.news && theme.news.length > 0 && (
        <div className="w-full py-16">
          <div className="max-w-[1180px] mx-auto px-6">
            <div className="text-center mb-8">
              {/* <p className="text-sm">meta text</p> */}
              <h2 className="text-3xl md:text-4xl font-extrabold uppercase">
                Community News
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {currentNewsData.map((news, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-3 border border-black/20 rounded bg-white p-5"
                >
                  <img
                    src={news.image}
                    className="w-full h-[170px] object-cover rounded"
                  />
                  <p className="font-bold">{news.title}</p>
                  <p className="text-black/70 text-sm">Source: {news.source}</p>
                  <button
                    className="text-[#eb262d] font-bold uppercase text-sm w-fit"
                    onClick={() => window.open(news.link, "_blank")}
                  >
                    View more
                  </button>
                  <div className="h-[2px] bg-[#f8cf01] w-24" />
                </div>
              ))}
            </div>
            {newsData.length > 3 && (
              <div className="mt-6 flex justify-center">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  dotClassName="opacity-0"
                  hoverTextClassName="text-white/80"
                  bgClassName="rounded-[0.125rem] bg-[#EB262D] shadow-[0.25rem_0.25rem_0_0_rgba(0,0,0,0.25)]"
                  activeTextClassName="text-[20px] font-bold text-white"
                  textClassName="flex w-12.5 h-12.5 px-4 py-3.25 justify-center items-center "
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="w-full bg-[#0e0733] text-white px-10 py-12 flex items-center justify-between">
        <div className="inline-flex items-center gap-2">
          <span className="inline-block w-5 h-5 rounded-full bg-[#eb2832]" />
          <span className="font-bold">{domainName}.web3.club</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Powered by</span>
          <span className="bg-[#eb2832] px-2 rounded">Web3.Club</span>
          <span>and</span>
          <span className="bg-[#eb2832] px-2 rounded">OrbitLink.Me</span>
        </div>
      </div>
    </div>
  );
};

export default Template13;

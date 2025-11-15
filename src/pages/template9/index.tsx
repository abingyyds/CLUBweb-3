import React, { useState } from "react";
import { useAccount } from "wagmi";
import { formatUnits } from "viem";
import { MemberModal } from "./MemberModal";
import { useClubData } from "../../hooks/useClubData";
import { useClubMembership } from "../../hooks/useClubMembership";
import { ConnectButton } from "@/components/ConnectButton";
import { ITheme } from "@/types";
import Pagination from "@/components/Pagination";
import { usePagination } from "@/hooks/usePagination";

interface Template9Props {
  club?: string;
  theme: ITheme;
}

const Template9: React.FC<Template9Props> = ({ club = "abc", theme }) => {
  const { address, isConnected } = useAccount();
  const [selectedMembership, setSelectedMembership] = useState<string>("");
  const domainName = club;

  const {
    lifetimePrice,
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

  const newsList = theme.news ?? [];
  const {
    currentPage,
    totalPages,
    currentData: currentNewsData,
    handlePageChange,
  } = usePagination({
    data: newsList,
    itemsPerPage: 4,
  });

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Main Container - 1280px width, centered */}
      <div className="max-w-[1280px] w-full mx-auto bg-white">
        {/* Header */}
        <header className="flex items-center justify-between px-4 md:px-[106px] py-3 md:py-[14px] border-b border-gray-200">
          <div className="flex items-center gap-[10px]">
            {/* Logo placeholder */}
            <svg
              width="13"
              height="15"
              viewBox="0 0 13 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.6769 3.8675L7.31 0.32937C7.05501 0.11687 6.72563 0 6.38563 0H1.45563C0.64813 0 0 0.64812 0 1.45562V13.4194C0 14.2269 0.65875 14.875 1.45563 14.875H10.7632C11.5707 14.875 12.2188 14.2269 12.2188 13.4194V5.0044C12.2188 4.56875 12.0169 4.14375 11.6769 3.8675ZM7.03376 1.45562L10.71 4.66437C10.8588 4.79187 10.7738 5.0362 10.5719 5.0362H7.42688C7.21438 5.0362 7.03376 4.86625 7.03376 4.64313V1.46625V1.45562ZM10.1682 13.4087H2.04C1.79563 13.4087 1.59376 13.2069 1.59376 12.9519V1.90188C1.59376 1.6575 1.79563 1.45562 2.04 1.45562H5.70563V5.0469C5.70563 5.78 6.30063 6.375 7.03376 6.375H10.6144V12.9625C10.6144 13.2069 10.4125 13.4087 10.1682 13.4087Z"
                fill="#F5A200"
              />
              <path d="M3.71875 8.37262H8.49997H3.71875Z" fill="black" />
              <path
                d="M3.71875 8.37262H8.49997"
                stroke="#F5A200"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M3.71875 10.9121H8.49997H3.71875Z" fill="black" />
              <path
                d="M3.71875 10.9121H8.49997"
                stroke="#F5A200"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="text-[#f5a200] font-semibold text-base uppercase">
              {club}.WEB3.CLUB
            </span>
          </div>
          <ConnectButton className="invisible md:visible bg-[#ffbb33] text-black px-3 py-2 md:px-[11px] md:py-[6px] rounded-[5px] font-semibold text-sm md:text-base shadow-sm hover:shadow-md transition-shadow" />
        </header>

        {/* Main Content */}
        <div className="px-4 sm:px-8 md:px-[124px] pb-16 md:pb-[100px] space-y-10">
          {/* Hero Section */}
          <section className="flex flex-col md:flex-row items-center justify-between gap-8 pt-6 md:pt-10">
            <div className="flex flex-col items-center md:items-start space-y-8 max-w-[440px]">
              <h1 className="text-3xl sm:text-4xl md:text-[61px] font-bold leading-tight md:leading-[65px] text-[#050505] tracking-[-1.92px]">
                {theme.heroTitle} {theme.heroGradientText}
              </h1>
              <ConnectButton className="w-[200px] bg-[#ffbb33] text-black px-3 py-2 md:px-[20px] md:py-[10px] rounded-[5px] font-semibold text-sm md:text-base shadow-sm hover:shadow-md transition-shadow" />
            </div>
            <div className="w-full md:w-[578px] h-auto md:h-[316px]">
              {/* Hero Image Placeholder */}
              <img
                src={theme.heroImg}
                className="w-full h-full object-contain"
                alt=""
              />
            </div>
          </section>

          {/* Info Cards Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 01 */}
            <div className="flex-1 border-2 border-gray-100 rounded-xl bg-white p-4 space-y-8">
              <div className="space-y-2">
                <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                  <svg
                    width="19"
                    height="20"
                    viewBox="0 0 19 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.28833 15.4958L8.37833 19.4525C8.62333 19.59 8.8675 19.6583 9.11167 19.6583C9.36333 19.6583 9.61333 19.59 9.86417 19.4525L16.945 15.4958C17.375 15.2517 17.6975 14.9742 17.9117 14.6633C18.1267 14.3467 18.2342 13.8758 18.2342 13.2492V6.0075C18.2342 5.53 18.1425 5.1325 17.9567 4.81583C17.7717 4.5 17.4792 4.22833 17.0792 4.00167L10.7867 0.475C10.2367 0.158333 9.6825 0 9.12167 0C8.56 0 8.0025 0.158333 7.44667 0.475L1.155 4.00167C0.755 4.22833 0.463333 4.5 0.2775 4.81667C0.0916666 5.13333 0 5.52917 0 6.00667V13.2483C0 13.8758 0.108333 14.3475 0.3225 14.6633C0.543333 14.9742 0.865833 15.2517 1.28917 15.4967L1.28833 15.4958ZM2.255 14.1175C2.01083 13.9742 1.8375 13.825 1.73583 13.67C1.64083 13.515 1.5925 13.32 1.5925 13.0875V6.5625L8.28917 10.34V17.5192L2.255 14.1175ZM15.9783 14.1175L9.945 17.5192V10.34L16.6408 6.56167V13.0875C16.6408 13.3208 16.5908 13.515 16.4883 13.67C16.3933 13.825 16.2233 13.9742 15.9783 14.1175ZM9.12083 8.87167L2.50583 5.16583L4.99417 3.75083L11.6192 7.46583L9.12083 8.87167ZM13.32 6.52667L6.6775 2.81167L8.15417 1.97833C8.805 1.615 9.44583 1.615 10.0792 1.97833L15.7367 5.16583L13.32 6.52667Z"
                      fill="#FAA700"
                    />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-semibold text-[#050505]">01</h3>
                  <p className="text-sm text-[#050505] leading-relaxed">
                    {theme.clubIntroduction1}
                  </p>
                </div>
              </div>
              <a
                href={theme.clubLink1}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="mt-4 flex items-center gap-1 text-[#996600] text-sm font-semibold">
                  <span>View more</span>
                  <span>→</span>
                </div>
              </a>
            </div>

            {/* Card 02 */}
            <div className="flex-1 border-2 border-gray-100 rounded-xl bg-gray-50 p-4 space-y-8">
              <div className="space-y-2">
                <div className="w-8 h-8 bg-yellow-100 rounded-md flex items-center justify-center">
                  <svg
                    width="19"
                    height="20"
                    viewBox="0 0 19 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.28833 15.4958L8.37833 19.4525C8.62333 19.59 8.8675 19.6583 9.11167 19.6583C9.36333 19.6583 9.61333 19.59 9.86417 19.4525L16.945 15.4958C17.375 15.2517 17.6975 14.9742 17.9117 14.6633C18.1267 14.3467 18.2342 13.8758 18.2342 13.2492V6.0075C18.2342 5.53 18.1425 5.1325 17.9567 4.81583C17.7717 4.5 17.4792 4.22833 17.0792 4.00167L10.7867 0.475C10.2367 0.158333 9.6825 0 9.12167 0C8.56 0 8.0025 0.158333 7.44667 0.475L1.155 4.00167C0.755 4.22833 0.463333 4.5 0.2775 4.81667C0.0916666 5.13333 0 5.52917 0 6.00667V13.2483C0 13.8758 0.108333 14.3475 0.3225 14.6633C0.543333 14.9742 0.865833 15.2517 1.28917 15.4967L1.28833 15.4958ZM2.255 14.1175C2.01083 13.9742 1.8375 13.825 1.73583 13.67C1.64083 13.515 1.5925 13.32 1.5925 13.0875V6.5625L8.28917 10.34V17.5192L2.255 14.1175ZM15.9783 14.1175L9.945 17.5192V10.34L16.6408 6.56167V13.0875C16.6408 13.3208 16.5908 13.515 16.4883 13.67C16.3933 13.825 16.2233 13.9742 15.9783 14.1175ZM9.12083 8.87167L2.50583 5.16583L4.99417 3.75083L11.6192 7.46583L9.12083 8.87167ZM13.32 6.52667L6.6775 2.81167L8.15417 1.97833C8.805 1.615 9.44583 1.615 10.0792 1.97833L15.7367 5.16583L13.32 6.52667Z"
                      fill="#FAA700"
                    />
                  </svg>
                </div>
                <div className="space-y-1">
                  <h3 className="text-2xl font-semibold text-[#050505]">02</h3>
                  <p className="text-sm text-[#050505] leading-relaxed">
                    {theme.clubIntroduction2}
                  </p>
                </div>
              </div>
              <a
                href={theme.clubLink2}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="mt-4 flex items-center gap-1 text-[#996600] text-sm font-semibold">
                  <span>View more</span>
                  <span>→</span>
                </div>
              </a>
            </div>
          </section>

          {/* Join The Option Section */}
          {theme.showMemberOption && (
            <section className="relative py-10">
              <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-center text-[#050505] leading-tight md:leading-[49px] tracking-[-1.21px] mb-11">
                Join The Option
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {[
                  lifetimePrice && {
                    icon: theme.lifeTimeImg,
                    title: "Lifetime Member",
                    price: `${lifetimePrice} ETH`,
                    type: "lifetime",
                    description:
                      "For organizing every corner of your work & life.",
                    isPopular: false,
                  },
                  monthPrice && {
                    icon: theme.monthImg,
                    title: "Monthly Member",
                    price: `${monthPrice} ETH`,
                    type: "month",
                    description:
                      "A place for small groups to plan & get organized.",
                    isPopular: true,
                  },
                  quarterPrice && {
                    icon: theme.quarterImg,
                    title: "Quarterly Member",
                    price: `${quarterPrice} ETH`,
                    type: "quarter",
                    description:
                      "Perfect for seasonal planning and organization.",
                    isPopular: false,
                  },
                  yearPrice && {
                    icon: theme.yearImg,
                    title: "Yearly Member",
                    price: `${yearPrice} ETH`,
                    type: "year",
                    description:
                      "For companies using our platform to connect several teams & tools.",
                    isPopular: false,
                  },
                ]
                  .filter(Boolean)
                  .map((option, index) => (
                    <div
                      key={option.type}
                      className={`flex-1 border-4 border-gray-100 rounded-xl bg-gray-50 ${
                        option.isPopular ? "relative" : ""
                      }`}
                    >
                      {option.isPopular && (
                        <div className="absolute top-0 right-0 bg-gray-100 px-3 py-1 rounded-bl-lg rounded-tr-xl">
                          <span className="text-xs font-semibold text-gray-600">
                            Most popular
                          </span>
                        </div>
                      )}
                      <div className="bg-white rounded-t-xl p-6 space-y-3">
                        <img
                          src={option.icon}
                          alt={option.title}
                          className="w-7 h-8 object-contain"
                        />
                        <h3 className="text-2xl font-bold text-[#050505]">
                          {option.title}
                        </h3>
                        <p className="text-sm text-[#050505]">
                          {option.description}
                        </p>
                      </div>
                      <div className="p-6 space-y-3">
                        <div className="text-[36px] font-bold text-[#050505]">
                          {option.price}
                        </div>
                        <button
                          onClick={() => handleJoin(option.type)}
                          className={`bg-white border border-gray-200 text-[#121212] hover:bg-[#121212] hover:text-white w-full py-2 px-4 rounded-md font-semibold shadow-sm hover:shadow-md transition-shadow`}
                        >
                          Get started
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Decorative image */}
              <div className="invisible md:visible absolute top-2 right-2 w-24 h-auto md:top-0 md:right-0 md:w-[221px] md:h-[150px] ">
                <img src="/topPeekI.png" alt="" />
              </div>
            </section>
          )}

          {/* Position Verification Section */}
          {verifyData?.length ? (
            <section className="relative py-10">
              <div className="absolute z-99 top-6 right-2 md:top-0 md:left-2 w-24 h-24 md:left-20 md:w-[178px] md:h-[181px] ">
                <img src="/topPeekRed02.png" alt="" />
              </div>

              <h2 className="text-2xl md:text-[40px] font-bold text-left md:text-center text-[#050505] leading-tight md:leading-[49px] tracking-[-1.21px] mb-11 relative z-10">
                <span className="block md:inline">Position</span>{" "}
                <span className="block md:inline">Verification</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
                {verifyData.map((it, index) => (
                  <div
                    key={index}
                    className="flex-1 bg-gray-50 rounded-xl p-7 space-y-2"
                  >
                    <div className="space-y-1">
                      <div className="w-auto h-12 rounded-lg flex items-center">
                        <img
                          src={
                            theme?.verifyImgs?.[index] ||
                            theme?.verifyImgs?.[0] ||
                            "/aave.png"
                          }
                          alt={`${it.chainName} Chain`}
                          className="h-full w-auto object-contain"
                        />
                      </div>
                      <h3 className="text-lg font-bold text-[#050505]">
                        {it.chainName} Chain
                      </h3>
                      <p className="text-base text-[#121212]">
                        Hold {it.tokenSymbol} ≥{" "}
                        {formatUnits(it.threshold, it.decimals)}
                      </p>
                    </div>
                    <button
                      onClick={() => handleVerify(it)}
                      className="flex items-center gap-1 text-[#996600] font-medium hover:text-[#b8770a] transition-colors"
                    >
                      <span>Verify</span>
                      <span>→</span>
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Links & Apps Section */}
          {theme.socials?.length ? (
            <section className="relative py-10">
              <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-center text-[#050505] leading-tight md:leading-[49px] tracking-[-1.21px] mb-11 relative z-10">
                Links & Apps
              </h2>

              <div
                className={`grid gap-6 relative z-10 grid-cols-2 ${
                  theme.socials.length === 1
                    ? "md:grid-cols-1 md:justify-center"
                    : theme.socials.length === 2
                    ? "md:grid-cols-2 md:justify-center"
                    : theme.socials.length === 3
                    ? "md:grid-cols-3"
                    : theme.socials.length === 4
                    ? "md:grid-cols-4"
                    : theme.socials.length === 5
                    ? "md:grid-cols-5"
                    : "md:grid-cols-6"
                }`}
              >
                {theme.socials.map((app, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-7 space-y-2 flex flex-col items-center text-center"
                  >
                    <div className="space-y-1 w-full flex flex-col items-center">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto">
                        <img
                          src={app.icon}
                          alt={app.name}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <h3 className="text-lg font-bold text-[#050505]">
                        {app.name}
                      </h3>
                    </div>
                    <button
                      onClick={() => window.open(app.link, "_blank")}
                      className="bg-[#ffbb33] text-black px-6 py-2 rounded font-semibold shadow-sm hover:shadow-md transition-shadow mx-auto"
                    >
                      <span>{app.text}</span>
                    </button>
                  </div>
                ))}
                <div className="invisible md:visible absolute top-0 right-2 w-10 h-auto md:right-[-60px] md:w-[91px] ">
                  <img src="/p3.png" alt="" />
                </div>
              </div>
            </section>
          ) : null}

          {/* Community News Section */}
          {theme?.news && theme.news.length > 0 && (
            <section className="relative py-10">
              <div className="absolute top-[26px] right-0 w-[60px] h-[60px] md:top-[-70px] md:left-0 md:w-[150px] md:h-[120px] ">
                <img src="/p4.png" alt="" />
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-[40px] font-bold text-left md:text-center text-[#050505] leading-tight md:leading-[49px] tracking-[-1.21px] mb-11 relative z-10">
                Community News
              </h2>

              <div className="space-y-4 relative z-10">
                {currentNewsData.map((news, index) => (
                  <div
                    key={index}
                    onClick={() => window.open(news.link, "_blank")}
                    className="flex cursor-pointer border-t-2 border-gray-200 flex-col md:flex-row items-start justify-between p-4 gap-2"
                  >
                    <div className="w-full md:w-[248px]">
                      <img src={news.image} className="w-full" alt="" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#050505] mb-1">
                        {news.title}
                      </h3>

                      <div className="flex gap-6 items-center">
                        <p className="text-sm text-gray-600">
                          Source: {news.source}
                        </p>
                        <div className="text-sm text-[#121212]">
                          {news.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {theme.news.length > 4 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  bgClassName="bg-[#FFBB33]"
                  activeTextClassName="text-white"
                  hoverTextClassName="hover:text-white"
                />
              )}
            </section>
          )}

          {/* Bottom Decorative Image */}
          <div className="flex justify-center py-10">
            <div className="w-48 h-24 md:w-[400px] md:h-[200px] ">
              <img src="/p5.png" alt="" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-50 py-8 px-4 md:px-[124px] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 ">
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.5 9C1.8 9 1.20833 8.75833 0.725 8.275C0.241667 7.79167 0 7.2 0 6.5C0 5.8 0.241667 5.20833 0.725 4.725C1.20833 4.24167 1.8 4 2.5 4C3.2 4 3.79167 4.24167 4.275 4.725C4.75833 5.20833 5 5.8 5 6.5C5 7.2 4.75833 7.79167 4.275 8.275C3.79167 8.75833 3.2 9 2.5 9ZM7 5C6.3 5 5.70833 4.75833 5.225 4.275C4.74167 3.79167 4.5 3.2 4.5 2.5C4.5 1.8 4.74167 1.20833 5.225 0.725C5.70833 0.241667 6.3 0 7 0C7.7 0 8.29167 0.241667 8.775 0.725C9.25833 1.20833 9.5 1.8 9.5 2.5C9.5 3.2 9.25833 3.79167 8.775 4.275C8.29167 4.75833 7.7 5 7 5ZM13 5C12.3 5 11.7083 4.75833 11.225 4.275C10.7417 3.79167 10.5 3.2 10.5 2.5C10.5 1.8 10.7417 1.20833 11.225 0.725C11.7083 0.241667 12.3 0 13 0C13.7 0 14.2917 0.241667 14.775 0.725C15.2583 1.20833 15.5 1.8 15.5 2.5C15.5 3.2 15.2583 3.79167 14.775 4.275C14.2917 4.75833 13.7 5 13 5ZM17.5 9C16.8 9 16.2083 8.75833 15.725 8.275C15.2417 7.79167 15 7.2 15 6.5C15 5.8 15.2417 5.20833 15.725 4.725C16.2083 4.24167 16.8 4 17.5 4C18.2 4 18.7917 4.24167 19.275 4.725C19.7583 5.20833 20 5.8 20 6.5C20 7.2 19.7583 7.79167 19.275 8.275C18.7917 8.75833 18.2 9 17.5 9ZM4.65 19C3.9 19 3.27083 18.7125 2.7625 18.1375C2.25417 17.5625 2 16.8833 2 16.1C2 15.2333 2.29583 14.475 2.8875 13.825C3.47917 13.175 4.06667 12.5333 4.65 11.9C5.13333 11.3833 5.55 10.8208 5.9 10.2125C6.25 9.60417 6.66667 9.03333 7.15 8.5C7.51667 8.06667 7.94167 7.70833 8.425 7.425C8.90833 7.14167 9.43333 7 10 7C10.5667 7 11.0917 7.13333 11.575 7.4C12.0583 7.66667 12.4833 8.01667 12.85 8.45C13.3167 8.98333 13.7292 9.55833 14.0875 10.175C14.4458 10.7917 14.8667 11.3667 15.35 11.9C15.9333 12.5333 16.5208 13.175 17.1125 13.825C17.7042 14.475 18 15.2333 18 16.1C18 16.8833 17.7458 17.5625 17.2375 18.1375C16.7292 18.7125 16.1 19 15.35 19C14.45 19 13.5583 18.925 12.675 18.775C11.7917 18.625 10.9 18.55 10 18.55C9.1 18.55 8.20833 18.625 7.325 18.775C6.44167 18.925 5.55 19 4.65 19Z"
                  fill="#FFBB33"
                />
              </svg>
            </div>
            <span className="text-[#f5a200] font-semibold">
              {domainName}.web3.club
            </span>
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
      <MemberModal
        open={modalOpen}
        setOpen={setModalOpen}
        data={memberData}
        isVerifyMode={false}
        onConfirm={handleConfirmJoin}
      />
    </div>
  );
};

export default Template9;

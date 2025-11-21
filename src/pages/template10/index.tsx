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
import { ArrowRightIcon } from "lucide-react";

export const Template10: React.FC<{ theme?: ITheme; club: string }> = ({
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
    <div
      className="min-h-screen w-full bg-white font-['Manrope'] overflow-x-hidden"
      style={{
        fontFamily:
          'Manrope, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
      }}
    >
      {/* Member Modal */}
      <MemberModal
        open={modalOpen}
        setOpen={setModalOpen}
        data={memberData}
        onConfirm={handleConfirmJoin}
        isVerifyMode={isVerifyMode}
      />

      {/* Main Container - Responsive max width */}
      <div className="w-full max-w-[1280px] mx-auto bg-white">
        {/* Header Section with Purple Gradient Background */}
        <div
          className="px-5 sm:px-8 md:px-[100px] pt-5 pb-[40px] md:pb-[60px]"
          style={{
            background:
              "linear-gradient(0deg, rgba(242, 234, 255, 0) 0%, #e3b9f9 100%)",
            backgroundColor: "#f6f5fd",
          }}
        >
          {/* Header Navigation */}
          <div className="flex justify-between items-center py-5">
            <h1 className="text-black text-base font-bold uppercase tracking-[-0.16px] leading-[19px]">
              {domainName}.WEB3.CLUB
            </h1>
            <ConnectButton
              className="inline-flex items-center gap-[5px] px-5 py-[10px] rounded-[30px] text-white text-sm font-bold leading-[17px] tracking-[-0.14px]"
              style={{
                background: "linear-gradient(90deg, #8384f0 0%, #7135ff 100%)",
              }}
            />
          </div>

          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center md:justify-between relative mt-5 gap-6">
            {/* Left Content */}
            <div className="box1 flex flex-col items-start gap-[30px] z-10 order-1">
              <div className="flex flex-col gap-5">
                <h2 className="text-black text-2xl md:text-[40px] font-bold leading-[32px] md:leading-[48px] tracking-[-0.4px] w-full md:w-[312px] uppercase text-left">
                  {theme.heroTitle} {theme.heroGradientText}
                </h2>
              </div>

              <div className="flex items-start gap-3 md:flex-col md:items-start w-full">
                <img
                  src={"/Union.png"}
                  alt="Hero"
                  className="w-[160px] h-[160px] md:w-[210px] md:h-[210px] object-cover shrink-0"
                />

                <div className="flex flex-col gap-[10px] pr-0 md:pr-[70px] flex-1">
                  <h3 className="text-black text-2xl font-bold leading-[29px] tracking-[-0.24px]">
                    Summer
                  </h3>
                  <p className="text-black/60 text-sm font-medium leading-[17px] tracking-[-0.14px] w-full md:w-[302px]">
                    {theme.clubIntroduction1}
                  </p>
                  <a
                    href={theme.clubLink1}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="inline-flex items-center gap-1 cursor-pointer">
                      <span className="text-black text-sm font-medium leading-[17px] tracking-[-0.14px]">
                        Read more
                      </span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_56_140)">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.29303 6.293C6.48056 6.10553 6.73487 6.00021 7.00003 6.00021C7.26519 6.00021 7.5195 6.10553 7.70703 6.293L12.707 11.293C12.8945 11.4805 12.9998 11.7348 12.9998 12C12.9998 12.2652 12.8945 12.5195 12.707 12.707L7.70703 17.707C7.51843 17.8892 7.26583 17.99 7.00363 17.9877C6.74143 17.9854 6.49062 17.8802 6.30521 17.6948C6.1198 17.5094 6.01463 17.2586 6.01236 16.9964C6.01008 16.7342 6.11087 16.4816 6.29303 16.293L10.586 12L6.29303 7.707C6.10556 7.51947 6.00024 7.26516 6.00024 7C6.00024 6.73484 6.10556 6.48053 6.29303 6.293ZM12.293 6.293C12.4806 6.10553 12.7349 6.00021 13 6.00021C13.2652 6.00021 13.5195 6.10553 13.707 6.293L18.707 11.293C18.8945 11.4805 18.9998 11.7348 18.9998 12C18.9998 12.2652 18.8945 12.5195 18.707 12.707L13.707 17.707C13.5184 17.8892 13.2658 17.99 13.0036 17.9877C12.7414 17.9854 12.4906 17.8802 12.3052 17.6948C12.1198 17.5094 12.0146 17.2586 12.0124 16.9964C12.0101 16.7342 12.1109 16.4816 12.293 16.293L16.586 12L12.293 7.707C12.1056 7.51947 12.0002 7.26516 12.0002 7C12.0002 6.73484 12.1056 6.48053 12.293 6.293Z"
                            fill="#09244B"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_56_140">
                            <rect width="24" height="24" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="box2 inline-flex flex-col items-start gap-[50px] order-3 mt-28 md:mt-6 md:mt-0">
              <div className="flex flex-col gap-[10px] pr-0 md:pr-[70px]">
                <h3 className="text-black text-2xl font-bold leading-[29px] tracking-[-0.24px]">
                  Fresh
                </h3>
                <p className="text-black/60 text-sm font-medium leading-[17px] tracking-[-0.14px] w-full md:w-[222px]">
                  {theme.clubIntroduction2}
                </p>
                <a
                  href={theme.clubLink2}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="inline-flex items-center gap-1 cursor-pointer">
                    <span className="text-black text-sm font-medium leading-[17px] tracking-[-0.14px]">
                      Read more
                    </span>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_56_140)">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.29303 6.293C6.48056 6.10553 6.73487 6.00021 7.00003 6.00021C7.26519 6.00021 7.5195 6.10553 7.70703 6.293L12.707 11.293C12.8945 11.4805 12.9998 11.7348 12.9998 12C12.9998 12.2652 12.8945 12.5195 12.707 12.707L7.70703 17.707C7.51843 17.8892 7.26583 17.99 7.00363 17.9877C6.74143 17.9854 6.49062 17.8802 6.30521 17.6948C6.1198 17.5094 6.01463 17.2586 6.01236 16.9964C6.01008 16.7342 6.11087 16.4816 6.29303 16.293L10.586 12L6.29303 7.707C6.10556 7.51947 6.00024 7.26516 6.00024 7C6.00024 6.73484 6.10556 6.48053 6.29303 6.293ZM12.293 6.293C12.4806 6.10553 12.7349 6.00021 13 6.00021C13.2652 6.00021 13.5195 6.10553 13.707 6.293L18.707 11.293C18.8945 11.4805 18.9998 11.7348 18.9998 12C18.9998 12.2652 18.8945 12.5195 18.707 12.707L13.707 17.707C13.5184 17.8892 13.2658 17.99 13.0036 17.9877C12.7414 17.9854 12.4906 17.8802 12.3052 17.6948C12.1198 17.5094 12.0146 17.2586 12.0124 16.9964C12.0101 16.7342 12.1109 16.4816 12.293 16.293L16.586 12L12.293 7.707C12.1056 7.51947 12.0002 7.26516 12.0002 7C12.0002 6.73484 12.1056 6.48053 12.293 6.293Z"
                          fill="#09244B"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_56_140">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </a>
              </div>

              {/* Decorative Image Section */}
              <div
                className="flex w-full items-center gap-[10px] rounded-[50px] px-[5px] py-[5px] pr-6 md:pr-[155px]"
                style={{
                  backgroundColor: "#927361",
                  backgroundImage: "url(/p10.png)",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="inline-flex items-center justify-center gap-[10px] rounded-[50px] bg-black/10 p-[10px]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_54_893)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.66895 4.76C5.69576 4.53284 5.77524 4.31509 5.90106 4.12407C6.02689 3.93306 6.19558 3.77407 6.3937 3.65976C6.59182 3.54545 6.81389 3.47899 7.04223 3.46566C7.27058 3.45233 7.49888 3.49251 7.70895 3.583C8.77095 4.037 11.1509 5.116 14.1709 6.859C17.1919 8.603 19.3169 10.126 20.2399 10.817C21.0279 11.408 21.0299 12.58 20.2409 13.173C19.3269 13.86 17.2279 15.363 14.1709 17.129C11.1109 18.895 8.75895 19.961 7.70695 20.409C6.80095 20.796 5.78695 20.209 5.66895 19.232C5.53095 18.09 5.27295 15.497 5.27295 11.995C5.27295 8.495 5.52995 5.903 5.66895 4.76Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_54_893">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="w-full inline-flex items-start gap-[5px] flex-wrap justify-center md:justify-start">
                <div className="h-[93px] inline-flex flex-col items-center justify-center gap-1 rounded-[5px] bg-[#ffe7e2] px-5 py-[10px]">
                  <span className="text-black text-lg font-bold leading-6 tracking-[-0.2px] text-center">
                    {theme.blockText1}
                  </span>
                  {/* <span className="text-black text-sm leading-[17px] tracking-[-0.14px] text-center">
                    with summer
                  </span> */}
                </div>

                <div className="flex flex-col gap-[5px]">
                  <div className="flex items-center gap-[10px] rounded-[5px] bg-[#f9e1f1] px-5 py-[10px]">
                    <span className="text-black text-md font-bold leading-6 tracking-[-0.2px]">
                      {theme.blockText2}
                    </span>
                    {/* <span className="text-black text-sm leading-[17px] tracking-[-0.14px]">
                      Join us
                    </span> */}
                  </div>
                  <div className="flex items-center gap-[10px] rounded-[5px] bg-[#ede5fd] px-5 py-[10px]">
                    <span className="text-black text-md font-bold leading-6 tracking-[-0.2px]">
                      {theme.blockText3}
                    </span>
                    {/* <span className="text-black text-sm leading-[17px] tracking-[-0.14px]">
                      wealth
                    </span> */}
                  </div>
                </div>
              </div>

              {/* Connect Wallet Button */}
              <ConnectButton
                className="m-auto inline-flex items-center gap-[5px] px-5 py-[10px] rounded-[30px] text-white text-sm font-bold leading-[17px] tracking-[-0.14px]"
                style={{
                  background:
                    "linear-gradient(90deg, #8384f0 0%, #7135ff 100%)",
                }}
                icon="/arrowRight.png"
              />
            </div>

            {/* Background Hero Image */}
            <div className="box3 relative md:absolute md:top-[-18px] md:left-[328px] w-full md:w-[437px] h-[320px] md:h-[605px] order-2">
              <div
                className="md:absolute md:top-[42px] md:left-[42px] w-full md:w-[380px] h-[450px] md:h-[580px] rounded-[24px] overflow-hidden"
                style={{
                  backgroundImage: `url(${theme.heroImg})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              />
              <div className="absolute top-16 right-2 md:top-[100px] md:left-[330px] md:right-auto inline-flex items-center justify-center gap-[10px] rounded-[50px] bg-[#e5e0fe] p-[15px] w-[62px] h-[62px]">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path
                    d="M9.33334 22.6667L22.6667 9.33337M22.6667 9.33337H9.33334M22.6667 9.33337V22.6667"
                    stroke="#8384F0"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Join The Option Section */}
        {theme.showMemberOption ? (
          <div className="flex flex-col items-center justify-center px-5 sm:px-8 md:px-[60px] py-[40px] md:py-[60px] gap-5">
            <h2 className="text-black text-[32px] font-bold leading-[38px] tracking-[-0.32px] text-center w-full max-w-[381px] mx-auto md:mx-0">
              Join The Option
            </h2>

            <div
              className="w-full inline-flex items-start justify-center gap-5 rounded-[40px] px-[10px] py-[40px] flex-wrap"
              style={{ background: "#e4bafa" }}
            >
              {[
                lifetimePrice && {
                  icon: theme?.lifeTimeImg,
                  title: "Lifetime Member",
                  price: `${lifetimePrice} ETH`,
                  type: "lifetime",
                  description: "For organizing every corner of your work life.",
                  bgColor: "#ffedf9",

                  containerClass: "relative",
                  cardClass:
                    "flex flex-col items-start gap-4 rounded-[50px] bg-white p-[30px] shadow-[10px_10px_0px_0px_rgba(0,0,0,0.25)]",
                },
                monthPrice && {
                  icon: theme?.monthImg,
                  title: "Monthly Membership",
                  price: `${monthPrice} ETH`,
                  type: "month",
                  description:
                    "A place for small groups to plan get organized.",
                  bgColor: "#dde3e1",

                  containerClass: "",
                  cardClass:
                    "flex flex-col items-start gap-4 rounded-[50px] bg-white p-[30px] shadow-[10px_10px_0px_0px_rgba(0,0,0,0.25)]",
                },
                quarterPrice && {
                  icon: theme?.quarterImg,
                  title: "Quarterly Membership",
                  price: `${quarterPrice} ETH`,
                  type: "quarter",
                  description:
                    "Perfect for seasonal planning and organization.",
                  bgColor: "#e6f3ff",

                  containerClass: "",
                  cardClass:
                    "flex flex-col items-start gap-4 rounded-[50px] bg-white p-[30px] shadow-[10px_10px_0px_0px_rgba(0,0,0,0.25)]",
                },
                yearPrice && {
                  icon: theme?.yearImg,
                  title: "Yearly Membership",
                  price: `${yearPrice} ETH`,
                  type: "year",
                  description:
                    "For companies using PRODUCT NAME to connect several teams tools.",
                  bgColor: "#fee6e6",

                  containerClass: "relative ",
                  cardClass:
                    "flex flex-col items-start gap-4 rounded-[50px] bg-white p-[30px] w-[268px] h-[234px] shadow-[10px_10px_0px_0px_rgba(0,0,0,0.25)]",
                },
              ]
                .filter(Boolean)
                .map((option, index) => (
                  <div key={index} className={"w-full max-w-[268px]"}>
                    <div
                      className={option.cardClass}
                      style={{
                        transform: `rotate(${index % 2 === 0 ? -10 : 10}deg)`,
                      }}
                    >
                      <div className="inline-flex items-center gap-[10px]">
                        <img
                          src={option.icon || "/default-icon.png"}
                          alt={option.title}
                          className="w-12 h-12 rounded-[20px]"
                        />
                        <div className="flex flex-col gap-1">
                          <p className="text-black text-sm font-bold leading-[17px] tracking-[-0.14px]">
                            {option.title}
                          </p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M8 1L10.09 5.26L15 6L11 9.74L11.91 14.5L8 12.27L4.09 14.5L5 9.74L1 6L5.91 5.26L8 1Z"
                                  fill="#FFD700"
                                />
                              </svg>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-black text-sm leading-[17px] tracking-[-0.14px] w-[208px]">
                        {option.description}
                      </p>
                      <div className="flex items-center justify-between w-full">
                        <button
                          onClick={() => handleJoin(option.type)}
                          className="inline-flex items-center gap-[5px] rounded-[30px] px-5 py-[10px] hover:opacity-80 transition-opacity cursor-pointer"
                          style={{ backgroundColor: option.bgColor }}
                        >
                          <span className="text-black text-sm font-bold leading-[17px] tracking-[-0.14px]">
                            {option.price}
                          </span>
                        </button>
                        <svg
                          width="38"
                          height="37"
                          viewBox="0 0 38 37"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.33518 36.335L5.08061 30.0428C6.92459 29.8802 8.31361 29.3306 9.24764 28.3941C10.1747 27.4181 10.6944 26.2094 10.8066 24.7678C10.9513 23.2799 10.7687 21.6669 10.2587 19.9288L2.67801 21.2655L0 6.0777L14.6283 3.49834L17.4105 19.2771C18.3205 24.4381 17.7843 28.5543 15.8018 31.6256C13.8194 34.6969 10.3305 36.2667 5.33518 36.335ZM25.1752 32.8367L24.9206 26.5445C26.7646 26.3818 28.1536 25.8322 29.0876 24.8957C30.0147 23.9198 30.5344 22.7111 30.6466 21.2695C30.7913 19.7816 30.6087 18.1685 30.0986 16.4305L22.518 17.7671L19.84 2.57937L34.4683 1.15037e-05L37.2505 15.7787C38.1605 20.9398 37.6243 25.056 35.6418 28.1273C33.6593 31.1985 30.1705 32.7684 25.1752 32.8367Z"
                            fill="#DDE3E1"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ) : null}

        {/* Position Verification Section */}
        {verifyData?.length ? (
          <div className="px-5 sm:px-8 md:px-[60px]">
            <div
              className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-[40px] rounded-[40px] px-5 sm:px-8 md:px-[60px] py-[30px] md:py-[40px]"
              style={{ background: "#f2eaff" }}
            >
              <h2 className="text-black text-[32px] md:text-[40px] font-bold leading-[38px] md:leading-[48px] tracking-[-0.4px] w-full md:w-[250px] text-center md:text-left">
                Position Verification
              </h2>

              <div className="flex flex-wrap items-stretch justify-center md:justify-start gap-4 md:gap-[30px] w-full">
                {verifyData.map((item, index) => (
                  <div
                    key={index}
                    className="inline-flex flex-col items-start justify-center gap-[5px] rounded-[30px] px-5 py-[10px] w-full sm:w-[260px]"
                    style={{
                      background: "#cecffd",
                      outline: "10px solid rgba(206, 207, 253, 0.6)",
                    }}
                  >
                    <div className="inline-flex flex-col items-start justify-center h-[40px] gap-[10px]">
                      <img
                        src={
                          theme?.verifyImgs?.[index] ||
                          theme?.verifyImgs?.[0] ||
                          "/aave.png"
                        }
                        alt={item.chainName}
                        className="h-10 object-contain"
                      />
                    </div>
                    <h3 className="text-[#050505] text-lg font-bold leading-6 tracking-[-0.13px] w-[190px] h-6">
                      {item.chainName} Chain
                    </h3>
                    <p className="text-[#121212] text-base leading-[23px] tracking-[0.01px]">
                      Hold {item.tokenSymbol}≥
                      {formatUnits(item.threshold, item.decimals)}
                    </p>
                    <div
                      className="inline-flex items-center gap-[5px] rounded-[30px] bg-white px-5 py-[10px] cursor-pointer"
                      onClick={() => handleVerify(item)}
                    >
                      <span className="text-black text-sm font-bold leading-[17px] tracking-[-0.14px]">
                        Verify
                      </span>
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.707 5.63598L20.364 11.293C20.5515 11.4805 20.6568 11.7348 20.6568 12C20.6568 12.2651 20.5515 12.5194 20.364 12.707L14.707 18.364C14.5184 18.5461 14.2658 18.6469 14.0036 18.6447C13.7414 18.6424 13.4906 18.5372 13.3052 18.3518C13.1198 18.1664 13.0146 17.9156 13.0123 17.6534C13.01 17.3912 13.1108 17.1386 13.293 16.95L17.243 13H4C3.73478 13 3.48043 12.8946 3.29289 12.7071C3.10536 12.5195 3 12.2652 3 12C3 11.7348 3.10536 11.4804 3.29289 11.2929C3.48043 11.1053 3.73478 11 4 11H17.243L13.293 7.04998C13.1975 6.95773 13.1213 6.84739 13.0689 6.72538C13.0165 6.60338 12.9889 6.47216 12.9877 6.33938C12.9866 6.2066 13.0119 6.07492 13.0622 5.95202C13.1125 5.82913 13.1867 5.71747 13.2806 5.62358C13.3745 5.52969 13.4861 5.45544 13.609 5.40516C13.7319 5.35487 13.8636 5.32957 13.9964 5.33073C14.1292 5.33188 14.2604 5.35947 14.3824 5.41188C14.5044 5.46428 14.6148 5.54047 14.707 5.63598Z"
                          fill="#09244B"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* Links & Apps Section */}
        <div className="flex flex-col items-center justify-center px-5 sm:px-8 md:px-[60px] md:px-[100px] py-[40px] md:py-[60px] gap-[30px]">
          <h2 className="text-black text-[32px] font-bold leading-[38px] tracking-[-0.32px] text-center w-full max-w-[381px] mx-auto md:mx-0">
            Links & Apps
          </h2>

          <div className="flex items-start justify-center gap-[10px] md:gap-[30px] flex-wrap">
            {theme?.socials?.map((app, index) => (
              <div
                key={index}
                className="flex px-5 py-[30px] flex-col justify-center items-center gap-5 rounded-[1.25rem] bg-[#F8F8F8]"
              >
                <div className="size-[64px] rounded-lg flex items-center justify-center mx-auto">
                  <img
                    src={app.icon}
                    alt={app.name}
                    className="w-full object-contain"
                  />
                </div>
                <div
                  className="inline-flex items-center gap-[5px] px-5 py-[10px] rounded-[30px] cursor-pointer"
                  style={{
                    background:
                      index % 3 === 0
                        ? "#ffc1cc"
                        : index % 3 === 1
                        ? "#ffeb9c"
                        : "#e1c4fd",
                  }}
                >
                  <span className="text-black text-lg font-bold leading-[22px] tracking-[-0.18px]">
                    {app.name}
                  </span>
                </div>
                <button
                  onClick={() => window.open(app.link, "_blank")}
                  style={{
                    background:
                      "linear-gradient(90deg, #8384F0 0%, #7135FF 100%), #FFF",
                  }}
                  className="text-[#FFF] lining-nums tabular-nums font-[Inter] text-3.5 font-not-italic font-500 lh-normal flex px-5 py-2.5 items-center gap-1.25 rounded-[1.875rem]"
                >
                  <span>{app.text}</span>
                  <ArrowRightIcon />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Community News Section */}
        {theme?.news && theme.news.length > 0 && (
          <div className="px-5 sm:px-8 md:px-[100px] pb-[40px] md:pb-[60px]">
            <h2 className="text-black text-[32px] font-bold leading-[38px] tracking-[-0.32px] text-center mb-[40px]">
              Community News
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-[40px]">
              {currentNewsData.map((news, index) => (
                <div
                  key={index}
                  className="flex-1 cursor-pointer"
                  onClick={() => window.open(news.link, "_blank")}
                >
                  <div
                    className="w-full h-[260px] md:h-[280px] rounded-[40px] mb-4 bg-cover bg-center relative"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(255, 237, 249, 0) 0%, #FFEDF9 63.57%), url(${news.image})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: "#FFEDF9",
                    }}
                  >
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-black text-[18px] font-bold mb-2">
                        {news.title}
                      </h3>
                      <p className="text-[rgba(0,0,0,0.60)] text-[14px] leading-[17px] tracking-[-0.14px]">
                        {news.category}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage <= 1}
                className="flex items-center justify-center w-8 h-8 bg-[#E4BAFA] rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M10 12l-4-4 4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium ${
                      currentPage === i + 1
                        ? "bg-[#E4BAFA] text-white"
                        : "bg-[#ffffff] text-black hover:bg-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() =>
                  handlePageChange(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage >= totalPages}
                className="flex items-center justify-center w-8 h-8 bg-[#E4BAFA] rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 12l4-4-4-4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col items-center gap-4 px-5 sm:px-8 md:px-[60px] md:px-[100px] py-[40px]">
          <img src="/Union2.png" className="w-[118px]" alt="" />

          <p className="text-black text-base font-bold leading-[19px] tracking-[-0.16px] uppercase">
            {domainName}.web3.club
          </p>
          <div className="flex px-[30px] py-2.5 items-center gap-3 rounded-[2.5rem] bg-[#F2EAFF]">
            <span className="text-black text-sm">Powered by </span>
            <span className="text-[#7135ff] text-sm font-medium underline">
              Web3.Club
            </span>
            <span className="text-black text-sm"> and </span>
            <span className="text-[#7135ff] text-sm font-medium underline">
              OrbitLink.Me
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

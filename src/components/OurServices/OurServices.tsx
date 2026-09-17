import { useState } from "react";
import { OurServices } from "../shared/helpers";

export const Ourservices = () => {
    const [currentServiceIndex, setCurrentServiceIndex] = useState(0);
    const totalServices = OurServices.length;

    const handleNextService = () => {
        setCurrentServiceIndex((currentServiceIndex + 1) % totalServices);
    };

    const handlePreviousService = () => {
        setCurrentServiceIndex((currentServiceIndex - 1 + totalServices) % totalServices);
    };
    return (
        <div className="Our-Services flex flex-col px-5 tab:px-[42px]  lg:px-6 lg:mt-[150px] tab:mt-[100px] mt-[60px] lg:gap-[80px] tab:gap-[50px] md:gap-[40px] gap-[30px]">
            <p className="w-full text-center font-bold font-Montserrat lg:text-[40px]  tab:text-[30px]  mb:text-[20px] text-[18px]">Our Services</p>

            <div className="flex flex-col items-center gap-5 justify-center md:hidden">
                <div className="Our-details w-full flex justify-center items-center sm:flex-row">
                    <button onClick={handlePreviousService} className="!flex items-center justify-center max-w-[52px] w-full h-[52px]">
                        <LeftIcon />
                    </button>
                    <div
                        className="Our-Options text-center bg-[#f1f1f1] bg-opacity-40 p-4 w-3/4 !py-4 justify-center"
                        style={{ backgroundColor: '#F1F1F1' }}
                    >
                        <LowIcon />
                        <p className="text-black lg:text-[20px] text-[16px] font-Montserrat font-semibold">{OurServices[currentServiceIndex].title}</p>
                    </div>
                    <button onClick={handleNextService} className="!flex items-center justify-center max-w-[52px] w-full h-[52px]">
                        <RightIcon />
                    </button>
                </div>
                <div className="Service-Description bg-[#f1f1f1] p-4 w-full text-center">
                    <ul className="service-Contant">
                        {OurServices[currentServiceIndex].description.split("\n").map((line, index) => (
                            <li key={index} className="xl:text-[18px] lg:text-[14px] md:text-[12px] text-[12px] font-Montserrat text-start font-medium text-[#0C192B]">{line}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="hidden md:flex gap-9 justify-center">
                <div className="Our-details md:flex md:flex-col md:gap-5 justify-between relative">
                    {OurServices.map((data, idx) => (
                        <div
                            key={idx}
                            className={`flex relative`}
                            onClick={() => setCurrentServiceIndex(idx)}
                        >
                            {currentServiceIndex === idx && (
                                <div className="absolute sm:left-[108%] lg:left-[108%] xl:left-[107%] top-[48%] p-[10px] bg-[#717171] bg-opacity-10 rotate-[46deg] z-[-1]"></div>
                            )}
                            <div
                                className={`Our-Options ${currentServiceIndex === idx ? 'bg-opacity-40' : ''
                                    } hover:!bg-[#0C192B] hover:!bg-opacity-40 cursor-pointer` }
                                style={{
                                    backgroundColor:
                                        currentServiceIndex === idx
                                            ? 'rgba(12, 25, 43, 0.4)'
                                            : '#f1f1f1',
                                }}
                            >
                                <LowIcon />
                                <p
                                    className={`${currentServiceIndex === idx
                                        ? 'text-black'
                                        : 'text-[#3B3C43]'
                                        } lg:text-[20px] tab:text-[16px] font-Montserrat font-semibold cursor-pointer`}
                                >
                                    {data.title}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="Service-Description relative bg-[#f1f1f1] p-6 xl:!w-[791px] md:w-[614px]">
                    <ul className="service-Contant">
                        {OurServices[currentServiceIndex].description.split('\n').map((line, index) => (
                            <li
                                key={index}
                                className="lg:text-[18px] tab:text-[14px] text-[12px] font-Montserrat text-start font-medium text-[#0C192B]"
                            >
                                {line}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

const LowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <g style={{ clipPath: "url(#clip0_402_3111)" }} >
            <path d="M0.099144 9.75283L3.04602 3.18181C3.04611 3.18163 3.0462 3.18145 3.04629 3.18127L3.05012 3.17273C3.05999 3.15075 3.07174 3.1301 3.08473 3.11043C3.08821 3.10509 3.09239 3.10029 3.09604 3.09521C3.10769 3.07902 3.12024 3.0638 3.13377 3.04947C3.13911 3.04386 3.14454 3.03835 3.15015 3.03301C3.1651 3.01886 3.18085 3.00577 3.19758 2.99385C3.20194 2.99064 3.20595 2.98708 3.21049 2.98406C3.23149 2.97017 3.25374 2.95825 3.27688 2.94801C3.28346 2.94508 3.29032 2.94294 3.29708 2.94036C3.31524 2.93342 3.33366 2.92763 3.35271 2.92309C3.36054 2.92123 3.36828 2.91936 3.3762 2.91793C3.40228 2.91313 3.4288 2.90992 3.45594 2.90992H8.65587C8.74487 2.63305 8.91779 2.39427 9.14402 2.22135V1.57505C9.14402 1.32933 9.34329 1.13007 9.58901 1.13007H10.4197C10.6654 1.13007 10.8647 1.32933 10.8647 1.57505V2.23194C11.0841 2.40397 11.2516 2.63884 11.3387 2.91001H16.5528C16.5799 2.91001 16.6064 2.9133 16.6325 2.91802C16.6405 2.91944 16.6482 2.92131 16.656 2.92318C16.6751 2.92772 16.6936 2.93351 16.7116 2.94045C16.7184 2.94303 16.7253 2.94517 16.7318 2.9481C16.755 2.95834 16.7772 2.97017 16.7982 2.98415C16.8028 2.98717 16.8068 2.99073 16.8111 2.99394C16.8279 3.00586 16.8436 3.01886 16.8586 3.03309C16.8643 3.03843 16.8696 3.04395 16.875 3.04956C16.8887 3.06389 16.9011 3.07919 16.9128 3.0953C16.9165 3.10047 16.9206 3.10527 16.9241 3.11052C16.9371 3.13019 16.9488 3.15084 16.9587 3.17282L16.9625 3.18136C16.9626 3.18154 16.9627 3.18172 16.9628 3.1819L19.9202 9.77615C19.9702 9.84815 20 9.93528 20 10.0296C20 11.9304 18.4536 13.4768 16.5528 13.4768C14.652 13.4768 13.1056 11.9304 13.1056 10.0296C13.1056 9.93528 13.1353 9.84824 13.1854 9.77624L15.8655 3.79981H11.3279C11.2383 4.05834 11.076 4.28253 10.8648 4.44824V15.6068H14.8107C14.9773 15.6068 15.1299 15.6998 15.2063 15.8478L16.4303 18.2211C16.5014 18.359 16.4956 18.5241 16.4148 18.6567C16.334 18.7892 16.1901 18.8701 16.0348 18.8701H3.974C3.97346 18.87 3.97293 18.8701 3.97222 18.8701C3.72649 18.8701 3.52723 18.6708 3.52723 18.4251C3.52723 18.3379 3.55233 18.2565 3.59567 18.1879L4.80274 15.8478C4.8791 15.6998 5.03173 15.6068 5.19824 15.6068H9.14411V4.45883C8.92616 4.29214 8.7584 4.06404 8.66682 3.79981H4.14327L6.85546 9.84753C6.85617 9.84913 6.85653 9.85073 6.85724 9.85233C6.85929 9.85714 6.8608 9.86212 6.86276 9.86702C6.87077 9.8874 6.87717 9.90822 6.88207 9.92923C6.88332 9.93474 6.88492 9.94008 6.88599 9.9456C6.89088 9.97114 6.89337 9.99686 6.89373 10.0227C6.89373 10.0251 6.89444 10.0272 6.89444 10.0296C6.89444 11.9304 5.34802 13.4768 3.44722 13.4768C1.54642 13.4768 0 11.9304 0 10.0296C0 9.92442 0.0380917 9.82901 0.099144 9.75283ZM14.2467 9.58463H18.8589L16.5528 4.44228L14.2467 9.58463ZM9.47821 3.34005C9.47821 3.62635 9.71111 3.85917 9.99733 3.85917C10.2836 3.85917 10.5165 3.62626 10.5165 3.34005C10.5165 3.05374 10.2836 2.82092 9.99733 2.82092C9.71111 2.82084 9.47821 3.05374 9.47821 3.34005ZM5.76222 9.58463L3.45603 4.44228L1.14993 9.58463H5.76222Z" fill="black" />
        </g>
        <defs>
            <clipPath id="clip0_402_3111">
                <rect width="20" height="20" fill="white" transform="matrix(-1 0 0 1 20 0)" />
            </clipPath>
        </defs>
    </svg >
)

const RightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
        <path d="M0.0002378 11.0046L-4.80996e-07 0.996089C-5.05031e-07 0.446248 0.452854 -1.97949e-08 1.01083 -4.4185e-08C1.27413 -5.56939e-08 1.51387 0.0991401 1.69392 0.261796L7.63407 5.10513C8.06361 5.45505 8.12355 6.08247 7.76845 6.50575C7.73301 6.54794 7.69424 6.58684 7.65357 6.62223L1.67418 11.7555C1.25367 12.1164 0.615064 12.0726 0.249022 11.6582C0.0822939 11.4696 0.000475654 11.2366 0.0002378 11.0046Z" fill="#3B3C43" />
    </svg>
)

const LeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
        <path d="M7.99976 11.0046L8 0.996089C8 0.446248 7.54715 -1.97949e-08 6.98917 -4.4185e-08C6.72587 -5.56939e-08 6.48613 0.0991401 6.30608 0.261796L0.365933 5.10513C-0.0636117 5.45505 -0.123548 6.08247 0.231552 6.50575C0.266991 6.54794 0.305759 6.58684 0.346431 6.62223L6.32582 11.7555C6.74633 12.1164 7.38494 12.0726 7.75098 11.6582C7.91771 11.4696 7.99952 11.2366 7.99976 11.0046Z" fill="#3B3C43" />
    </svg>
)
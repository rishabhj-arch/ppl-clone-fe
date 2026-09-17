import Vector from "../Image/Vector.png";
import Footer1 from "../Image/Footer1.svg";
import Footer2 from "../Image/Footer2.jpg";
import Footer3 from "../Image/Footer3.svg";
import { NavLink } from "react-router-dom";

interface IconProps {
  className?: string | undefined;
}

export const Footer = () => {
  return (
    <footer className="w-full">
      <div>
        <div className="mx-auto max-w-7xl px-5 tab:px-[42px] lg:px-6">
          <div className="lg:pt-[150px] md:pt-[100px] pt-[60px] flex items-center flex-col xl:gap-[50px] md:gap-10 gap-[30px] mx-[6px]">
            <div className="flex justify-center">
              <p className="font-bold font-Montserrat lg:text-[50px] mb:text-[30px] text-[21px]">
                PAUL <span className="text-[#3B3C43]">&</span> PAUL LAWYERS
              </p>
            </div>
            <div className="max-sm:max-w-sm max-sm:mx-auto !mx-0 flex justify-between w-full sm:flex-row flex-col md:gap-0 gap-5">
              <p className="w-full xl:max-w-[439px] lg:max-w-[384px] md:max-w-[372px] max-w-[290px] lg:text-[16px] mb:text-[14px] text-[12px] text-[#3B3C43] font-Montserrat font-medium text-start lg:text-left">
                With over 25 years experience, Paul & Paul Lawyers combine deep
                legal expertise with a forward-thinking approach, always focused
                on securing the best outcomes for our clients.
              </p>
              <div className="text-right">
                <ul className="text-sm transition-all duration-500 flex items-end flex-col">
                  <li className="xl:mb-[21px] mb-[15px]">
                    <div className="flex gap-[10px] items-center">
                      <div className="flex flex-col">
                        <a
                          href="mailto:info@pplawyers.com.au"
                          className="text-[#3B3C43] font-medium font-Montserrat hover:text-gray-900 lg:text-[16px] mb:text-[14px] text-[10px]"
                        >
                          info@pplawyers.com.au
                        </a>
                      </div>
                      <EmailIcon />
                    </div>
                  </li>
                  <li className="xl:mb-[21px] mb-[15px]">
                    <div className="flex gap-[10px] items-center">
                      <div className="flex flex-col">
                        <a
                          href="tel:0280053039"
                          className="text-[#3B3C43] font-medium font-Montserrat hover:text-gray-900 lg:text-[16px] mb:text-[14px] text-[10px]"
                        >
                          02 8005 3039
                        </a>
                      </div>
                      <PhoneIcon />
                    </div>
                  </li>
                  <li className="xl:mb-[21px] mb-[15px]">
                    <div className="flex gap-[10px] items-center">
                      <div className="flex flex-col">
                        <p className="text-[#3B3C43] font-medium font-Montserrat hover:text-gray-900 lg:text-[16px] mb:text-[14px] text-[10px]">
                          Level 13, 111 Elizabeth Street, Sydney, NSW 2000
                        </p>
                      </div>
                      <AddressIcon />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex gap-[20px] sm:gap-[66px] w-full justify-center items-center lg:mt-[50px] sm:mt-10 mt-5">
            <img
              src={Footer1}
              alt="FooterImage"
              className="lg:h-[78px] sm:h-[63px] h-[30px] xl:w-[181px] md:w-[148px] w-[102px]"
            />
            <img
              src={Footer2}
              alt="FooterImage"
              className="lg:h-[78px] sm:h-[63px] h-[30px] xl:w-[126px] md:w-[99px] w-[70px] object-contain"
            />
            <img
              src={Footer3}
              alt="FooterImage"
              className="lg:h-[78px] sm:h-[63px] h-[30px] xl:w-[206px] md:w-[165px] w-[113px]"
            />
          </div>
        </div>
        <div className="pt-7 mx-auto max-w-[83rem]">
          <div className="flex items-center justify-center flex-col lg:justify-center lg:flex-col lg:gap-[30px] md:gap-[21px]">
            <div className="flex flex-wrap xl:w-full md:w-auto max-w-[900px] w-full gap-x-[4px] md:gap-x-[10px] items-center justify-center lg:text-[12px] sm:text-[12px] text-[6px]">
              <div className="w-full sm:w-auto flex items-center justify-center sm:gap-[10px] gap-[6px]">
                <p className="lg:text-[12px] mb:text-[12px] text-[6px] pl-[5px] text-[#717171]">
                  Liability limited by a scheme approved under Professional
                  Standards Legislation
                </p>

                <span className="text-[#717171] sm:inline-block hidden">|</span>
              </div>
              <div className="w-auto flex items-center sm:gap-[10px] gap-[6px]">
                <p className="lg:text-[12px] sm:text-[12px] text-[6px] pl-[5px] text-[#717171]">
                  © Copyright 2025 Paul & Paul Lawyers. All Rights Reserved
                </p>

                <span className="text-[#717171] sm:inline-block lg:hidden mb:hidden">|</span>
              </div>
              <div className="w-auto flex items-center sm:gap-[10px] gap-[6px]">
                <NavLink
                  to={"/terms&use"}
                  className="lg:text-[12px] sm:text-[12px] text-[6px] text-[#717171] font-Montserrat"
                >
                  Terms of Use
                </NavLink>

                <span className="text-[#717171]">|</span>
              </div>
              <div className="w-auto flex items-center sm:gap-[10px] gap-[6px]">
                <a
                  href="https://igeektech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <p className="lg:text-[12px] sm:text-[12px] text-[6px] text-[#717171]">
                    Designed and developed by{" "}
                    <span className="text-[#0C192B] font-bold font-Montserrat lg:text-[12px] sm:text-[12px] text-[7px]">
                      iGeek
                    </span>
                  </p>
                </a>
                <span className="text-[#717171]">|</span>
              </div>
              <div className="w-auto flex items-center">
                <NavLink
                  to={""}
                  className="lg:text-[12px] sm:text-[12px] text-[6px] text-[#717171] font-Montserrat"
                >
                  Privacy Policies
                </NavLink>
              </div>
            </div>
            <img
              src={Vector}
              alt="Vector"
              className="w-full xl:h-[75px] h-[53px] object-cover"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export const EmailIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="14"
    viewBox="0 0 22 14"
    fill="none"
    className={className}
  >
    <g clipPath="url(#clip0_402_3300)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.9316 11.7533L15.2686 7.43946L21.8638 14H13.1902H8.67306H0L6.59499 7.43946L10.9316 11.7533ZM0.25083 0L10.9314 10.6244L21.6122 0H0.25083ZM0 12.4088L5.66203 6.77586L0 1.14341V12.4088ZM22 12.9476L15.7958 6.77586L22 0.604297V12.9476Z"
        fill="#0C192B"
      />
    </g>
    <defs>
      <clipPath id="clip0_402_3300">
        <rect width="22" height="14" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    className={className}
  >
    <path
      d="M5.23122 10.4776C5.87038 11.6691 6.60443 12.8125 7.56227 13.8576C8.51833 14.9084 9.71071 15.8627 11.254 16.6781C11.3686 16.7355 11.4778 16.7355 11.5727 16.6966C11.7195 16.6392 11.8699 16.5131 12.0167 16.3612C12.1313 16.2426 12.2727 16.0536 12.4213 15.8479C13.0139 15.0399 13.7498 14.0374 14.7864 14.5377C14.8097 14.5489 14.8276 14.5618 14.8491 14.5729L18.3098 16.6317C18.3206 16.6373 18.3331 16.6503 18.3439 16.6558C18.8004 16.9801 18.9884 17.4823 18.9938 18.0494C18.9938 18.6275 18.7879 19.278 18.4871 19.8246C18.0896 20.5492 17.5006 21.0291 16.8238 21.346C16.1793 21.6536 15.4614 21.8186 14.7721 21.9242C13.6889 22.0891 12.6756 21.9835 11.6389 21.6536C10.6238 21.3293 9.60329 20.7919 8.48789 20.0785L8.40554 20.0248C7.89349 19.6949 7.34027 19.3391 6.79779 18.9222C4.81048 17.3693 2.78737 15.1289 1.46966 12.6624C0.363218 10.5906 -0.240135 8.3558 0.0892921 6.22473C0.271909 5.05728 0.755308 3.99545 1.60036 3.29313C2.3362 2.67975 3.32627 2.34249 4.60996 2.46109C4.75677 2.4722 4.88926 2.56115 4.95729 2.69087L7.17556 6.57126C7.49961 7.00674 7.54079 7.43851 7.36354 7.87028C7.21673 8.22423 6.91953 8.55037 6.51491 8.85428C6.39496 8.95991 6.25352 9.06739 6.10492 9.17857C5.60899 9.55105 5.04502 9.98096 5.23838 10.4887L5.23122 10.4776ZM13.1321 1.39926C13.0408 1.39185 12.9549 1.3659 12.8779 1.32514C12.7973 1.28251 12.7275 1.22507 12.6702 1.1565C12.6129 1.08609 12.5681 1.0064 12.5395 0.917454C12.5144 0.832211 12.5037 0.741409 12.5108 0.646901L12.5126 0.633929C12.5198 0.543127 12.5449 0.457885 12.5825 0.381908L12.5896 0.368936C12.629 0.291106 12.6827 0.222541 12.7454 0.168801C12.8116 0.109502 12.8904 0.0631745 12.9763 0.0335249C13.0569 0.00572842 13.1428 -0.00539018 13.2306 0.000169122L13.2485 0.00202222C13.8626 0.0520559 14.4552 0.148417 15.0245 0.289253C15.5992 0.431941 16.1471 0.622811 16.6645 0.854448C17.1855 1.08979 17.676 1.36961 18.1326 1.69205C18.5873 2.01449 19.0117 2.37955 19.3966 2.78538C19.7779 3.1875 20.1235 3.63039 20.4296 4.11034C20.7322 4.58659 20.9954 5.0999 21.2174 5.64471C21.4322 6.1784 21.6077 6.74545 21.7402 7.34586C21.8691 7.93329 21.9568 8.55037 21.9998 9.19525L22.0016 9.22675V9.26011C22.0016 9.34535 21.9872 9.42874 21.9604 9.50657C21.9317 9.58996 21.8888 9.66408 21.8333 9.72894C21.7778 9.7938 21.7115 9.84754 21.6363 9.88831C21.5665 9.92722 21.4859 9.95131 21.4018 9.96243L21.366 9.96614H21.332C21.2478 9.96799 21.1673 9.95317 21.0921 9.92352C21.0133 9.89387 20.9399 9.84939 20.8772 9.79195C20.811 9.73265 20.7555 9.65852 20.7161 9.57514C20.6785 9.49545 20.6534 9.40465 20.6481 9.312C20.6105 8.73939 20.5353 8.19458 20.4225 7.68127C20.3097 7.15684 20.1575 6.66206 19.9713 6.19693C19.7851 5.72995 19.5613 5.29262 19.3053 4.88865C19.0457 4.47911 18.7538 4.10478 18.4316 3.76381C18.1057 3.42099 17.7495 3.11338 17.3627 2.84097C16.9742 2.56671 16.5553 2.32952 16.1077 2.12938L16.1005 2.12567C15.6565 1.92739 15.1856 1.76432 14.6897 1.64202C14.1956 1.52527 13.6764 1.44188 13.1321 1.39926ZM11.6425 8.00741C11.5512 7.99815 11.4653 7.9685 11.3901 7.92773C11.3113 7.88326 11.2415 7.82396 11.1878 7.75354C11.1358 7.68683 11.0947 7.609 11.0678 7.52561C11.0427 7.44778 11.032 7.36439 11.0356 7.27914C11.0374 7.25505 11.0374 7.23652 11.041 7.21429C11.0535 7.12534 11.0821 7.04195 11.1215 6.96968C11.1627 6.8937 11.2182 6.82699 11.2827 6.77325C11.3471 6.71951 11.4223 6.67689 11.5029 6.64909C11.5781 6.625 11.6586 6.61203 11.7428 6.61574L11.8054 6.62129C12.0722 6.65094 12.3282 6.69912 12.5753 6.76398C12.8259 6.83069 13.0641 6.91594 13.2879 7.01601L13.295 7.01971C13.5224 7.12348 13.7355 7.24394 13.9342 7.38292C14.1347 7.52375 14.3209 7.68127 14.4928 7.85917C14.6629 8.03521 14.8168 8.22608 14.9529 8.43363C15.089 8.63932 15.2071 8.85984 15.3092 9.09704C15.4077 9.32867 15.49 9.57514 15.5545 9.83457C15.6171 10.0884 15.6619 10.359 15.6905 10.6444C15.6995 10.7389 15.6905 10.8315 15.6673 10.9168L15.6655 10.9242C15.6404 11.0094 15.5974 11.0891 15.5455 11.1577L15.5437 11.1614C15.4882 11.2318 15.4202 11.2893 15.3414 11.3337C15.2662 11.3763 15.1803 11.4041 15.089 11.4134H15.08C14.9923 11.4208 14.9064 11.4116 14.8258 11.3875C14.7398 11.3615 14.6611 11.317 14.593 11.2596H14.5912C14.5232 11.2022 14.4659 11.1317 14.423 11.0483C14.3818 10.9705 14.3549 10.8816 14.346 10.7889V10.7815C14.3263 10.5795 14.294 10.3868 14.2493 10.2033C14.2045 10.0162 14.1472 9.84198 14.0792 9.68076C14.0112 9.51954 13.9324 9.36944 13.8429 9.23231C13.7516 9.09333 13.6513 8.96732 13.5403 8.85243C13.4293 8.73753 13.3058 8.63376 13.1715 8.54111C13.0372 8.44845 12.8904 8.36691 12.7311 8.29464L12.7221 8.29094C12.5663 8.22052 12.398 8.16307 12.2208 8.11675C12.0346 8.06301 11.843 8.02965 11.6425 8.00741ZM12.3587 4.81638H12.3408L12.3175 4.81267C12.2333 4.8034 12.1546 4.77746 12.0847 4.7404C12.0095 4.69963 11.9433 4.64589 11.8878 4.58288C11.8305 4.51617 11.7857 4.4402 11.7571 4.35495C11.7302 4.27527 11.7159 4.19003 11.7177 4.09923V4.06772L11.7213 4.03807C11.7302 3.95283 11.7553 3.87129 11.7911 3.79902C11.8305 3.72119 11.8824 3.65078 11.9433 3.59518C12.0095 3.53403 12.0865 3.4877 12.1725 3.4562C12.2548 3.42655 12.3425 3.41358 12.4339 3.41914C12.9101 3.44879 13.3631 3.51179 13.791 3.6063C14.2206 3.70081 14.6271 3.82867 15.0048 3.98804C15.3862 4.14926 15.7424 4.34383 16.0719 4.56991C16.3977 4.79414 16.6985 5.05172 16.9689 5.34266C17.2374 5.62989 17.4773 5.94862 17.685 6.297C17.8909 6.64168 18.0681 7.016 18.2114 7.41813C18.351 7.81098 18.462 8.23349 18.5408 8.68565C18.6178 9.13039 18.6643 9.59923 18.6786 10.0977L18.6804 10.1237C18.6804 10.2126 18.6643 10.2997 18.6321 10.3794C18.5999 10.4628 18.5533 10.5369 18.496 10.6018C18.4369 10.6685 18.3635 10.7222 18.2812 10.7593C18.2042 10.7963 18.1165 10.8167 18.0252 10.8204H17.9947C17.9088 10.8186 17.8282 10.8019 17.753 10.7704C17.6725 10.737 17.6008 10.6888 17.54 10.6295C17.4755 10.5665 17.4236 10.4924 17.386 10.4072C17.3502 10.3256 17.3305 10.2367 17.3269 10.1403C17.3162 9.72524 17.2768 9.33423 17.2141 8.96547C17.1515 8.59299 17.0619 8.24646 16.9509 7.92773C16.8399 7.609 16.7039 7.31621 16.5463 7.04751C16.387 6.77695 16.2044 6.5342 16.0003 6.31368C15.7926 6.09316 15.5634 5.89488 15.311 5.72254C15.0567 5.54835 14.7757 5.39825 14.4749 5.27224L14.4677 5.26853C14.1633 5.14437 13.8375 5.04245 13.4884 4.96648C13.1375 4.8905 12.7633 4.83861 12.3694 4.81452L12.3587 4.81638Z"
      fill="#0C192B"
    />
  </svg>
);

export const AddressIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="22"
    height="21"
    viewBox="0 0 22 21"
    fill="none"
    className={className}
  >
    <g clipPath="url(#clip0_402_3294)">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.1099 14.7883C13.3311 15.6405 12.4233 16.4051 11.4028 17.0232C11.2775 17.1143 11.1074 17.1268 10.9678 17.0375C9.46208 16.0817 8.19629 14.933 7.20264 13.6861C5.83122 11.9693 4.96647 10.0649 4.67106 8.23198C4.37028 6.37226 4.65137 4.584 5.57878 3.12981C5.94401 2.55457 6.4113 2.03113 6.98063 1.57915C8.28939 0.537639 9.78434 -0.0108088 11.2721 -8.99776e-05C12.7062 0.0106289 14.1206 0.544784 15.3434 1.65776C15.7731 2.04721 16.1348 2.49383 16.4302 2.97796C17.4274 4.61616 17.6423 6.70633 17.2036 8.82509C16.7721 10.9171 15.6979 13.0447 14.1099 14.783V14.7883ZM4.5332 13.3163C4.8877 13.3163 5.17594 13.6039 5.17594 13.9576C5.17594 14.3114 4.8877 14.599 4.5332 14.599H3.3265L1.73665 19.7208H20.2168L18.4909 14.599H17.4937C17.1392 14.599 16.8509 14.3114 16.8509 13.9576C16.8509 13.6039 17.1392 13.3163 17.4937 13.3163H19.4093L21.9982 20.9999H0L2.38477 13.3163H4.5332ZM10.9893 3.30667C12.7581 3.30667 14.1904 4.73764 14.1904 6.4991C14.1904 8.26414 12.7563 9.69332 10.9893 9.69332C9.22038 9.69332 7.78988 8.26414 7.78988 6.4991C7.7863 4.73585 9.22038 3.30667 10.9893 3.30667Z"
        fill="#0C192B"
      />
    </g>
    <defs>
      <clipPath id="clip0_402_3294">
        <rect width="22" height="21" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

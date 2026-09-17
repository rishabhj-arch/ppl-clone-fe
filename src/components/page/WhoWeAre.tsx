import bgNewImg from "../Image/IMG1.png";
import bgTabImg from "../Image/Tab-BG.png";

export const WhoWeAre = () => {
  return (
    <div className="animate__animated animate__fadeIn bg-black">
      <div className="z-10 relative mx-auto max-w-7xl w-full px-5 sm:pl-6 md:px-[42px] xl:pr-0 xl:pl-[26px] lg:pt-[90px] md:pt-[100px] pt-[60px] tab:flex justify-between items-center xl:items-center lg:items-end md:items-end">
        <div className="lg:p-0 md:p-0 lg:pb-[100px] md:pb-[100px] w-full max-w-full itab:max-w-[538px] lg:max-w-[600px]  xl:max-w-[806px]">
          <p className="font-bold font-Montserrat tab:text-[30px] mb:text-[20px] text-[18px] text-white">
            Hugo Paul: Principal Lawyer at Paul & Paul Lawyers
          </p>
          <div className="max-w-[764px] flex flex-col gap-[30px] lg:mt-[80px] md:mt-[50px] mt-[30px]">
            <p className="font-medium font-Montserrat lg:text-[18px] mb:text-[16px] text-[14px] text-[#717171]">
              With over two decades of experience in family law and estate
              planning, Hugo has extensive background including key roles at
              prominent Sydney law firms, underscoring his expertise in
              navigating complex legal matters.
            </p>
            <p className="font-medium font-Montserrat lg:text-[18px] mb:text-[16px] text-[14px] text-[#717171]">
              Hugo’s meticulous and disciplined nature enables him to deeply
              understand the intricate issues that individuals and families face
              during significant events. As a trusted advisor, he provides
              invaluable guidance across various legal domains, including wills
              and estates, contested probate, succession planning, family law
              disputes, and alternative dispute resolution. His litigation and
              advocacy skills further ensure that clients receive comprehensive
              and effective representation.
            </p>
            <p className="font-medium font-Montserrat lg:text-[18px] mb:text-[16px] text-[14px] text-[#717171]">
              Hugo offers private advisory services and asset protection
              strategies. He has advised some of Australia’s wealthiest
              individuals on binding financial agreements and complex estate
              planning.
            </p>
            <p className="font-medium font-Montserrat lg:text-[18px] mb:text-[16px] text-[14px] text-[#717171]">
              Hugo’s commitment to the legal community extends beyond his
              practice; he currently serves as a Officer in the Australian Army
              Reserves, contributing his expertise to serve the nation.
            </p>
            <p className="font-medium font-Montserrat lg:text-[18px] mb:text-[16px] text-[14px] text-[#717171]">
              Outside of the law, Hugo finds joy and balance in spending quality
              time with his wife and three children. This dedication to family
              enriches his life and informs his well-rounded approach to both
              his personal and professional pursuits.
            </p>
          </div>
        </div>
        <div className="hidden itab:block w-full h-auto itab:absolute inset-0 -z-10">
          <img
            className="h-full object-cover object-right"
            src={bgNewImg}
            alt="bgImg"
          />
        </div>
        <div className="block itab:hidden w-full h-[550px]">
          <img
            className="h-full object-cover object-center"
            src={bgTabImg}
            alt="bgImg"
          />
        </div>
      </div>
    </div>
  );
};

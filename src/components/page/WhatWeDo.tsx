import WhatWeDoImg from '../Image/WhatWeDo.png'
// import HugoSFather from "../Image/Hugo's Father.json";
import HugoSFatherPNG from "../Image/Paul_img.png";
// import Lottie from 'lottie-react';

export const WhatWeDo = () => {
    return (
        <div className='animate__animated animate__fadeIn'>
            <div>
                <div className='w-full'>
                    <img src={WhatWeDoImg} alt="WhatWeDoImg" className='w-full h-[407px]' />
                </div>
                <div className="flex justify-center absolute lg:top-[142px] md:top-[120px] top-[168px] xl:left-[173px] md:left-[60px] left-[34px]">
                    <img src={HugoSFatherPNG} className="animate-flicker w-full md:max-w-[500px] max-w-[289px] md:h-[356px] relative" />
                    {/* <Lottie animationData={HugoSFather} loop={true} className="w-full md:max-w-[500px] max-w-[289px] md:h-[356px] relative" />
                    <p className='animate-flicker text-[18px] font-semibold font-Montserrat text-white absolute bottom-[10px] leading-[100%]'>Michael Paul 1936 - 2020</p> */}
                </div>
            </div>
            <div className='mx-auto max-w-7xl px-5 sm:px-6 lg:px-[42px] xl:px-6 xl:mt-[150px] lg:mt-[100px] md:mt-[100px] mt-[60px]'>
                <p className='font-bold font-Montserrat text-black lg:text-[40px] tab:text-[30px] mb:text-[20px] text-[18px] text-center'>History</p>
            </div>
            <div className='mx-auto max-w-7xl px-5 sm:px-6 lg:px-[42px] xl:px-6 flex flex-col gap-[30px] lg:mt-[80px] md:mt-[50px] mt-[30px]'>
                <p className='font-medium font-Montserrat lg:text-[18px] mb:text-[16px] text-[14px] text-center text-[#3B3C43]'>Experienced, Skilled, and highly effective Paul & Paul Lawyers is a boutique Law firm offering personalised strategic advice in family law, succession planning, wills and estates, and private advisory.</p>
                <p className='font-medium font-Montserrat lg:text-[18px] mb:text-[16px] text-[14px] text-center text-[#3B3C43]'>We work closely with highly regarded barristers and professionals in fields like finance, property, mediation, psychology and private investigations to deliver efficient and effective results.</p>
                <p className='font-medium font-Montserrat lg:text-[18px] mb:text-[16px] text-[14px] text-center text-[#3B3C43]'>Founded in the mid 1980s by Hugo Paul's late parents, Michael and Sandra Paul, Paul & Paul Lawyers has a rich history of providing exceptional legal services. The firm's deep roots in family law and its commitment to personalised client care and empathy have been guiding principles since its inception.</p>
            </div>
        </div>
    )
}

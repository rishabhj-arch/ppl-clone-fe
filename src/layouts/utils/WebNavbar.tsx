import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface MenuCloseIconProps {
    onClick: () => void;
    className?: string;
}

interface NavbarIconProps {
    className?: any;
    onClick?: () => void;
}

interface HammerIconProps {
    className?: string;
}

const WebNavbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeLink, setActiveLink] = useState<string | null>(null);
    const location = useLocation();
    const [showLogoImage, setShowLogoImage] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = (link: string) => {
        setActiveLink(link);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setHasScrolled(true);
            } else {
                setHasScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const handleScrollAndResize = () => {
            const isDesktop = window.innerWidth > 1023;
            const isScrolled = window.scrollY > 0;
            setShowLogoImage(isDesktop && isScrolled);
        };

        window.addEventListener('scroll', handleScrollAndResize);
        window.addEventListener('resize', handleScrollAndResize);

        return () => {
            window.removeEventListener('scroll', handleScrollAndResize);
            window.removeEventListener('resize', handleScrollAndResize);
        };
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        const pathMap: { [key: string]: string } = {
            '/what-we-do': 'What we do',
            '/who-we-are': 'Who we are',
            '/our-services': 'Our Services',
            '/insights': 'Insights',
        };
        setActiveLink(pathMap[location.pathname]);
    }, [location]);

    return (
        <div className={`top-0 sticky bg-white z-50 ${hasScrolled ? 'shadow-md shadow-black/13' : ''}`}>
            <nav className={`w-full flex justify-between items-center mx-auto max-w-7xl tab:px-[42px] p-5 h-[90px] lg:px-[42px] xl:px-6 ${showLogoImage ? 'lg:py-[20px]' : 'lg:py-[34px]'} md:py-5`}>
                <div className="navbar-menu-icon" onClick={toggleMenu}>
                    <span className={isOpen ? 'navbar-icon open' : 'navbar-icon'}>
                        <MenuIcon className='cursor-pointer' />
                    </span>
                </div>
                <div className="navbar-logo">
                    {showLogoImage ?
                        <NavLink to="/">
                            <LogoImage className={'animate__animated animate__fadeIn cursor-pointer'} />
                        </NavLink>
                        :
                        <NavLink to="/">
                            <PaulLawyers className={'animate__animated animate__fadeIn cursor-pointer'} />
                        </NavLink>}
                </div>

                <div className={`navbar-links ${isOpen ? 'active' : 'deActive'}`}>
                    <div className='absolute w-full h-full max-w-[490px] bg-white navbar-links-active'>
                        <div className="sm:py-[26px] py-[27px] sm:pl-[52px] sm:pr-10 px-[30px] flex justify-between items-center mb-[50px]"
                            style={{ boxShadow: '0px 4px 10px 0px #0000000D', borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }}>
                            <NavLink to={''}>
                                <PaulLawyers className={`Menu-navbar-logo lg:!w-[369px] !w-[235px] ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(false)} />
                            </NavLink>
                            <MenuCloseIcon onClick={() => setIsOpen(false)} className='cursor-pointer' />
                        </div>
                        <ul className="flex flex-col gap-[50px]">
                            <li className={`flex gap-[13px] ${activeLink === 'What we do' ? 'pl-3' : 'pl-12'}`} onClick={() => handleLinkClick('What we do')}>
                                {activeLink === 'What we do' && <HammerIcon />}
                                <NavLink to="/what-we-do" className={activeLink === 'What we do' ? 'active-link' : ''}>What we do</NavLink>
                            </li>
                            <li className={`flex gap-[13px] ${activeLink === 'Who we are' ? 'pl-3' : 'pl-12'}`} onClick={() => handleLinkClick('Who we are')}>
                                {activeLink === 'Who we are' && <HammerIcon />}
                                <NavLink to="/who-we-are" className={activeLink === 'Who we are' ? 'active-link' : ''}>Who we are</NavLink>
                            </li>
                            <li className={`flex gap-[13px] ${activeLink === 'Our Services' ? 'pl-3' : 'pl-12'}`} onClick={() => handleLinkClick('Our Services')}>
                                {activeLink === 'Our Services' && <HammerIcon />}
                                <NavLink to="/our-services" className={activeLink === 'Our Services' ? 'active-link' : ''}>Our Services</NavLink>
                            </li>
                            <li className={`flex gap-[13px] ${activeLink === 'Insights' ? 'pl-3' : 'pl-12'}`} onClick={() => handleLinkClick('Insights')}>
                                {activeLink === 'Insights' && <HammerIcon />}
                                <NavLink to="/insights" className={activeLink === 'Insights' ? 'active-link' : ''}>Insights</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="desktop-nav-links">
                    <div className="flex flex-row md:gap-9 lg:gap-[46px]">
                        <li className={`flex gap-[13px] flex-col items-center`} onClick={() => handleLinkClick('What we do')}>
                            <NavLink to="/what-we-do" className={`${activeLink === 'What we do' ? '!font-bold text-black' : ''} lg:text-[16px] tab:text-[14px]  font-medium font-Montserrat text-[#717171] hover:text-black`}>What we do</NavLink>
                            {activeLink === 'What we do' && <HammerIcon className='absolute mb:top-[70px]' />}
                        </li>
                        <li className={`flex gap-[13px] flex-col items-center`} onClick={() => handleLinkClick('Who we are')}>
                            {activeLink === 'Who we are' && <HammerIcon className='absolute mb:top-[70px]' />}
                            <NavLink to="/who-we-are" className={`${activeLink === 'Who we are' ? '!font-bold text-black' : ''} lg:text-[16px] tab:text-[14px] font-medium font-Montserrat text-[#717171] hover:text-black`}>Who we are</NavLink>
                        </li>
                        <li className={`flex gap-[13px] flex-col items-center`} onClick={() => handleLinkClick('Our Services')}>
                            {activeLink === 'Our Services' && <HammerIcon className='absolute mb:top-[70px]' />}
                            <NavLink to="/our-services" className={`${activeLink === 'Our Services' ? '!font-bold text-black' : ''} lg:text-[16px] tab:text-[14px] font-medium font-Montserrat text-[#717171] hover:text-black`}>Our Services</NavLink>
                        </li>
                        <li className={`flex gap-[13px] flex-col items-center`} onClick={() => handleLinkClick('Insights')}>
                            {activeLink === 'Insights' && <HammerIcon className='absolute mb:top-[70px]' />}
                            <NavLink to="/insights" className={`${activeLink === 'Insights' ? '!font-bold text-black' : ''} lg:text-[16px] tab:text-[14px] font-medium font-Montserrat text-[#717171] hover:text-black`}>Insights</NavLink>
                        </li>
                    </div>
                </div>
            </nav >
        </div >
    );
};

export default WebNavbar;

const MenuIcon: React.FC<HammerIconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none" className={className}>
        <path d="M26.25 6.5625H3.75C3.2375 6.5625 2.8125 6.1375 2.8125 5.625C2.8125 5.1125 3.2375 4.6875 3.75 4.6875H26.25C26.7625 4.6875 27.1875 5.1125 27.1875 5.625C27.1875 6.1375 26.7625 6.5625 26.25 6.5625Z" fill="black" />
        <path d="M15.5875 12.8125H3.75C3.2375 12.8125 2.8125 12.3875 2.8125 11.875C2.8125 11.3625 3.2375 10.9375 3.75 10.9375H15.5875C16.1 10.9375 16.525 11.3625 16.525 11.875C16.525 12.3875 16.1125 12.8125 15.5875 12.8125Z" fill="black" />
        <path d="M26.25 19.0625H3.75C3.2375 19.0625 2.8125 18.6375 2.8125 18.125C2.8125 17.6125 3.2375 17.1875 3.75 17.1875H26.25C26.7625 17.1875 27.1875 17.6125 27.1875 18.125C27.1875 18.6375 26.7625 19.0625 26.25 19.0625Z" fill="black" />
        <path d="M15.5875 25.3125H3.75C3.2375 25.3125 2.8125 24.8875 2.8125 24.375C2.8125 23.8625 3.2375 23.4375 3.75 23.4375H15.5875C16.1 23.4375 16.525 23.8625 16.525 24.375C16.525 24.8875 16.1125 25.3125 15.5875 25.3125Z" fill="black" />
    </svg>
)

const MenuCloseIcon: React.FC<MenuCloseIconProps> = ({ onClick, className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37" viewBox="0 0 37 37" fill="none" onClick={onClick} className={className}>
        <path d="M12.3597 12.3597C11.8801 12.8394 11.8801 13.617 12.3597 14.0967L16.763 18.5L12.3597 22.9034C11.8801 23.383 11.8801 24.1607 12.3597 24.6403C12.8394 25.1199 13.617 25.1199 14.0967 24.6403L18.5 20.2369L22.9034 24.6403C23.383 25.1199 24.1607 25.1199 24.6403 24.6403C25.1199 24.1607 25.1199 23.383 24.6403 22.9034L20.2369 18.5L24.6403 14.0967C25.1199 13.6171 25.1199 12.8394 24.6403 12.3598C24.1606 11.8801 23.383 11.8801 22.9034 12.3598L18.5 16.763L14.0967 12.3597C13.617 11.8801 12.8394 11.8801 12.3597 12.3597Z" fill="black" />
    </svg>
)

const HammerIcon: React.FC<HammerIconProps> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="23" height="20" viewBox="0 0 23 20" fill="none" className={className}>
        <path fillRule="evenodd" clipRule="evenodd" d="M9.417 3.78738C8.98649 4.22716 8.97713 4.93653 9.39828 5.36675L9.62477 5.59811L7.79977 7.43177L12.4156 11.9767L14.1938 10.0953L21.1251 17.1756C21.5444 17.6039 22.2407 17.5963 22.6712 17.1565C23.1017 16.7167 23.1111 16.0074 22.6899 15.5771L15.7324 8.47002L17.1251 6.992L12.7619 2.44512L11.1989 4.0111L10.9594 3.76635C10.5419 3.33805 9.84751 3.34761 9.417 3.78738ZM0 19.0992C0 19.5944 0.38559 19.9997 0.859154 19.9997L10.7815 20.0017C11.2551 20.0017 11.6407 19.5963 11.6407 19.1011C11.6407 18.6154 11.2626 18.2005 10.7815 18.2005H9.72397C9.98977 18.0475 10.1713 17.7512 10.1713 17.4108C10.1713 16.9251 9.79323 16.5102 9.31218 16.5102H2.33039C1.85682 16.5083 1.46936 16.9137 1.46936 17.4089C1.46936 17.7492 1.65279 18.0475 1.92046 18.2005H0.861025C0.38559 18.1986 0 18.6039 0 19.0992ZM12.9528 0.267282C12.6103 0.617189 12.6028 1.18316 12.9378 1.52351L18.0291 6.72431C18.3642 7.06657 18.9164 7.05892 19.2589 6.70901C19.6014 6.35911 19.6089 5.79314 19.2739 5.45279L14.1826 0.251985C13.8475 -0.0902735 13.2954 -0.0826253 12.9528 0.267282ZM5.71459 7.65931C5.37205 8.00921 5.36456 8.57518 5.69962 8.91553L10.7909 14.1163C11.1259 14.4586 11.6781 14.4509 12.0207 14.101C12.3632 13.7511 12.3707 13.1852 12.0356 12.8448L6.94436 7.64401C6.61118 7.30175 6.059 7.3094 5.71459 7.65931Z" fill="#0C192B" />
    </svg>
)

export const PaulLawyers: React.FC<NavbarIconProps> = ({ className, onClick }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="369" height="22" viewBox="0 0 369 22" fill="none" className={className} onClick={onClick}>
        <path d="M360.1 22C358.422 22 356.814 21.7772 355.276 21.3315C353.738 20.8656 352.499 20.268 351.56 19.5387L353.208 15.8315C354.107 16.4797 355.166 17.0166 356.385 17.442C357.623 17.8471 358.872 18.0497 360.13 18.0497C361.089 18.0497 361.858 17.9586 362.438 17.7762C363.037 17.5737 363.476 17.3002 363.756 16.9558C364.036 16.6114 364.176 16.2164 364.176 15.7707C364.176 15.2035 363.956 14.7578 363.516 14.4337C363.077 14.0893 362.498 13.8158 361.778 13.6133C361.059 13.3904 360.26 13.1878 359.381 13.0055C358.522 12.8029 357.653 12.5599 356.774 12.2762C355.915 11.9926 355.126 11.628 354.407 11.1823C353.688 10.7366 353.098 10.1492 352.639 9.41989C352.199 8.69061 351.98 7.75875 351.98 6.62431C351.98 5.40884 352.299 4.30479 352.938 3.31215C353.598 2.29926 354.577 1.49908 355.875 0.911602C357.194 0.303868 358.842 0 360.819 0C362.138 0 363.436 0.162063 364.715 0.486187C365.994 0.790054 367.122 1.25598 368.101 1.88398L366.603 5.62155C365.624 5.05433 364.645 4.63904 363.666 4.37569C362.687 4.09208 361.728 3.95028 360.789 3.95028C359.851 3.95028 359.081 4.06169 358.482 4.28453C357.883 4.50737 357.453 4.8011 357.194 5.16574C356.934 5.51013 356.804 5.91528 356.804 6.38121C356.804 6.92818 357.024 7.37385 357.463 7.71823C357.903 8.04236 358.482 8.30571 359.201 8.50829C359.92 8.71086 360.71 8.91344 361.569 9.11602C362.448 9.3186 363.317 9.55157 364.176 9.81492C365.055 10.0783 365.854 10.4328 366.573 10.8785C367.292 11.3241 367.871 11.9116 368.311 12.6409C368.77 13.3702 369 14.2919 369 15.4061C369 16.6013 368.67 17.6952 368.011 18.6878C367.352 19.6805 366.363 20.4807 365.045 21.0884C363.746 21.6961 362.098 22 360.1 22Z" fill="black" />
        <path d="M331.173 21.6353V0.364624H340.252C342.13 0.364624 343.748 0.678621 345.107 1.30661C346.465 1.91435 347.514 2.79556 348.253 3.95026C348.992 5.10495 349.362 6.48249 349.362 8.08286C349.362 9.66297 348.992 11.0304 348.253 12.1851C347.514 13.3195 346.465 14.1906 345.107 14.7983C343.748 15.4061 342.13 15.7099 340.252 15.7099H333.87L336.027 13.5525V21.6353H331.173ZM344.508 21.6353L339.264 13.9171H344.448L349.752 21.6353H344.508ZM336.027 14.0994L333.87 11.79H339.983C341.481 11.79 342.6 11.4659 343.339 10.8177C344.078 10.1492 344.448 9.23755 344.448 8.08286C344.448 6.9079 344.078 5.9963 343.339 5.34805C342.6 4.6998 341.481 4.37567 339.983 4.37567H333.87L336.027 2.03589V14.0994Z" fill="black" />
        <path d="M315.534 8.93368H325.633V12.7624H315.534V8.93368ZM315.894 17.6851H327.311V21.6353H311.069V0.364624H326.921V4.3149H315.894V17.6851Z" fill="black" />
        <path d="M296.208 21.6353V12.9447L297.317 15.9226L288.087 0.364624H293.241L300.313 12.3066H297.347L304.449 0.364624H309.213L299.984 15.9226L301.063 12.9447V21.6353H296.208Z" fill="black" />
        <path d="M261.908 21.6353L255.045 0.364624H260.08L266.043 19.2044H263.526L269.759 0.364624H274.253L280.247 19.2044H277.819L283.932 0.364624H288.577L281.715 21.6353H276.501L271.197 5.10496H272.575L267.122 21.6353H261.908Z" fill="black" />
        <path d="M232.316 21.6353L241.665 0.364624H246.46L255.839 21.6353H250.745L243.074 2.85634H244.991L237.29 21.6353H232.316ZM236.991 17.0773L238.279 13.3398H249.067L250.385 17.0773H236.991Z" fill="black" />
        <path d="M216.87 21.6353V0.364624H221.725V17.6243H232.242V21.6353H216.87Z" fill="black" />
        <path d="M190.299 21.6353V0.364624H195.154V17.6243H205.672V21.6353H190.299Z" fill="black" />
        <path d="M176.003 22C173.026 22 170.699 21.1593 169.021 19.4779C167.343 17.7965 166.504 15.3959 166.504 12.2762V0.364624H171.358V12.0939C171.358 14.1197 171.768 15.5783 172.587 16.4696C173.406 17.3609 174.555 17.8066 176.033 17.8066C177.511 17.8066 178.66 17.3609 179.479 16.4696C180.298 15.5783 180.708 14.1197 180.708 12.0939V0.364624H185.502V12.2762C185.502 15.3959 184.663 17.7965 182.985 19.4779C181.307 21.1593 178.98 22 176.003 22Z" fill="black" />
        <path d="M141.424 21.6353L150.773 0.364624H155.568L164.947 21.6353H159.853L152.181 2.85634H154.099L146.398 21.6353H141.424ZM146.098 17.0773L147.387 13.3398H158.175L159.493 17.0773H146.098Z" fill="black" />
        <path d="M123.579 21.6353V0.364624H132.658C134.536 0.364624 136.154 0.678621 137.513 1.30661C138.871 1.91435 139.92 2.79556 140.659 3.95026C141.398 5.10495 141.768 6.48249 141.768 8.08286C141.768 9.66297 141.398 11.0304 140.659 12.1851C139.92 13.3398 138.871 14.2311 137.513 14.8591C136.154 15.4668 134.536 15.7707 132.658 15.7707H126.276L128.433 13.5525V21.6353H123.579ZM128.433 14.0994L126.276 11.7597H132.389C133.887 11.7597 135.006 11.4355 135.745 10.7873C136.484 10.139 136.853 9.23755 136.853 8.08286C136.853 6.9079 136.484 5.9963 135.745 5.34805C135.006 4.6998 133.887 4.37567 132.389 4.37567H126.276L128.433 2.03589V14.0994Z" fill="black" />
        <path d="M99.8836 22C98.3454 22 96.977 21.7468 95.7783 21.2403C94.5797 20.7339 93.6308 20.0451 92.9316 19.174C92.2324 18.3029 91.8828 17.3002 91.8828 16.1657C91.8828 15.1123 92.1125 14.1703 92.572 13.3398C93.0315 12.4889 93.7607 11.6989 94.7595 10.9696C95.7584 10.2201 97.0269 9.49079 98.5651 8.78176C99.6839 8.25506 100.563 7.78913 101.202 7.38397C101.841 6.97882 102.291 6.59392 102.551 6.22928C102.81 5.84438 102.94 5.45948 102.94 5.07458C102.94 4.54788 102.76 4.12246 102.401 3.79834C102.061 3.47421 101.552 3.31215 100.873 3.31215C100.153 3.31215 99.594 3.49447 99.1944 3.85911C98.7949 4.22375 98.5951 4.68968 98.5951 5.2569C98.5951 5.56077 98.655 5.86464 98.7749 6.1685C98.8948 6.45211 99.1245 6.78637 99.4641 7.17127C99.8037 7.53591 100.283 8.01197 100.902 8.59944L111.96 18.9917L109.413 22L97.2167 10.5138C96.5175 9.86556 95.9581 9.25782 95.5386 8.6906C95.1191 8.12338 94.8095 7.56629 94.6097 7.01933C94.4299 6.47237 94.34 5.90515 94.34 5.31768C94.34 4.28453 94.6097 3.37292 95.1491 2.58287C95.6884 1.79281 96.4476 1.18508 97.4265 0.759665C98.4053 0.313993 99.554 0.091156 100.873 0.091156C102.091 0.091156 103.14 0.293735 104.019 0.698892C104.918 1.08379 105.617 1.64088 106.116 2.37016C106.636 3.09944 106.896 3.97053 106.896 4.98342C106.896 5.87477 106.676 6.69521 106.236 7.44475C105.797 8.17403 105.108 8.86279 104.169 9.51105C103.25 10.1593 102.041 10.8177 100.543 11.4862C99.524 11.9521 98.715 12.4079 98.1157 12.8536C97.5363 13.279 97.1168 13.7145 96.8571 14.1602C96.5974 14.6059 96.4676 15.1022 96.4676 15.6492C96.4676 16.1556 96.6174 16.6114 96.917 17.0166C97.2367 17.4217 97.6762 17.7357 98.2355 17.9586C98.7949 18.1814 99.4541 18.2928 100.213 18.2928C101.432 18.2928 102.551 18.0092 103.569 17.442C104.588 16.8545 105.447 15.9936 106.146 14.8591C106.866 13.7044 107.375 12.3066 107.675 10.6657L111.42 11.8508C111.001 13.9171 110.252 15.7099 109.173 17.2293C108.094 18.7486 106.766 19.9236 105.188 20.7541C103.609 21.5847 101.841 22 99.8836 22Z" fill="#3B3C43" />
        <path d="M66.7202 21.6353V0.364624H71.5746V17.6243H82.0926V21.6353H66.7202Z" fill="black" />
        <path d="M52.4244 22C49.4478 22 47.1205 21.1593 45.4424 19.4779C43.7643 17.7965 42.9253 15.3959 42.9253 12.2762V0.364624H47.7797V12.0939C47.7797 14.1197 48.1893 15.5783 49.0083 16.4696C49.8274 17.3609 50.9761 17.8066 52.4544 17.8066C53.9327 17.8066 55.0814 17.3609 55.9004 16.4696C56.7195 15.5783 57.129 14.1197 57.129 12.0939V0.364624H61.9235V12.2762C61.9235 15.3959 61.0845 17.7965 59.4064 19.4779C57.7283 21.1593 55.401 22 52.4244 22Z" fill="black" />
        <path d="M17.8452 21.6353L27.1945 0.364624H31.989L41.3682 21.6353H36.2741L28.6029 2.85634H30.5207L22.8195 21.6353H17.8452ZM22.5199 17.0773L23.8084 13.3398H34.596L35.9145 17.0773H22.5199Z" fill="black" />
        <path d="M0 21.6353V0.364624H9.07959C10.9574 0.364624 12.5756 0.678621 13.934 1.30661C15.2925 1.91435 16.3413 2.79556 17.0804 3.95026C17.8196 5.10495 18.1891 6.48249 18.1891 8.08286C18.1891 9.66297 17.8196 11.0304 17.0804 12.1851C16.3413 13.3398 15.2925 14.2311 13.934 14.8591C12.5756 15.4668 10.9574 15.7707 9.07959 15.7707H2.69691L4.85443 13.5525V21.6353H0ZM4.85443 14.0994L2.69691 11.7597H8.8099C10.3082 11.7597 11.4269 11.4355 12.166 10.7873C12.9052 10.139 13.2748 9.23755 13.2748 8.08286C13.2748 6.9079 12.9052 5.9963 12.166 5.34805C11.4269 4.6998 10.3082 4.37567 8.8099 4.37567H2.69691L4.85443 2.03589V14.0994Z" fill="black" />
    </svg>
)

const LogoImage: React.FC<NavbarIconProps> = ({ className, onClick }) => (
    <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} onClick={onClick}>
        <rect width="50" height="50" fill="black" />
        <path d="M13.26 20V7.4H19.02C20.172 7.4 21.162 7.586 21.99 7.958C22.83 8.33 23.478 8.87 23.934 9.578C24.39 10.274 24.618 11.102 24.618 12.062C24.618 13.01 24.39 13.832 23.934 14.528C23.478 15.224 22.83 15.764 21.99 16.148C21.162 16.52 20.172 16.706 19.02 16.706H15.24L16.824 15.158V20H13.26ZM16.824 15.536L15.24 13.898H18.804C19.548 13.898 20.1 13.736 20.46 13.412C20.832 13.088 21.018 12.638 21.018 12.062C21.018 11.474 20.832 11.018 20.46 10.694C20.1 10.37 19.548 10.208 18.804 10.208H15.24L16.824 8.57V15.536ZM26.3557 20V7.4H32.1157C33.2677 7.4 34.2577 7.586 35.0857 7.958C35.9257 8.33 36.5737 8.87 37.0297 9.578C37.4857 10.274 37.7137 11.102 37.7137 12.062C37.7137 13.01 37.4857 13.832 37.0297 14.528C36.5737 15.224 35.9257 15.764 35.0857 16.148C34.2577 16.52 33.2677 16.706 32.1157 16.706H28.3357L29.9197 15.158V20H26.3557ZM29.9197 15.536L28.3357 13.898H31.8997C32.6437 13.898 33.1957 13.736 33.5557 13.412C33.9277 13.088 34.1137 12.638 34.1137 12.062C34.1137 11.474 33.9277 11.018 33.5557 10.694C33.1957 10.37 32.6437 10.208 31.8997 10.208H28.3357L29.9197 8.57V15.536Z" fill="white" />
        <path d="M20.26 42V29.4H23.824V39.174H29.836V42H20.26Z" fill="white" />
        <line x1="5" y1="24.5" x2="45" y2="24.5" stroke="white" />
    </svg>
);
import React, { useEffect, useRef, useState } from 'react';

interface Option {
    id: number;
    value: string;
}

interface CustomSelectProps {
    selectedOption?: string | null;
    setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
    option?: Option[] | undefined;
    isLoading?: boolean | undefined
    error?: string |null
}

const SelectMenu: React.FC<CustomSelectProps> = ({ selectedOption, setSelectedOption, option, isLoading , error}) => {
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        if (!isLoading) {
            setIsOpen(!isOpen);
        }
    };

    const handleOptionClick = (value: string) => {
        setSelectedOption(value);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <div
                className={`border flex items-center cursor-pointer justify-between focus:outline-none focus:ring-0 md:h-[60px] h-[50px] w-full p-[10px] mb:text-[18px] text-[14px] font-Montserrat font-medium text-[#717171] bg-white ${error ? 'border-[#CC000D]' : 'border-black border-opacity-20'}`}
                onClick={toggleDropdown}
            >
                <span>{selectedOption || 'Select option'}</span>
                <div className='flex gap-[17px] md:mr-[19px] mr-[14px]'>
                    <p className='text-black mb:text-[18px] text-[14px]'>|</p>
                    <SelectMenuIcon className={`transition-all duration-150 ${isOpen ? "rotate-180" : "right-0"}`} />
                </div>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 bg-white z-10 mt-1 shadow-custom">
                    {option?.map(({ id, value }) => (
                        <div
                            key={id}
                            className={`text-[#717171] mb:text-[18px] text-[14px] font-Montserrat font-medium cursor-pointer p-[10px] 
                                ${selectedOption === value ? 'bg-[#E3E3E3] text-black' : 'hover:bg-[#E3E3E3]'}`}
                            onClick={() => handleOptionClick(value)}
                        >
                            {value}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SelectMenu;

const SelectMenuIcon = (props:any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4.51581 7.54801C4.95181 7.10201 5.55881 7.06701 6.09181 7.54801L9.99981 11.295L13.9078 7.54801C14.4408 7.06701 15.0488 7.10201 15.4818 7.54801C15.9178 7.99301 15.8898 8.74501 15.4818 9.16301C15.0758 9.58101 10.7868 13.665 10.7868 13.665C10.5698 13.888 10.2848 14 9.99981 14C9.71481 14 9.42981 13.888 9.21081 13.665C9.21081 13.665 4.92381 9.58101 4.51581 9.16301C4.10781 8.74501 4.07981 7.99301 4.51581 7.54801Z" fill="black" />
    </svg>
);

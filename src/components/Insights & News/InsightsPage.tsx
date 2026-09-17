import { useState, useEffect } from 'react';
import { InsightsNews } from "./InsightsNews";
import InsightsImage from '../Image/HUGO-0101.jpg'
import Insights from '../Image/HUGO-0102.jpg'

export const InsightsPage = () => {
    const [pageLimit, setPageLimit] = useState<number | undefined>(6);
    const [currentPage, setCurrentPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState<boolean | undefined>(undefined);

    const updatePageLimit = () => {
        const width = window.innerWidth;
        if (width < 768) {
            setPageLimit(3);
        }
    };

    useEffect(() => {
        updatePageLimit();
        window.addEventListener('resize', updatePageLimit);

        return () => {
            window.removeEventListener('resize', updatePageLimit);
        };
    }, []);

    const handleLoadMore = () => {
        setLoadingMore(true);
        setCurrentPage(prevPage => prevPage + 1);
    };

    return (
        <div>
            <div>
                <img src={InsightsImage} alt="InsightsImage" className='hidden min_xl:block InsightsImage w-full object-cover object-top' />
            </div>
            <div className='relative'>
                <img src={Insights} alt="InsightsImage" className='block min_xl:hidden InsightsImage w-full md:object-top object-[22%] object-cover' />
                <div className='block min_xl:hidden absolute top-0 h-full bg-black opacity-[50%] w-full'></div>
            </div>
            <InsightsNews
                Title='LOAD MORE'
                PAGE_PER_LIMIT={pageLimit}
                currentPage={currentPage}
                Skeletons={1}
                className="btn-posnawr z-[1]"
                onClick={handleLoadMore}
                loadingMore={loadingMore}
                setloadingMore={setLoadingMore}
            />
        </div>
    );
};

import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const ScrollToTop = () => {
const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
    const handleScroll = () => {
    setIsVisible(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
}, []);

const scrollToTop = () => {
    window.scrollTo({ top: 0 });
};

return (
    <>
    {isVisible && (
        <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center
                    rounded-lg bg-[#FCD535] shadow-lg
                    hover:brightness-110 cursor-pointer
                    text-white hover:text-white
                    border-2 border-[#364153] dark:border-white
                    dark:hover:text-white"
        >
        <ChevronUp className="h-5 w-5" strokeWidth={2.5} />
        </button>
    )}
    </>
);
};

export default ScrollToTop;
import { useEffect, useState } from 'react';

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor;

        // Use setTimeout to defer the state update to prevent cascading renders
        setTimeout(() => {
            if (/iPhone|iPad|iPod|Android/i.test(userAgent)) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        }, 0);
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    return isMobile;
};

export default useIsMobile;
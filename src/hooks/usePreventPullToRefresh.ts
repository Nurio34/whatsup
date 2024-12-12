import { useEffect } from "react";

const usePreventPullToRefresh = () => {
  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches[0].clientY < 50) {
        // Prevent pull-to-refresh if the touch starts near the top
        event.preventDefault();
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches[0].clientY < 50) {
        event.preventDefault();
      }
    };

    document.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      // Cleanup listeners when the component unmounts
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);
};

export default usePreventPullToRefresh;

import { useEffect, useState } from "react";

export default function useScrollPosition() {
  const [scrollPosition, setScrollPosition] = useState<number>(0);
  useEffect(() => {
    const updatePosiiton = () => {
      setScrollPosition(window.pageYOffset);
    };
    window.addEventListener("scroll", updatePosiiton);
    updatePosiiton();
    return () => window.removeEventListener("scroll", updatePosiiton);
  }, []);
  return scrollPosition;
}

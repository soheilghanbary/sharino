import { useEffect, useState } from "react";

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);
  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const updateMatch = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    setMatches(mediaQueryList.matches);
    mediaQueryList.addEventListener("change", updateMatch);
    return () => {
      mediaQueryList.removeEventListener("change", updateMatch);
    };
  }, [query]);
  return matches;
};

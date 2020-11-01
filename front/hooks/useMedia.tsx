import { useMediaQuery } from "react-responsive";

export function media() {
  const isPc = useMediaQuery({
    query: "(min-width: 1024px) and (max-width: 1279px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1023px)",
  });
  return { isPc, isTablet };
}

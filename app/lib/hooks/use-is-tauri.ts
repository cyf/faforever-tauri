import { useEffect, useState } from "react";

const useIsTauri = (): boolean => {
  const [isTauri, setIsTauri] = useState(false);

  useEffect(() => {
    setIsTauri(typeof window !== "undefined" && !!window.__TAURI__);
  }, []);

  return isTauri;
};

export default useIsTauri;

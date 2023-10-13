import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export const DEVICE_TYPE_DESKTOP = "desktop";
export const DEVICE_TYPE_TABLET = "tablet";
export const DEVICE_TYPE_MOBILE = "mobile";
export const DEVICE_TYPE_SMALL_MOBILE = "smallMobile";

export const initDeviceType = () => {
  if (typeof window !== "undefined") {
    if (window.innerWidth > 640 && window.innerWidth <= 1024) {
      return DEVICE_TYPE_TABLET;
    } else if (window.innerWidth > 480 && window.innerWidth <= 640) {
      return DEVICE_TYPE_MOBILE;
    } else if (window.innerWidth <= 480) {
      return DEVICE_TYPE_SMALL_MOBILE;
    } else {
      return DEVICE_TYPE_DESKTOP;
    }
  } else {
    return DEVICE_TYPE_DESKTOP;
  }
};

const ResponsiveContext = createContext<{
  deviceType: string;
}>({
  deviceType: DEVICE_TYPE_DESKTOP,
});

export function ResponsiveProvider({ children }: { children: ReactNode }) {
  const [deviceType, setDeviceType] = useState<string>(initDeviceType());

  const resizeHandler = () => {
    if (window.innerWidth > 640 && window.innerWidth <= 1024) {
      setDeviceType(DEVICE_TYPE_TABLET);
    } else if (window.innerWidth > 480 && window.innerWidth <= 640) {
      setDeviceType(DEVICE_TYPE_MOBILE);
    } else if (window.innerWidth <= 480) {
      setDeviceType(DEVICE_TYPE_SMALL_MOBILE);
    } else {
      setDeviceType(DEVICE_TYPE_DESKTOP);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
  }, []);

  return (
    <ResponsiveContext.Provider
      value={{
        deviceType,
      }}
    >
      {children}
    </ResponsiveContext.Provider>
  );
}
export const useResponsive = () => useContext(ResponsiveContext);

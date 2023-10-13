import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import DeviceService, {
  Device,
} from "./../features/compare/services/DeviceService";

const DeviceContext = createContext<{
  device: Device[] | undefined;
  setDevice: (device: Device[]) => void;
}>({
  device: [] as Device[],
  setDevice: (device: Device[]) => {},
});

export function DeviceProvider({ children }: { children: ReactNode }) {
  const [device, setDevice] = useState<Device[]>();

  useEffect(() => {
    const fetchSearchCountDevice = async () => {
      try {
        const response = await DeviceService.getDevices();
        setDevice(response);
      } catch (error: any) {
        throw new Error(error);
      }
    };

    fetchSearchCountDevice();
  }, []);

  return (
    <DeviceContext.Provider
      value={{
        device,
        setDevice,
      }}
    >
      {children}
    </DeviceContext.Provider>
  );
}

export const useDevice = () => useContext(DeviceContext);

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DEVICE_SERVER,
  headers: {
    "Content-Type": "application/json",
  },
});

interface LocalizedString {
  en: string;
  th: string;
}

interface LocalizedNumber {
  en: number;
  th: number;
}

interface LocalizedStringArray {
  en: string[];
  th: string[];
}

export interface Device {
  id: string;
  brand: string;
  type: string;
  name: LocalizedString;
  image_url: string;
  color: LocalizedStringArray;
  price: LocalizedNumber;
  capacity: string[];
  display: LocalizedStringArray;
  height: LocalizedString;
  width: LocalizedString;
  depth: LocalizedString;
  weight: LocalizedString;
  chip_ram: LocalizedStringArray;
  main_camera: LocalizedStringArray;
  video: LocalizedStringArray;
  front_camera: LocalizedStringArray;
  cellular_wireless: LocalizedStringArray;
  power_battery: LocalizedStringArray;
  sim_card: LocalizedStringArray;
  connector: string;
  official_website: LocalizedString;
}

export interface DeviceSearchCounting {
  id: string;
  brand: string;
  type: string;
  name: LocalizedString;
  search_count: number;
}

export const DeviceKey = {
  id: "ไอดี",
  brand: "แบรนด์",
  type: "ประเภท",
  name: "ชื่อ",
  image_url: "รูปภาพ",
  color: "สี",
  price: "ราคา",
  capacity: "ความจุ",
  display: "จอ",
  height: "ความสูง",
  width: "ความกว้าง",
  depth: "ความลึก",
  weight: "น้ำหนัก",
  chip_ram: "ชิพประมวลผล",
  main_camera: "กล้องหลัก",
  video: "วิดีโอ",
  front_camera: "กล้องหน้า",
  cellular_wireless: "เครือข่าย",
  power_battery: "แบตเตอร์รี่",
  sim_card: "ซิมการ์ด",
  connector: "การเชื่อมต่อ",
  official_website: "เว็บไซต์",
};

interface IDeviceService {
  getDevices(): Promise<Device[]>;
  countSearchDevice(
    id: string,
    brand: string,
    type: string,
    name: string
  ): Promise<boolean>;
  getSearchCountDevice(): Promise<DeviceSearchCounting[]>;
}

export const getDevices = async (): Promise<Device[]> => {
  const response = await axiosInstance.get("/device/get/all");
  return response.data;
};

export const countSearchDevice = async (
  id: string,
  brand: string,
  type: string,
  name: string
) => {
  const response = await axiosInstance.post("/device/count/search", {
    id,
    brand,
    type,
    name,
  });
  return response.data;
};

export const getSearchCountDevice = async (): Promise<
  DeviceSearchCounting[]
> => {
  const response = await axiosInstance.get("/device/get/count-search");
  return response.data;
};

const DeviceService: IDeviceService = {
  getDevices,
  countSearchDevice,
  getSearchCountDevice,
};

export default DeviceService;

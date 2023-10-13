import { useRef, useEffect, useState } from "react";
import styles from "./SearchSection.module.scss";
import { Button, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import DeviceCard from "../components/DeviceCard/DeviceCard";
import DeviceService, { Device } from "./../services/DeviceService";
import TitleRowCard from "../components/TitleRowCard/TitleRowCard";
import { useToast } from "@chakra-ui/react";
import { useDevice } from "./../../../context/useDevice";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useTranslations } from "next-intl";
import { Spin } from "antd";
import { useRouter } from "next/router";
import { FaTiktok, FaInstagram } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { MdCompare } from "react-icons/md";
import { BsStars, BsArrow90DegRight } from "react-icons/bs";
import { BiBlanket } from "react-icons/bi";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

const SearchSection = () => {
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  const [selectSearchDevice, setSelectSearchDevice] = useState<string>("");
  const [compareDevice, setCompareDevice] = useState<Device[]>([]);
  const [comparePreviousDevice, setComparePreviousDevice] = useState<Device[]>(
    []
  );
  const [isNavigationSearchSticky, setIsNavigationSearchSticky] =
    useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<string[]>([]);
  const [selectedBox, setSelectedBox] = useState<string[]>([]);
  const [isHoveringSideNavRow, setIsHoveringSideNavRow] =
    useState<boolean>(false);
  const [isHoveringSideNavBox, setIsHoveringSideNavBox] =
    useState<boolean>(false);
  const [isHoveringSideNavDevice, setIsHoveringSideNavDevice] =
    useState<boolean>(false);
  const [isHoveringSideNavPrevios, setIsHoveringSideNavPrevios] =
    useState<boolean>(false);
  const [compareDeviceCount, setCompareDeviceCount] = useState<number>(0);
  const [isHeaderDeviceVisible, setIsHeaderDeviceVisible] =
    useState<boolean>(false);
  const selectDeviceRef = useRef<any>(null);
  const [isOnDeviceCompare, setIsOnDeviceCompare] = useState<boolean>(false);
  const stickyHeaderDeviceRef = useRef<HTMLDivElement>(null);
  const deviceCompareRef = useRef<HTMLDivElement>(null);

  const toast = useToast();
  const { device } = useDevice();
  const t = useTranslations();
  const router = useRouter();
  const currentLang = router?.locale;

  const onChange = (value: string) => {
    setSelectSearchDevice(value);
  };

  useEffect(() => {
    const handleScrollY = () => {
      if (window.scrollY > 900) {
        setIsNavigationSearchSticky(true);
      } else {
        setIsNavigationSearchSticky(false);
      }
    };

    window.addEventListener("scroll", handleScrollY);

    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, []);

  const handleAddCompareDeviceById = async (id: string) => {
    if (selectDeviceRef?.current) {
      selectDeviceRef?.current.blur();
    }

    if (compareDevice.length > 3) {
      toast({
        title: "Add device limit",
        description: `${t(
          "compare_page.search_section.alert.add_device_limit"
        )}`,
        position: "top",
        duration: 3000,
        render: () => {
          return (
            <div className={styles["toast__container"]}>
              <div className={styles["toast__container--add-alert"]}>
                <InfoCircleOutlined />
                <span>
                  {t("compare_page.search_section.alert.add_device_limit")}
                </span>
              </div>
            </div>
          );
        },
      });
      return;
    }

    const newCompareDevice = device?.find((item) => item?.id === id);
    const isDuplicate = compareDevice?.find((item) => item?.id === id);

    if (isDuplicate) {
      toast({
        title: "Add duplication device",
        description: `${t(
          "compare_page.search_section.alert.duplicate_device"
        )}`,
        position: "top",
        duration: 3000,
        render: () => {
          return (
            <div className={styles["toast__container"]}>
              <div className={styles["toast__container--duplicate-alert"]}>
                <InfoCircleOutlined />
                <span>
                  {t("compare_page.search_section.alert.duplicate_device")}
                </span>
              </div>
            </div>
          );
        },
      });
      return;
    }

    if (newCompareDevice && !isDuplicate) {
      setCompareDevice([...compareDevice, newCompareDevice]);
      const addedDevice = device?.find((item) => item?.id === id);
      toast({
        title: "Add device success",
        description: `${t(
          "compare_page.search_section.alert.add_device_success"
        )}`,
        position: "top",
        duration: 3000,
        render: () => {
          return (
            <div className={styles["toast__container"]}>
              <div className={styles["toast__container--add-success-alert"]}>
                <InfoCircleOutlined />
                <span>
                  {t("compare_page.search_section.alert.add_device_success")}
                </span>
              </div>
            </div>
          );
        },
      });
      await DeviceService.countSearchDevice(
        id,
        addedDevice?.brand!,
        addedDevice?.type!,
        addedDevice?.name?.en!
      );
    }
  };

  const handleRemoveCompareDeviceById = (id: string) => {
    const newCompareDevice = compareDevice.filter((item) => item.id !== id);
    setCompareDevice(newCompareDevice);
  };

  const handleClearSelectedDevice = () => {
    if (compareDevice.length !== 0) {
      setComparePreviousDevice(compareDevice);
      setCompareDevice([]);
      setSelectedRow([]);
      setSelectedBox([]);
    }
  };

  const handleSetPreviousSelectedDevice = () => {
    if (comparePreviousDevice.length !== 0) {
      setCompareDevice(comparePreviousDevice);
    }
  };

  const handleSelectRow = (value: string) => {
    if (selectedRow.includes(value)) {
      setSelectedRow(selectedRow.filter((item) => item !== value));
      return;
    }
    if (selectedRow.length > 2) {
      toast({
        title: "Hightlight row limit",
        description: `${t(
          "compare_page.search_section.alert.highlight_row_limit"
        )}`,
        position: "top",
        duration: 3000,
        render: () => {
          return (
            <div className={styles["toast__container"]}>
              <div className={styles["toast__container--row-alert"]}>
                <InfoCircleOutlined />
                <span>
                  {t("compare_page.search_section.alert.highlight_row_limit")}
                </span>
              </div>
            </div>
          );
        },
      });
      return;
    }

    setSelectedRow((newSelectedRow) => [...newSelectedRow, value]);
  };

  const handleSelectedRowHightLight = (row: string) => {
    return selectedRow.includes(row);
  };

  const handleSelectedBox = (key: string) => {
    if (selectedBox.includes(key)) {
      setSelectedBox(selectedBox.filter((item) => item !== key));
      return;
    }
    if (selectedBox.length > 8) {
      toast({
        title: "Hightlight box limit",
        description: `${t(
          "compare_page.search_section.alert.highlight_box_limit"
        )}`,
        status: "info",
        position: "top",
        duration: 3000,
        isClosable: true,
        render: () => {
          return (
            <div className={styles["toast__container"]}>
              <div className={styles["toast__container--box-alert"]}>
                <InfoCircleOutlined />
                <span>
                  {t("compare_page.search_section.alert.highlight_box_limit")}
                </span>
              </div>
            </div>
          );
        },
      });
      return;
    }

    setSelectedBox((newSelectedBox) => [...newSelectedBox, key]);
  };

  const handleSelectedBoxHightLight = (box: string) => {
    return selectedBox.includes(box);
  };

  const handleClearSelectedBox = () => {
    setSelectedBox([]);
  };

  const handleClearSelectedRow = () => {
    setSelectedRow([]);
  };

  useEffect(() => {
    if (compareDeviceCount < 0 && compareDevice.length !== 0) {
      setCompareDeviceCount(0);
    }

    if (
      compareDeviceCount > compareDevice.length - 1 &&
      compareDevice.length !== 0
    ) {
      setCompareDeviceCount(compareDevice.length - 1);
    }

    const element = document.getElementById(
      `compare-device-${compareDeviceCount}`
    );
    if (element) {
      element.scrollIntoView({ behavior: "smooth", inline: "center" });
    }
  }, [compareDeviceCount]);

  const compareSlideLeft = () => {
    setCompareDeviceCount(compareDeviceCount - 1);
  };

  const compareSlideRight = () => {
    setCompareDeviceCount(compareDeviceCount + 1);
  };

  useEffect(() => {
    const handleScrollY = () => {
      if (window.scrollY > 1353) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScrollY);

    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, []);

  const handleSearchDevice = async (value: string) => {};

  const SideNavBar = () => {
    return (
      <div
        className={`${styles["search--section-side-navbar"]} ${
          !showNavbar && styles["search--section-side-navbar-hide"]
        }`}
      >
        <div
          className={`${styles["search--section-side-navbar-clear-row"]} ${
            selectedRow?.length > 0 &&
            styles["search--section-side-navbar-clear-row--enable"]
          }`}
          onClick={handleClearSelectedRow}
          onMouseEnter={() => setIsHoveringSideNavRow(true)}
          onMouseLeave={() => setIsHoveringSideNavRow(false)}
        >
          {isHoveringSideNavRow && (
            <div
              className={
                styles["search--section-side-navbar-clear-row--expand"]
              }
            >
              {t("compare_page.search_section.side_navbar.clear_selected_row")}
            </div>
          )}

          <button
            className={styles["search--section-side-navbar-clear-row-button"]}
          >
            {t("compare_page.search_section.side_navbar.row")}
          </button>
        </div>
        <div className={styles["search--section-side-navbar-sep-row-box"]} />
        <div
          className={`${styles["search--section-side-navbar-clear-box"]} ${
            selectedBox?.length > 0 &&
            styles["search--section-side-navbar-clear-box--enable"]
          }`}
          onClick={handleClearSelectedBox}
          onMouseEnter={() => setIsHoveringSideNavBox(true)}
          onMouseLeave={() => setIsHoveringSideNavBox(false)}
        >
          {isHoveringSideNavBox && (
            <div
              className={
                styles["search--section-side-navbar-clear-box--expand"]
              }
            >
              {t("compare_page.search_section.side_navbar.clear_selected_box")}
            </div>
          )}
          <button
            className={styles["search--section-side-navbar-clear-box-button"]}
          >
            {t("compare_page.search_section.side_navbar.box")}
          </button>
        </div>
        <div className={styles["search--section-side-navbar-sep-row-box"]} />
        <div
          className={`${styles["search--section-side-navbar-clear-device"]} ${
            compareDevice?.length > 0 &&
            styles["search--section-side-navbar-clear-device--enable"]
          }`}
          onClick={handleClearSelectedDevice}
          onMouseEnter={() => setIsHoveringSideNavDevice(true)}
          onMouseLeave={() => setIsHoveringSideNavDevice(false)}
        >
          {isHoveringSideNavDevice && (
            <div
              className={
                styles["search--section-side-navbar-clear-device--expand"]
              }
            >
              {t(
                "compare_page.search_section.side_navbar.clear_selected_device"
              )}
            </div>
          )}
          <button
            className={
              styles["search--section-side-navbar-clear-device-button"]
            }
          >
            {t("compare_page.search_section.side_navbar.clear")}
          </button>
        </div>
        <div className={styles["search--section-side-navbar-sep-row-box"]} />
        <div
          className={`${
            styles["search--section-side-navbar-clear-device-previous"]
          } ${
            comparePreviousDevice?.length > 0 &&
            compareDevice?.length === 0 &&
            styles["search--section-side-navbar-clear-device-previous--enable"]
          }`}
          onClick={handleSetPreviousSelectedDevice}
          onMouseEnter={() => setIsHoveringSideNavPrevios(true)}
          onMouseLeave={() => setIsHoveringSideNavPrevios(false)}
        >
          {isHoveringSideNavPrevios && (
            <div
              className={
                styles[
                  "search--section-side-navbar-clear-device-previous--expand"
                ]
              }
            >
              {t(
                "compare_page.search_section.side_navbar.set_previous_selected_device"
              )}
            </div>
          )}
          <button
            className={
              styles["search--section-side-navbar-clear-device-previous-button"]
            }
          >
            {t("compare_page.search_section.side_navbar.previous")}
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={styles["search--separate"]}>
        <BsStars className={styles["search--separate-star"]} />
        <div className={styles["search--separate-border"]} />
        <BsArrow90DegRight className={styles["search--separate-arrow"]} />
      </div>
      <div className={styles["search--separate-mobile"]}>
        <div className={styles["search--separate-mobile-border"]} />
        <BsStars className={styles["search--separate-mobile-star"]} />
        <div className={styles["search--separate-mobile-border"]} />
      </div>
      <div className={styles["search--section"]}>
        <div
          className={`${styles["search__background"]} ${
            compareDevice.length > 0 && styles["search__background-extend"]
          }`}
        />
        {showNavbar && <SideNavBar />}
        <div className={styles["search__container"]}>
          <div
            className={styles["search__container--header"]}
            data-testid="compare-title"
          >
            <div className={styles["search__container--header-traffics"]}>
              <FaInstagram
                className={styles["search__container--header-traffics-ig"]}
              />
              <AiOutlineMessage
                className={styles["search__container--header-traffics-line"]}
              />
              <FaTiktok
                className={styles["search__container--header-traffics-tiktok"]}
              />
            </div>
            <h1 className={styles["search__container--header-title"]}>
              {t("compare_page.search_section.title")}
            </h1>
          </div>
          <div className={styles["search__description"]}>
            <div className={styles["search__description-icons"]}>
              <div className={styles["search__description-icons-search"]}>
                <MdCompare
                  className={styles["search__description-icons-search-value"]}
                />
              </div>
              <h2>{t("compare_page.search_section.sub_title_1")}</h2>
            </div>
          </div>
          <div
            className={styles["search__subtitle"]}
            data-testid="compare-subtitle"
          >
            <h2 className={styles["subtitle-bounce__container"]}>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description1")}
              </span>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description2")}
              </span>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description3")}
              </span>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description4")}
              </span>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description5")}
              </span>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description6")}
              </span>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description7")}
              </span>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description8")}
              </span>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description9")}
              </span>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description10")}
              </span>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description11")}
              </span>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description12")}
              </span>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description13")}
              </span>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description14")}
              </span>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description15")}
              </span>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description24")}
              </span>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description25")}
              </span>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description26")}
              </span>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description27")}
              </span>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description28")}
              </span>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description29")}
              </span>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description30")}
              </span>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description31")}
              </span>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description32")}
              </span>
              <span className={styles["subtitle-bounce__container--text"]}>
                {t("compare_page.search_section.description33")}
              </span>
            </h2>
          </div>
          <div className={styles["search__input"]}>
            <Select
              ref={selectDeviceRef}
              className={styles["search__input--box"]}
              showSearch
              onChange={onChange}
              size="large"
              placeholder="search"
              onSearch={handleSearchDevice}
              filterOption={(input, option) =>
                option!.label
                  .replace(" ", "")
                  .toLowerCase()
                  .includes(input.replace(" ", "").toLowerCase()) ||
                (option!.data &&
                  option!.data.name.th
                    .replace(" ", "")
                    .toLowerCase()
                    .includes(input.replace(" ", "").toLowerCase()))
              }
              options={
                device?.map((item) => ({
                  value: item.id,
                  label: item?.name?.en,
                  data: { name: item.name },
                })) || []
              }
              onSelect={(value) => {
                handleAddCompareDeviceById(value);
              }}
            />
          </div>
        </div>
        <div className={styles["search__result"]}>
          <div
            className={styles["independence-search-section__scroll-position"]}
            id="search-section"
          />
          {compareDevice.length === 0 || device?.length === 0 ? (
            <div
              data-testid="no-compare-device-section"
              className={styles["search__result--section-empty"]}
            >
              <div className={styles["dot__container"]}></div>
              <div
                className={
                  styles["search__result--section-empty-text-container"]
                }
              >
                <div
                  className={
                    styles["search__result--section-empty-text-container-icon"]
                  }
                >
                  <BiBlanket
                    className={
                      styles[
                        "search__result--section-empty-text-container-icon-value"
                      ]
                    }
                  />
                </div>

                <div className={styles["text-bounce__container--text"]}>
                  {t("compare_page.search_section.no_compare_device1")}
                </div>
                <div className={styles["text-bounce__container--text"]}>
                  {t("compare_page.search_section.no_compare_device2")}
                </div>
                <div className={styles["text-bounce__container--text"]}>
                  {t("compare_page.search_section.no_compare_device3")}
                </div>
                <div className={styles["text-bounce__container--text"]}>
                  {t("compare_page.search_section.no_compare_device4")}
                </div>
                <div className={styles["text-bounce__container--text"]}>
                  {t("compare_page.search_section.no_compare_device5")}
                </div>
                <div className={styles["text-bounce__container--text"]}>
                  {t("compare_page.search_section.no_compare_device6")}
                </div>
                <div className={styles["text-bounce__container--text"]}>
                  {t("compare_page.search_section.no_compare_device7")}
                </div>
                <div className={styles["text-bounce__container--text"]}>
                  {t("compare_page.search_section.no_compare_device8")}
                </div>
                <div className={styles["text-bounce__container--text"]}>
                  {t("compare_page.search_section.no_compare_device9")}
                </div>
                <div className={styles["text-bounce__container--text"]}>
                  {t("compare_page.search_section.no_compare_device10")}
                </div>
                <div className={styles["text-bounce__container--text"]}>
                  {t("compare_page.search_section.no_compare_device11")}
                </div>
                <div className={styles["text-bounce__container--text"]}>
                  {t("compare_page.search_section.no_compare_device12")}
                </div>
                <div className={styles["text-bounce__container--text"]}>
                  {t("compare_page.search_section.no_compare_device13")}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className={styles["search__result--section-phone"]}>
                <div className={styles["search__result--section-phone-col"]}>
                  <TitleRowCard
                    handleSelectRow={handleSelectRow}
                    handleSelectedRowHightLight={handleSelectedRowHightLight}
                  />
                </div>
                {compareDevice.map((item, index) => (
                  <div
                    key={item?.id}
                    className={styles["search__result--section-phone-col"]}
                    id={`compare-device-${index}`}
                  >
                    <DeviceCard
                      key={item?.id}
                      device={item}
                      handleSelectedBox={handleSelectedBox}
                      handleSelectedBoxHightLight={handleSelectedBoxHightLight}
                      handleRemoveCompareDeviceById={
                        handleRemoveCompareDeviceById
                      }
                      handleSelectedRowHightLight={handleSelectedRowHightLight}
                      locale={currentLang!}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div
          className={`${styles["search__result--container-phone-navigation"]} ${
            isNavigationSearchSticky &&
            styles["search__result--container-phone-navigation-sticky"]
          }`}
        >
          <button
            className={
              styles["search__result--container-phone-navigation-slide-left"]
            }
            onClick={compareSlideLeft}
          >
            <BsFillArrowLeftCircleFill />
          </button>
          <button
            onClick={handleClearSelectedRow}
            className={`${
              styles["search__result--container-phone-navigation-text"]
            } ${
              selectedRow?.length > 0 &&
              styles["search__result--container-phone-navigation-text--enable"]
            }`}
          >
            ROW
          </button>
          <button
            className={`${
              styles["search__result--container-phone-navigation-text"]
            } ${
              selectedBox?.length > 0 &&
              styles["search__result--container-phone-navigation-text--enable"]
            }`}
            onClick={handleClearSelectedBox}
          >
            BOX
          </button>
          <button
            className={`${
              styles["search__result--container-phone-navigation-text"]
            } ${
              compareDevice?.length > 0 &&
              styles["search__result--container-phone-navigation-text--enable"]
            }`}
            onClick={handleClearSelectedDevice}
          >
            CLEAR
          </button>
          <button
            onClick={handleSetPreviousSelectedDevice}
            className={`${
              styles["search__result--container-phone-navigation-text"]
            } ${
              compareDevice?.length === 0 &&
              comparePreviousDevice?.length > 0 &&
              styles["search__result--container-phone-navigation-text--enable"]
            }`}
          >
            PREV
          </button>
          <button
            onClick={compareSlideRight}
            className={
              styles["search__result--container-phone-navigation-slide"]
            }
          >
            <BsFillArrowRightCircleFill />
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchSection;

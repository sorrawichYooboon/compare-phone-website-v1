import moment from "moment";
import { useEffect, useRef, useState } from "react";
import DeviceService, { DeviceSearchCounting } from "../services/DeviceService";
import styles from "./MostSearchSection.module.scss";
import { useDevice } from "./../../../context/useDevice";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { useTranslations } from "next-intl";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import Image from "next/image";
import usePremiumStatus from "@/hooks/usePremiumStatus";
import { useAuthentication } from "@/context/useAuthentication";
import { FaTiktok, FaInstagram } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import Link from "next/link";
import { useResponsive } from "@/context/useResponsive";

const MostSearchSection = () => {
  const [topSearchCountDevice, setTopSearchCountDevice] = useState<
    DeviceSearchCounting[]
  >([]);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const [isNavigationSticky, setIsNavigationSticky] = useState<boolean>(false);
  const [scrollSnapOnMostDevice, setScrollSnapOnMostDevice] =
    useState<number>(0);
  const date = new Date();
  const formattedDate = moment(date).format("MMMM DD, YYYY");
  const t = useTranslations();
  const { device } = useDevice();
  const { deviceType } = useResponsive();
  const { user } = useAuthentication();
  const userIsPremium = usePremiumStatus(user);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    const handleScrollY = () => {
      if (window.scrollY > 200) {
        setIsNavigationSticky(true);
      } else {
        setIsNavigationSticky(false);
      }
    };

    window.addEventListener("scroll", handleScrollY);

    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, []);

  useEffect(() => {
    const fetchSearchCountDevice = async () => {
      try {
        const response = await DeviceService.getSearchCountDevice();
        if (userIsPremium) {
          setTopSearchCountDevice(response.slice(0, 10));
        } else {
          setTopSearchCountDevice(response.slice(0, 5));
        }
      } catch (error: any) {
        throw new Error(error);
      }
    };

    fetchSearchCountDevice();
  }, [userIsPremium]);

  const mergedTopSearchCountDevice = topSearchCountDevice.map((item) => {
    const deviceItem = device?.find((deviceItem) => deviceItem.id === item.id);
    return {
      ...item,
      ...deviceItem,
    };
  });

  // useEffect(() => {
  //   if (scrollSnapOnMostDevice >= mergedTopSearchCountDevice.length) {
  //     setScrollSnapOnMostDevice(0);
  //   }

  //   if (scrollSnapOnMostDevice < 0) {
  //     setScrollSnapOnMostDevice(mergedTopSearchCountDevice.length - 1);
  //   }

  //   const element = document.getElementById(
  //     `most-search-${scrollSnapOnMostDevice}`
  //   );
  //   if (element) {
  //     element.scrollIntoView({ behavior: "smooth", block: "center" });
  //   }
  // }, [scrollSnapOnMostDevice]);

  // const slideLeft = () => {
  //   swiper.slideNext();
  // };

  // const slideRight = () => {
  //   swiper.slideNext();
  // };

  return (
    <>
      <div className={styles["most-search"]}>
        <div
          className={styles["most-search__scrollposition"]}
          id="most-search-section"
        />
        <div className={styles["most-search__container"]}>
          <div className={styles["most-search__container--header"]}>
            <h1 className={styles["most-search__container--header-title"]}>
              {t("compare_page.top_search_section.title")}
            </h1>
            <div className={styles["most-search__container--header-traffics"]}>
              <Link
                href={"https://www.instagram.com/flowech.official/"}
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram
                  className={
                    styles["most-search__container--header-traffics-ig"]
                  }
                />
              </Link>
              <Link
                href={"https://page.line.me/709cgixx"}
                target="_blank"
                rel="noreferrer"
              >
                <AiOutlineMessage
                  className={
                    styles["most-search__container--header-traffics-line"]
                  }
                />
              </Link>
              <Link
                href={
                  "https://www.tiktok.com/@flowechofficial?_t=8bDXXIRhOuw&_r=1"
                }
                target="_blank"
                rel="noreferrer"
              >
                <FaTiktok
                  className={
                    styles["most-search__container--header-traffics-tiktok"]
                  }
                />
              </Link>
            </div>
          </div>
          <div className={styles["most-search__container--description"]}>
            <div
              className={styles["most-search__container--description-icons"]}
            >
              <div
                className={
                  styles["most-search__container--description-icons-search"]
                }
              >
                <BiSearchAlt
                  className={
                    styles[
                      "most-search__container--description-icons-search-value"
                    ]
                  }
                />
              </div>
              <h2>{t("compare_page.top_search_section.description")}</h2>
            </div>
            <h2 className={styles["most-search__container--description-date"]}>
              {t("compare_page.top_search_section.latest_update")}&nbsp;
              {formattedDate}
            </h2>
          </div>
          <div className={styles["most-search__container--list"]}>
            {mergedTopSearchCountDevice?.length === 0 && isImageLoading ? (
              <div className={styles["most-search__container--list-loading"]}>
                <span
                  className={
                    styles["most-search__container--list-loading-loader"]
                  }
                ></span>
              </div>
            ) : (
              <div className={styles["most-search__container--list-container"]}>
                <Swiper
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  slidesPerView={
                    deviceType === "desktop"
                      ? 3
                      : deviceType === "tablet"
                      ? 2
                      : 1
                  }
                  navigation
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3000 }}
                >
                  {mergedTopSearchCountDevice.map((device, index) => {
                    return (
                      <SwiperSlide key={device?.id} id={`most-search-${index}`}>
                        <span className="swiper-slide--order">
                          {index + 1}
                          {index + 1 === 1
                            ? "st"
                            : index + 1 === 2
                            ? "nd"
                            : index + 1 === 3
                            ? "rd"
                            : "th"}
                        </span>
                        <span className="swiper-slide--text">
                          {device?.name?.en}
                        </span>
                        <span className="swiper-slide--brand">
                          brand: {device?.brand}
                        </span>
                        <div className="swiper-slide--img">
                          <Image
                            className="swiper-slide--img-value"
                            alt={device?.name?.en}
                            src={device?.image_url!}
                            width={1000}
                            height={1000}
                            onLoad={() => setIsImageLoading(false)}
                          />
                        </div>
                        <div className="swiper-slide--preview">
                          <Link
                            className="swiper-slide--preview-link"
                            href={`https://www.youtube.com/results?search_query=${device?.name?.en}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <button className="swiper-slide--preview-link-value">
                              YOUTUBE
                            </button>
                          </Link>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            )}
          </div>
          {/* <div
            className={`${styles["most-search__container--phone-navigation"]} ${
              isNavigationSticky &&
              styles["most-search__container--phone-navigation-sticky"]
            }`}
          >
            <button
              className={
                styles["most-search__container--phone-navigation-text"]
              }
              onClick={slideLeft}
            >
              <div
                className={
                  styles[
                    "most-search__container--phone-navigation-text-button-left"
                  ]
                }
              >
                <BsFillArrowLeftCircleFill />
              </div>
              SLIDE LEFT
            </button>
            <button
              className={
                styles["most-search__container--phone-navigation-text"]
              }
              onClick={slideRight}
            >
              SLIDE RIGHT
              <div
                className={
                  styles[
                    "most-search__container--phone-navigation-text-button-right"
                  ]
                }
              >
                <BsFillArrowRightCircleFill />
              </div>
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default MostSearchSection;

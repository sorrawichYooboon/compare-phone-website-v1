import React from "react";
import styles from "./DeviceCard.module.scss";
import { Button, Modal } from "antd";
import { Device } from "../../services/DeviceService";
import { YoutubeOutlined } from "@ant-design/icons";
import { getValueByKey } from "./../../../../utils/Object";
import { DeviceKey } from "./../../services/DeviceService";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { MdZoomOutMap } from "react-icons/md";
import { useState, useEffect } from "react";
import Image from "next/image";

interface CardProps {
  device: Device;
  handleRemoveCompareDeviceById: (id: string) => void;
  handleSelectedRowHightLight: (row: string) => boolean;
  handleSelectedBox: (box: string) => void;
  handleSelectedBoxHightLight: (box: string) => boolean;
  locale: string;
}

const Card = ({
  device,
  handleRemoveCompareDeviceById,
  handleSelectedRowHightLight,
  handleSelectedBoxHightLight,
  handleSelectedBox,
  locale,
}: CardProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [modalContent, setModalContent] = useState<any>("");
  const [titleContent, setTitleContent] = useState<any>("");
  const t = useTranslations();

  const isLessThan25Character = (array: string[]) => {
    return array.every((item) => item?.length < 25);
  };

  const isMoreThan3Item = (array: string[]) => {
    return array.length > 3;
  };

  const rowArrayDisplay = (array: string[]) => {
    const isLessThan25 = isLessThan25Character(array);
    if (windowWidth > 640) {
      return array.slice(0, 3).map((item, index) => {
        if (isLessThan25) {
          return <li key={index}>{item}</li>;
        } else {
          return (
            <li key={index} style={{ fontSize: "10px" }}>
              {item}
            </li>
          );
        }
      });
    } else {
      return array.slice(0, 2).map((item, index) => {
        if (isLessThan25) {
          return <li key={index}>{item}</li>;
        } else {
          return (
            <li key={index} style={{ fontSize: "10px" }}>
              {item}
            </li>
          );
        }
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <div className={styles["card"]}>
        {openModal && (
          <Modal
            title={titleContent}
            centered
            open={openModal}
            onCancel={() => setOpenModal(false)}
            footer={null}
          >
            <ol style={{ listStyleType: "circle", marginLeft: "18px " }}>
              {modalContent.map((item: string, index: number) => {
                return <li key={index}>{item}</li>;
              })}
            </ol>
          </Modal>
        )}

        <div className={styles["card__title"]}>
          <span className={styles["card__title-text"]}>{device?.name?.en}</span>
        </div>
        <Link
          href={`https://www.youtube.com/results?search_query=${device?.name?.en}`}
          target="_blank"
          rel="noreferrer"
        >
          <YoutubeOutlined className={styles["card__title-youtube"]} />
        </Link>
        <Button
          className={styles["card__remove"]}
          onClick={() => handleRemoveCompareDeviceById(device?.id)}
        >
          {t("compare_page.components.device_card.remove")}
        </Button>
        <div className={styles["card__detail"]}>
          <div className={styles["card__detail-img"]}>
            <Image
              className={styles["card__detail-img-value"]}
              alt={device?.name?.en}
              src={device?.image_url}
              width={1000}
              height={1000}
            />
          </div>
          <div
            className={`${styles["card__detail--box"]} ${
              handleSelectedRowHightLight(getValueByKey(DeviceKey, "color"))
                ? styles["card__detail--box-row-highlight"]
                : ""
            } ${
              handleSelectedBoxHightLight(`${device?.id}-color`)
                ? styles["card__detail--box-box-highlight"]
                : ""
            }`}
            onClick={() => handleSelectedBox(`${device?.id}-color`)}
          >
            <div
              className={styles["card__detail-color card__detail--box-white"]}
            >
              <ul>
                {locale === "th"
                  ? rowArrayDisplay(device?.color?.th)
                  : rowArrayDisplay(device?.color?.en)}
              </ul>
            </div>
          </div>
          {isMoreThan3Item(device?.color?.en) && (
            <div className={styles["card__detail--box-expand"]}>
              <div
                className={styles["card__detail--box-expand-container"]}
                onClick={() => {
                  setOpenModal(true);
                  setTitleContent("Color");
                  setModalContent(
                    locale === "th" ? device?.color?.th : device?.color?.en
                  );
                }}
              >
                <button
                  className={
                    styles["card__detail--box-expand-container-button"]
                  }
                >
                  <MdZoomOutMap />
                </button>
              </div>
            </div>
          )}
          <div
            className={`${styles[`card__detail--box`]} ${
              styles["card__detail--box-grey"]
            } ${
              handleSelectedRowHightLight(getValueByKey(DeviceKey, "brand"))
                ? styles["card__detail--box-row-highlight"]
                : ""
            } ${
              handleSelectedBoxHightLight(`${device?.id}-brand`)
                ? styles["card__detail--box-box-highlight"]
                : ""
            }`}
            onClick={() => handleSelectedBox(`${device?.id}-brand`)}
          >
            <div
              className={styles["card__detail-brand card__detail--box-white"]}
            >
              {device?.brand}
            </div>
          </div>
          {/* <div
            className={`${styles["card__detail--box"]} ${
              handleSelectedRowHightLight(getValueByKey(DeviceKey, "price"))
                ? styles["card__detail--box-row-highlight"]
                : ""
            } ${
              handleSelectedBoxHightLight(`${device?.id}-price`)
                ? styles["card__detail--box-box-highlight"]
                : ""
            }`}
            onClick={() => handleSelectedBox(`${device?.id}-price`)}
          >
            <div
              className={styles["card__detail-price card__detail--box-white"]}
            >
              {locale === "th" ? (
                <>
                  {device?.price?.th === 0 ? (
                    <span>ไม่มีข้อมูลใน official website</span>
                  ) : (
                    <>เริ่มต้นที่ ฿{device?.price?.th}</>
                  )}
                </>
              ) : (
                <>
                  {device?.price?.en === 0 ? (
                    <span>no information on the official website</span>
                  ) : (
                    <>Starting at ${device?.price?.en}</>
                  )}
                </>
              )}
            </div>
          </div> */}
          <div
            className={`${styles[`card__detail--box`]} ${
              handleSelectedRowHightLight(getValueByKey(DeviceKey, "capacity"))
                ? styles["card__detail--box-row-highlight"]
                : ""
            } ${
              handleSelectedBoxHightLight(`${device?.id}-capacity`)
                ? styles["card__detail--box-box-highlight"]
                : ""
            }`}
            onClick={() => handleSelectedBox(`${device?.id}-capacity`)}
          >
            <div
              className={
                styles["card__detail-capacity card__detail--box-white"]
              }
            >
              <ul>{rowArrayDisplay(device?.capacity)}</ul>
            </div>
          </div>
          {isMoreThan3Item(device?.capacity) && (
            <div className={styles["card__detail--box-expand"]}>
              <div
                className={styles["card__detail--box-expand-container"]}
                onClick={() => {
                  setOpenModal(true);
                  setTitleContent("Capacity");
                  setModalContent(device?.capacity);
                }}
              >
                <button
                  className={
                    styles["card__detail--box-expand-container-button"]
                  }
                >
                  <MdZoomOutMap />
                </button>
              </div>
            </div>
          )}
          <div
            className={`${styles["card__detail--box"]} ${
              styles["card__detail--box-grey"]
            } ${
              handleSelectedRowHightLight(getValueByKey(DeviceKey, "display"))
                ? styles["card__detail--box-row-highlight"]
                : ""
            } ${
              handleSelectedBoxHightLight(`${device?.id}-display`)
                ? styles["card__detail--box-box-highlight"]
                : ""
            }`}
            onClick={() => handleSelectedBox(`${device?.id}-display`)}
          >
            <div
              className={styles["card__detail-display card__detail--box-white"]}
            >
              <ul>
                {locale === "th"
                  ? rowArrayDisplay(device?.display?.th)
                  : rowArrayDisplay(device?.display?.en)}
              </ul>
            </div>
          </div>
          {isMoreThan3Item(device?.display?.en) && (
            <div className={styles["card__detail--box-expand"]}>
              <div
                className={styles["card__detail--box-expand-container"]}
                onClick={() => {
                  setOpenModal(true);
                  setTitleContent("Display");
                  setModalContent(
                    locale === "th" ? device?.display?.th : device?.display?.en
                  );
                }}
              >
                <button
                  className={
                    styles["card__detail--box-expand-container-button"]
                  }
                >
                  <MdZoomOutMap />
                </button>
              </div>
            </div>
          )}
          <div
            className={`${styles[`card__detail--box`]} ${
              handleSelectedRowHightLight(getValueByKey(DeviceKey, "chip_ram"))
                ? styles["card__detail--box-row-highlight"]
                : ""
            } ${
              handleSelectedBoxHightLight(`${device?.id}-chip_ram`)
                ? styles["card__detail--box-box-highlight"]
                : ""
            }`}
            onClick={() => handleSelectedBox(`${device?.id}-chip_ram`)}
          >
            <div
              className={
                styles["card__detail-chip_ram card__detail--box-white"]
              }
            >
              <ul>
                {locale === "th"
                  ? rowArrayDisplay(device?.chip_ram?.th)
                  : rowArrayDisplay(device?.chip_ram?.en)}
              </ul>
            </div>
          </div>
          {isMoreThan3Item(device?.chip_ram?.en) && (
            <div className={styles["card__detail--box-expand"]}>
              <div
                className={styles["card__detail--box-expand-container"]}
                onClick={() => {
                  setOpenModal(true);
                  setTitleContent("Chip&Ram");
                  setModalContent(
                    locale === "th"
                      ? device?.chip_ram?.th
                      : device?.chip_ram?.en
                  );
                }}
              >
                <button
                  className={
                    styles["card__detail--box-expand-container-button"]
                  }
                >
                  <MdZoomOutMap />
                </button>
              </div>
            </div>
          )}
          <div
            className={`${styles["card__detail--box"]} ${
              styles["card__detail--box-grey"]
            } ${
              handleSelectedRowHightLight(
                getValueByKey(DeviceKey, "main_camera")
              )
                ? styles["card__detail--box-row-highlight"]
                : ""
            } ${
              handleSelectedBoxHightLight(`${device?.id}-main_camera`)
                ? styles["card__detail--box-box-highlight"]
                : ""
            }`}
            onClick={() => handleSelectedBox(`${device?.id}-main_camera`)}
          >
            <div
              className={
                styles["card__detail-main_camera card__detail--box-white"]
              }
            >
              <ul>
                {locale === "th"
                  ? rowArrayDisplay(device?.main_camera?.th)
                  : rowArrayDisplay(device?.main_camera?.en)}
              </ul>
            </div>
          </div>
          {isMoreThan3Item(device?.main_camera?.en) && (
            <div className={styles["card__detail--box-expand"]}>
              <div
                className={styles["card__detail--box-expand-container"]}
                onClick={() => {
                  setOpenModal(true);
                  setTitleContent("Main camera");
                  setModalContent(
                    locale === "th"
                      ? device?.main_camera?.th
                      : device?.main_camera?.en
                  );
                }}
              >
                <button
                  className={
                    styles["card__detail--box-expand-container-button"]
                  }
                >
                  <MdZoomOutMap />
                </button>
              </div>
            </div>
          )}
          <div
            className={`${styles[`card__detail--box`]} ${
              handleSelectedRowHightLight(getValueByKey(DeviceKey, "video"))
                ? styles["card__detail--box-row-highlight"]
                : ""
            } ${
              handleSelectedBoxHightLight(`${device?.id}-video`)
                ? styles["card__detail--box-box-highlight"]
                : ""
            }`}
            onClick={() => handleSelectedBox(`${device?.id}-video`)}
          >
            <div
              className={styles["card__detail-video card__detail--box-white"]}
            >
              <ul>
                {locale === "th"
                  ? rowArrayDisplay(device?.video?.th)
                  : rowArrayDisplay(device?.video?.en)}
              </ul>
            </div>
          </div>
          {isMoreThan3Item(device?.video?.en) && (
            <div className={styles["card__detail--box-expand"]}>
              <div
                className={styles["card__detail--box-expand-container"]}
                onClick={() => {
                  setOpenModal(true);
                  setTitleContent("Video");
                  setModalContent(
                    locale === "th" ? device?.video?.th : device?.video?.en
                  );
                }}
              >
                <button
                  className={
                    styles["card__detail--box-expand-container-button"]
                  }
                >
                  <MdZoomOutMap />
                </button>
              </div>
            </div>
          )}
          <div
            className={`${styles["card__detail--box"]} ${
              styles["card__detail--box-grey"]
            } ${
              handleSelectedRowHightLight(
                getValueByKey(DeviceKey, "front_camera")
              )
                ? styles["card__detail--box-row-highlight"]
                : ""
            } ${
              handleSelectedBoxHightLight(`${device?.id}-front_camera`)
                ? styles["card__detail--box-box-highlight"]
                : ""
            }`}
            onClick={() => handleSelectedBox(`${device?.id}-front_camera`)}
          >
            <div
              className={
                styles["card__detail-front_camera card__detail--box-white"]
              }
            >
              <ul>
                {locale === "th"
                  ? rowArrayDisplay(device?.front_camera?.th)
                  : rowArrayDisplay(device?.front_camera?.en)}
              </ul>
            </div>
          </div>
          {isMoreThan3Item(device?.front_camera?.en) && (
            <div className={styles["card__detail--box-expand"]}>
              <div
                className={styles["card__detail--box-expand-container"]}
                onClick={() => {
                  setOpenModal(true);
                  setTitleContent("Front camera");
                  setModalContent(
                    locale === "th"
                      ? device?.front_camera?.th
                      : device?.front_camera?.en
                  );
                }}
              >
                <button
                  className={
                    styles["card__detail--box-expand-container-button"]
                  }
                >
                  <MdZoomOutMap />
                </button>
              </div>
            </div>
          )}
          <div
            className={`${styles[`card__detail--box`]} ${
              handleSelectedRowHightLight(getValueByKey(DeviceKey, "height"))
                ? styles["card__detail--box-row-highlight"]
                : ""
            } ${
              handleSelectedBoxHightLight(`${device?.id}-height`)
                ? styles["card__detail--box-box-highlight"]
                : ""
            }`}
            onClick={() => handleSelectedBox(`${device?.id}-height`)}
          >
            <div
              className={styles["card__detail-height card__detail--box-white"]}
            >
              <span>
                {locale === "th" ? device?.height?.th : device?.height?.en}
              </span>
            </div>
          </div>
          <div
            className={`${styles["card__detail--box"]} ${
              styles["card__detail--box-grey"]
            } ${
              handleSelectedRowHightLight(getValueByKey(DeviceKey, "width"))
                ? styles["card__detail--box-row-highlight"]
                : ""
            } ${
              handleSelectedBoxHightLight(`${device?.id}-width`)
                ? styles["card__detail--box-box-highlight"]
                : ""
            }`}
            onClick={() => handleSelectedBox(`${device?.id}-width`)}
          >
            <div
              className={styles["card__detail-width card__detail--box-white"]}
            >
              <span>
                {locale === "th" ? device?.width?.th : device?.width?.en}
              </span>
            </div>
          </div>
          <div
            className={`${styles[`card__detail--box`]} ${
              handleSelectedRowHightLight(getValueByKey(DeviceKey, "depth"))
                ? styles["card__detail--box-row-highlight"]
                : ""
            } ${
              handleSelectedBoxHightLight(`${device?.id}-depth`)
                ? styles["card__detail--box-box-highlight"]
                : ""
            }`}
            onClick={() => handleSelectedBox(`${device?.id}-depth`)}
          >
            <div
              className={styles["card__detail-depth card__detail--box-white"]}
            >
              <span>
                {locale === "th" ? device?.depth?.th : device?.depth?.en}
              </span>
            </div>
          </div>
          <div
            className={`${styles["card__detail--box"]} ${
              styles["card__detail--box-grey"]
            } ${
              handleSelectedRowHightLight(getValueByKey(DeviceKey, "weight"))
                ? styles["card__detail--box-row-highlight"]
                : ""
            } ${
              handleSelectedBoxHightLight(`${device?.id}-weight`)
                ? styles["card__detail--box-box-highlight"]
                : ""
            }`}
            onClick={() => handleSelectedBox(`${device?.id}-weight`)}
          >
            <div
              className={styles["card__detail-weight card__detail--box-white"]}
            >
              <span>
                {locale === "th" ? device?.weight?.th : device?.weight?.en}
              </span>
            </div>
          </div>
          <div
            className={`${styles[`card__detail--box`]} ${
              handleSelectedRowHightLight(
                getValueByKey(DeviceKey, "cellular_wireless")
              )
                ? styles["card__detail--box-row-highlight"]
                : ""
            } ${
              handleSelectedBoxHightLight(`${device?.id}-cellular_wireless`)
                ? styles["card__detail--box-box-highlight"]
                : ""
            }`}
            onClick={() => handleSelectedBox(`${device?.id}-cellular_wireless`)}
          >
            <div
              className={
                styles["card__detail-cellular_wireless card__detail--box-white"]
              }
            >
              <ul>
                {locale === "th"
                  ? rowArrayDisplay(device?.cellular_wireless?.th)
                  : rowArrayDisplay(device?.cellular_wireless?.en)}
              </ul>
            </div>
          </div>
          {isMoreThan3Item(device?.cellular_wireless?.en) && (
            <div className={styles["card__detail--box-expand"]}>
              <div
                className={styles["card__detail--box-expand-container"]}
                onClick={() => {
                  setOpenModal(true);
                  setTitleContent("Cellular wireless");
                  setModalContent(
                    locale === "th"
                      ? device?.cellular_wireless?.th
                      : device?.cellular_wireless?.en
                  );
                }}
              >
                <button
                  className={
                    styles["card__detail--box-expand-container-button"]
                  }
                >
                  <MdZoomOutMap />
                </button>
              </div>
            </div>
          )}
          <div
            className={`${styles["card__detail--box"]} ${
              styles["card__detail--box-grey"]
            } ${
              handleSelectedRowHightLight(
                getValueByKey(DeviceKey, "power_battery")
              )
                ? styles["card__detail--box-row-highlight"]
                : ""
            } ${
              handleSelectedBoxHightLight(`${device?.id}-power_battery`)
                ? styles["card__detail--box-box-highlight"]
                : ""
            }`}
            onClick={() => handleSelectedBox(`${device?.id}-power_battery`)}
          >
            <div
              className={
                styles["card__detail-power_battery card__detail--box-white"]
              }
            >
              <ul>
                {locale === "th"
                  ? rowArrayDisplay(device?.power_battery?.th)
                  : rowArrayDisplay(device?.power_battery?.en)}
              </ul>
            </div>
          </div>
          {isMoreThan3Item(device?.power_battery?.en) && (
            <div className={styles["card__detail--box-expand"]}>
              <div
                className={styles["card__detail--box-expand-container"]}
                onClick={() => {
                  setOpenModal(true);
                  setTitleContent("Power battery");
                  setModalContent(
                    locale === "th"
                      ? device?.power_battery?.th
                      : device?.power_battery?.en
                  );
                }}
              >
                <button
                  className={
                    styles["card__detail--box-expand-container-button"]
                  }
                >
                  <MdZoomOutMap />
                </button>
              </div>
            </div>
          )}
          <div
            className={`${styles[`card__detail--box`]} ${
              handleSelectedRowHightLight(getValueByKey(DeviceKey, "sim_card"))
                ? styles["card__detail--box-row-highlight"]
                : ""
            } ${
              handleSelectedBoxHightLight(`${device?.id}-sim_card`)
                ? styles["card__detail--box-box-highlight"]
                : ""
            }`}
            onClick={() => handleSelectedBox(`${device?.id}-sim_card`)}
          >
            <div
              className={
                styles["card__detail-sim_card card__detail--box-white"]
              }
            >
              <ul>
                {locale === "th"
                  ? rowArrayDisplay(device?.sim_card?.th)
                  : rowArrayDisplay(device?.sim_card?.en)}
              </ul>
            </div>
          </div>
          {isMoreThan3Item(device?.sim_card?.en) && (
            <div className={styles["card__detail--box-expand"]}>
              <div
                className={styles["card__detail--box-expand-container"]}
                onClick={() => {
                  setOpenModal(true);
                  setTitleContent("Sim card");
                  setModalContent(
                    locale === "th"
                      ? device?.sim_card?.th
                      : device?.sim_card?.en
                  );
                }}
              >
                <button
                  className={
                    styles["card__detail--box-expand-container-button"]
                  }
                >
                  <MdZoomOutMap />
                </button>
              </div>
            </div>
          )}
          <div
            className={`${styles["card__detail--box"]} ${
              styles["card__detail--box-grey"]
            } ${
              handleSelectedRowHightLight(getValueByKey(DeviceKey, "connector"))
                ? styles["card__detail--box-row-highlight"]
                : ""
            } ${
              handleSelectedBoxHightLight(`${device?.id}-connector`)
                ? styles["card__detail--box-box-highlight"]
                : ""
            }`}
            onClick={() => handleSelectedBox(`${device?.id}-connector`)}
          >
            <div
              className={
                styles["card__detail-connector card__detail--box-white"]
              }
            >
              <span>{device?.connector}</span>
            </div>
          </div>
          <div
            className={`${styles[`card__detail--box`]} ${
              handleSelectedRowHightLight(
                getValueByKey(DeviceKey, "official_website")
              )
                ? styles["card__detail--box-row-highlight"]
                : ""
            } ${
              handleSelectedBoxHightLight(`${device?.id}-official_website`)
                ? styles["card__detail--box-box-highlight"]
                : ""
            }`}
            onClick={() => handleSelectedBox(`${device?.id}-official_website`)}
          >
            <div
              className={
                styles["card__detail-official_website card__detail--box-white"]
              }
            >
              <a
                href={
                  locale === "th"
                    ? device?.official_website?.th
                    : device?.official_website?.en
                }
                rel="noreferrer"
                target="_blank"
              >
                {locale === "th"
                  ? device?.official_website?.th
                  : device?.official_website?.en}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

import React from "react";
import styles from "./TitleRowCard.module.scss";
import { DeviceKey } from "../../services/DeviceService";

interface TitleRowCardProps {
  handleSelectRow: (row: string) => void;
  handleSelectedRowHightLight: (row: string) => boolean;
}

const TitleRowCard = ({
  handleSelectRow,
  handleSelectedRowHightLight,
}: TitleRowCardProps) => {
  return (
    <div className={styles["title-row-card"]}>
      <div className={styles["title-row-card__detail"]}>
        <div
          className={`${styles[`title-row-card__detail--box`]} ${
            handleSelectedRowHightLight(DeviceKey?.color)
              ? styles["title-row-card__detail--box-highlight"]
              : ""
          }
          `}
          onClick={() => handleSelectRow(DeviceKey?.color)}
        >
          <span className={styles["title-row-card__detail-color"]}>Color</span>
        </div>
        <div
          className={`${styles[`title-row-card__detail--box`]} ${
            styles["title-row-card__detail--box-grey"]
          } ${
            handleSelectedRowHightLight(DeviceKey?.brand)
              ? styles["title-row-card__detail--box-highlight"]
              : ""
          }
          `}
          onClick={() => handleSelectRow(DeviceKey?.brand)}
        >
          <span className={styles["title-row-card__detail-brand"]}>Brand</span>
        </div>
        {/* <div
          className={`${styles[`title-row-card__detail--box`]} ${
            handleSelectedRowHightLight(DeviceKey?.price)
              ? styles["title-row-card__detail--box-highlight"]
              : ""
          }
          `}
          onClick={() => handleSelectRow(DeviceKey?.price)}
        >
          <span className={styles["title-row-card__detail-price"]}>Price</span>
        </div> */}
        <div
          className={`${styles[`title-row-card__detail--box`]}  ${
            handleSelectedRowHightLight(DeviceKey?.capacity)
              ? styles["title-row-card__detail--box-highlight"]
              : ""
          }
          `}
          onClick={() => handleSelectRow(DeviceKey?.capacity)}
        >
          <span className={styles["title-row-card__detail-capacity"]}>
            Capacity
          </span>
        </div>
        <div
          className={`${styles[`title-row-card__detail--box`]} ${
            styles["title-row-card__detail--box-grey"]
          } ${
            handleSelectedRowHightLight(DeviceKey?.display)
              ? styles["title-row-card__detail--box-highlight"]
              : ""
          }
          `}
          onClick={() => handleSelectRow(DeviceKey?.display)}
        >
          <span className={styles["title-row-card__detail-display"]}>
            Display
          </span>
        </div>
        <div
          className={`${styles[`title-row-card__detail--box`]} ${
            handleSelectedRowHightLight(DeviceKey?.chip_ram)
              ? styles["title-row-card__detail--box-highlight"]
              : ""
          }
          `}
          onClick={() => handleSelectRow(DeviceKey?.chip_ram)}
        >
          <span className={styles["title-row-card__detail-chip_ram"]}>
            Chip&Ram
          </span>
        </div>
        <div
          className={`${styles[`title-row-card__detail--box`]} ${
            styles["title-row-card__detail--box-grey"]
          } ${
            handleSelectedRowHightLight(DeviceKey?.main_camera)
              ? styles["title-row-card__detail--box-highlight"]
              : ""
          }
          `}
          onClick={() => handleSelectRow(DeviceKey?.main_camera)}
        >
          <span className={styles["title-row-card__detail-main_camera"]}>
            Main camera
          </span>
        </div>
        <div
          className={`${styles[`title-row-card__detail--box`]} ${
            handleSelectedRowHightLight(DeviceKey?.video)
              ? styles["title-row-card__detail--box-highlight"]
              : ""
          }
          `}
          onClick={() => handleSelectRow(DeviceKey?.video)}
        >
          <span className={styles["title-row-card__detail-video"]}>Video</span>
        </div>
        <div
          className={`${styles[`title-row-card__detail--box`]} ${
            styles["title-row-card__detail--box-grey"]
          } ${
            handleSelectedRowHightLight(DeviceKey?.front_camera)
              ? styles["title-row-card__detail--box-highlight"]
              : ""
          }
          `}
          onClick={() => handleSelectRow(DeviceKey?.front_camera)}
        >
          <span className={styles["title-row-card__detail-front_camera"]}>
            Front camera
          </span>
        </div>
        <div
          className={`${styles[`title-row-card__detail--box`]} ${
            handleSelectedRowHightLight(DeviceKey?.height)
              ? styles["title-row-card__detail--box-highlight"]
              : ""
          }
          `}
          onClick={() => handleSelectRow(DeviceKey?.height)}
        >
          <span className={styles["title-row-card__detail-height"]}>
            Height
          </span>
        </div>
        <div
          className={`${styles[`title-row-card__detail--box`]} ${
            styles["title-row-card__detail--box-grey"]
          } ${
            handleSelectedRowHightLight(DeviceKey?.width)
              ? styles["title-row-card__detail--box-highlight"]
              : ""
          }
          `}
          onClick={() => handleSelectRow(DeviceKey?.width)}
        >
          <span className={styles["title-row-card__detail-width"]}>Width</span>
        </div>
        <div
          className={`${styles[`title-row-card__detail--box`]} ${
            handleSelectedRowHightLight(DeviceKey?.depth)
              ? styles["title-row-card__detail--box-highlight"]
              : ""
          }
          `}
          onClick={() => handleSelectRow(DeviceKey?.depth)}
        >
          <span className={styles["title-row-card__detail-depth"]}>Depth</span>
        </div>
        <div
          className={`${styles[`title-row-card__detail--box`]} ${
            styles["title-row-card__detail--box-grey"]
          } ${
            handleSelectedRowHightLight(DeviceKey?.weight)
              ? styles["title-row-card__detail--box-highlight"]
              : ""
          }
          `}
          onClick={() => handleSelectRow(DeviceKey?.weight)}
        >
          <span className={styles["title-row-card__detail-weight"]}>
            Weight
          </span>
        </div>
        <div
          className={`${styles[`title-row-card__detail--box`]}  ${
            handleSelectedRowHightLight(DeviceKey?.cellular_wireless)
              ? styles["title-row-card__detail--box-highlight"]
              : ""
          }
          `}
          onClick={() => handleSelectRow(DeviceKey?.cellular_wireless)}
        >
          <span className={styles["title-row-card__detail-cellular_wireless"]}>
            Cellular wireless
          </span>
        </div>
        <div
          className={`${styles[`title-row-card__detail--box`]} ${
            styles["title-row-card__detail--box-grey"]
          } ${
            handleSelectedRowHightLight(DeviceKey?.power_battery)
              ? styles["title-row-card__detail--box-highlight"]
              : ""
          }
          `}
          onClick={() => handleSelectRow(DeviceKey?.power_battery)}
        >
          <span className={styles["title-row-card__detail-power_battery"]}>
            Power Battery
          </span>
        </div>
        <div
          className={`${styles[`title-row-card__detail--box`]} ${
            handleSelectedRowHightLight(DeviceKey?.sim_card)
              ? styles["title-row-card__detail--box-highlight"]
              : ""
          }
          `}
          onClick={() => handleSelectRow(DeviceKey?.sim_card)}
        >
          <span className={styles["title-row-card__detail-sim_card"]}>
            Sim card
          </span>
        </div>
        <div
          className={`${styles[`title-row-card__detail--box`]} ${
            styles["title-row-card__detail--box-grey"]
          } ${
            handleSelectedRowHightLight(DeviceKey?.connector)
              ? styles["title-row-card__detail--box-highlight"]
              : ""
          }
          `}
          onClick={() => handleSelectRow(DeviceKey?.connector)}
        >
          <span className={styles["title-row-card__detail-connector"]}>
            Connector
          </span>
        </div>
        <div
          className={`${styles[`title-row-card__detail--box`]}  ${
            handleSelectedRowHightLight(DeviceKey?.official_website)
              ? styles["title-row-card__detail--box-highlight"]
              : ""
          }
          `}
          onClick={() => handleSelectRow(DeviceKey?.official_website)}
        >
          <span className={styles["title-row-card__detail-official_website"]}>
            Official website
          </span>
        </div>
      </div>
    </div>
  );
};

export default TitleRowCard;

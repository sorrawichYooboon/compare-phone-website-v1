import React from "react";
import styles from "./Footer.module.scss";
import { IoIosArrowUp } from "react-icons/io";
import { useTranslations } from "next-intl";
import Link from "next/link";

const Footer: React.FC = () => {
  const t = useTranslations();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles["footer"]}>
      <div className={styles["footer__top"]}>
        <div className={styles["footer__top-container"]}>
          <div className={styles["footer__top-container-left"]}>
            <div className={styles["footer__top-container-left--follow"]}>
              <span
                className={styles["footer__top-container-left--follow-wording"]}
              >
                FOLLOW
              </span>
              <span
                className={styles["footer__top-container-left--follow-hash"]}
              >
                #FLOWECH
              </span>
            </div>
            <div className={styles["footer__top-container-left--channel"]}>
              <Link
                className={styles["footer__top-container-left--channel-icon"]}
                href={"https://www.instagram.com/flowech.official/"}
                target="_blank"
                rel="noreferrer"
              >
                IG
              </Link>
              <Link
                className={styles["footer__top-container-left--channel-icon"]}
                href={"https://page.line.me/709cgixx"}
                target="_blank"
                rel="noreferrer"
              >
                LINE
              </Link>
              <Link
                href={
                  "https://www.tiktok.com/@flowechofficial?_t=8bDXXIRhOuw&_r=1"
                }
                target="_blank"
                rel="noreferrer"
                className={styles["footer__top-container-left--channel-icon"]}
              >
                TikTok
              </Link>
            </div>
          </div>
          <div className={styles["footer__top-container-middle"]}>
            {t("footer.description")}
          </div>
          <div className={styles["footer__top-container-right"]}>FLOWECH</div>
        </div>
      </div>
      <div className={styles["footer__middle"]}>
        <span className={styles["footer__middle-text"]} onClick={scrollToTop}>
          {t("footer.back_to_top")}&nbsp;
          <IoIosArrowUp />
        </span>
      </div>
      <div className={styles["footer__bottom"]}>
        <Link
          className={styles["footer__bottom-channel"]}
          href={"https://www.instagram.com/flowech.official/"}
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </Link>
        <Link
          className={styles["footer__bottom-channel"]}
          href={"https://page.line.me/709cgixx"}
          target="_blank"
          rel="noreferrer"
        >
          LINE OA
        </Link>
        <Link
          href={"https://www.tiktok.com/@flowechofficial?_t=8bDXXIRhOuw&_r=1"}
          target="_blank"
          rel="noreferrer"
          className={styles["footer__bottom-channel"]}
        >
          TikTok
        </Link>
      </div>
    </div>
  );
};

export default Footer;

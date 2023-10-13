import React from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [isNavbarScroll, setIsNavbarScroll] = useState(false);
  const t = useTranslations();
  const { asPath } = useRouter();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) {
        setIsNavbarScroll(true);
      } else {
        setIsNavbarScroll(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      className={`${styles["navbar"]} ${
        isNavbarScroll && styles["navbar__scrolling"]
      }`}
    >
      <div className={styles["navbar__container"]}>
        <div />
        <div
          data-testid="right-side-navbar"
          className={styles["navbar__container-right"]}
        >
          <Link
            className={styles["navbar__container-right-text-left"]}
            href={"https://www.instagram.com/flowech.official/"}
            target="_blank"
            rel="noreferrer"
          >
            {t("navbar.instagram")}
          </Link>
          <Link
            className={styles["navbar__container-right-text-right"]}
            href={"https://page.line.me/709cgixx"}
            target="_blank"
            rel="noreferrer"
          >
            {t("navbar.line_oa")}
          </Link>
          <Link
            href={"https://www.tiktok.com/@flowechofficial?_t=8bDXXIRhOuw&_r=1"}
            target="_blank"
            rel="noreferrer"
            className={styles["navbar__container-right-text-right"]}
          >
            TikTok
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

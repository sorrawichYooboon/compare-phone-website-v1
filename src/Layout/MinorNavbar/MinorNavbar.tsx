import { useEffect, useState } from "react";

import { CgClose } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import FlowechLogo from "../../../public/flowech_logo_04042023_512x512.png";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";
import Link from "next/link";
import { Modal } from "antd";
import { PATH } from "@/constants/path";
import { createCheckoutSession } from "@/stripe/createCheckoutSession";
import styles from "./MinorNavbar.module.scss";
import { useAuthentication } from "@/context/useAuthentication";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

interface MinorNavbarProps {
  isNonFooterLayout?: boolean;
}

const MinorNavbar = ({ isNonFooterLayout }: MinorNavbarProps) => {
  const t = useTranslations();
  const [openBurger, setOpenBurger] = useState<boolean>(false);
  const [openConfirmLogoutModal, setOpenConfirmLogoutModal] =
    useState<boolean>(false);
  const [bgColor, setBgColor] = useState("minor-navbar__box-shadow--hide");
  const { asPath } = useRouter();
  const { user, handleUserLogout } = useAuthentication();
  const [isOnScroll, setIsOnScroll] = useState(false);
  const [isOnScrollDesktopView, setIsOnScrollDesktopView] = useState(false);
  const router = useRouter();

  const authenticationRedirect = async (query: string) => {
    await router.push({
      pathname: PATH.AUTHENTICATION_PAGE,
      query: { action: query },
    });
  };

  useEffect(() => {
    const handleScrollY = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 10) {
        setIsOnScroll(true);
      } else {
        setIsOnScroll(false);
      }
    };

    window.addEventListener("scroll", handleScrollY);
    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 10) {
        setIsOnScrollDesktopView(true);
      } else {
        setIsOnScrollDesktopView(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleOpenBurger = () => {
    setOpenBurger(true);
  };

  const handleLogout = async () => {
    setOpenConfirmLogoutModal(false);
    handleUserLogout();
    await router.push({
      pathname: PATH.AUTHENTICATION_PAGE,
      query: { action: "login" },
    });
  };

  const ConfirmLogoutModal = () => {
    return (
      <Modal
        centered
        open={openConfirmLogoutModal}
        closable={false}
        onCancel={() => setOpenConfirmLogoutModal(false)}
        footer={null}
      >
        <div className={styles["modal__container"]}>
          <div className={styles["modal__container--logout"]}>
            <FiLogOut className={styles["modal__container--logout-icon"]} />
            <h3 className={styles["modal__container--logout-title"]}>
              {t("minor_navbar.logout_title")}
            </h3>
            <p className={styles["modal__container--logout-description"]}>
              {t("minor_navbar.logout_description")}
            </p>
            <div></div>
            <button
              className={styles["modal__container--logout-button"]}
              onClick={handleLogout}
            >
              {t("minor_navbar.logout")}
            </button>
            <button
              className={styles["modal__container--logout-cancel-button"]}
              onClick={() => setOpenConfirmLogoutModal(false)}
            >
              {t("minor_navbar.cancel")}
            </button>
          </div>
        </div>
      </Modal>
    );
  };

  return (
    <div
      className={`${styles["minor-navbar"]} ${styles[bgColor]} 
      ${isOnScrollDesktopView && styles["minor-navbar__scrolling"]}
      ${
        isNonFooterLayout &&
        styles["minor-navbar__non-footer-layout-background"]
      }`}
    >
      {openConfirmLogoutModal && <ConfirmLogoutModal />}
      <div className={styles["minor-navbar__container"]}>
        <div
          className={`${styles["minor-navbar__container-left"]} ${
            isNonFooterLayout &&
            styles["minor-navbar__container-left-non-footer-layout"]
          }`}
        >
          <div className={styles["minor-navbar__container-left-language"]}>
            <Link
              rel="noreferrer"
              data-testid="left-side-navbar"
              className={styles["minor-navbar__container-left-language--thai"]}
              href={asPath}
              locale="th"
            >
              TH
            </Link>
            <span
              className={
                styles["minor-navbar__container-left-language--middle"]
              }
            >
              &nbsp;|&nbsp;
            </span>
            <Link
              rel="noreferrer"
              className={
                styles["minor-navbar__container-left-language--english"]
              }
              href={asPath}
              locale="en"
            >
              EN
            </Link>
          </div>

          <div
            className={styles["minor-navbar__container-left--left-side"]}
            onClick={() => router.push("/")}
          >
            FLOWECH
          </div>
        </div>
        <div
          className={`${styles["minor-navbar__container--right-side"]}
        ${
          isNonFooterLayout &&
          styles["minor-navbar__container--right-side-non-footer-layout"]
        }`}
        >
          <button
            className={styles["minor-navbar__container--right-side-compare"]}
            onClick={() => router.push("/")}
          >
            {t("minor_navbar.compare_page")}
          </button>
          <Link
            className={styles["minor-navbar__container--right-side-compare"]}
            href={"https://www.instagram.com/flowech.official/"}
            target="_blank"
            rel="noreferrer"
          >
            {t("navbar.instagram")}
          </Link>
          <Link
            className={styles["minor-navbar__container--right-side-compare"]}
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
            className={styles["minor-navbar__container--right-side-compare"]}
          >
            TikTok
          </Link>
          {user ? (
            <>
              {/* <button
                className={
                  styles["minor-navbar__container--right-side-compare"]
                }
                onClick={() => createCheckoutSession(user?.uid)}
              >
                Upgrate to premium!
              </button> */}
              <span
                className={
                  styles["minor-navbar__container--right-side-display-name"]
                }
              >
                {t("minor_navbar.hello")} {user?.displayName}!
              </span>
              <button
                className={
                  styles["minor-navbar__container--right-side-compare"]
                }
                onClick={() => setOpenConfirmLogoutModal(true)}
              >
                {t("minor_navbar.logout")}
              </button>
            </>
          ) : (
            <>
              <button
                className={
                  styles["minor-navbar__container--right-side-compare"]
                }
                onClick={() => authenticationRedirect("login")}
              >
                {t("minor_navbar.login_page")}
              </button>
              <button
                className={
                  styles["minor-navbar__container--right-side-compare"]
                }
                onClick={() => authenticationRedirect("register")}
              >
                {t("minor_navbar.register_page")}
              </button>
            </>
          )}
        </div>
      </div>
      <div
        className={`${styles["minor-navbar__phone-container"]} ${
          isOnScroll && styles["minor-navbar__phone-container-scroll"]
        }`}
      >
        <div
          className={`${styles["minor-navbar__phone-container--language"]} ${
            isNonFooterLayout &&
            styles["minor-navbar__phone-container--language-non-footer-layout"]
          }`}
        >
          <Link
            rel="noreferrer"
            data-testid="left-side-navbar"
            className={styles["minor-navbar__phone-container--language-thai"]}
            href={asPath}
            locale="th"
          >
            TH
          </Link>
          <span
            className={styles["minor-navbar__phone-container--language-middle"]}
          >
            &nbsp;|&nbsp;
          </span>
          <Link
            rel="noreferrer"
            className={
              styles["minor-navbar__phone-container--language-english"]
            }
            href={asPath}
            locale="en"
          >
            EN
          </Link>
        </div>
        <h3
          className={`${styles["minor-navbar__phone-container--logo"]} ${
            isNonFooterLayout &&
            styles["minor-navbar__phone-container--logo-non-footer-layout"]
          }`}
          onClick={() => router.push("/")}
        >
          {(isOnScroll || isNonFooterLayout) && "FLOWECH"}
        </h3>
        <button
          className={`${styles["minor-navbar__phone-container--burger"]} ${
            isNonFooterLayout &&
            styles["minor-navbar__phone-container--burger-non-footer-layout"]
          }`}
          onClick={handleOpenBurger}
        >
          <GiHamburgerMenu />
        </button>
      </div>
      {openBurger && (
        <div className={styles["minor-navbar__overlay-container"]}>
          <div
            className={styles["minor-navbar__overlay-container-left"]}
            onClick={() => setOpenBurger(false)}
          />
          <div className={styles["minor-navbar__overlay-container-side"]}>
            <div
              className={
                styles["minor-navbar__overlay-container-side-container"]
              }
            >
              <div
                className={
                  styles["minor-navbar__overlay-container-side-container-close"]
                }
              >
                <button
                  className={
                    styles[
                      "minor-navbar__overlay-container-side-container-close-button"
                    ]
                  }
                  onClick={() => setOpenBurger(false)}
                >
                  <CgClose />
                </button>
              </div>
              <div
                className={styles["minor-navbar__overlay-container-side-list"]}
              >
                {user && (
                  <button
                    className={
                      styles["minor-navbar__overlay-container-side-list-text"]
                    }
                  >
                    {t("minor_navbar.hello")} {user?.displayName}!
                  </button>
                )}
                <button
                  className={
                    styles["minor-navbar__overlay-container-side-list-text"]
                  }
                  onClick={() => router.push("/")}
                >
                  {t("minor_navbar.compare_page")}
                </button>
                {!user && (
                  <>
                    <button
                      className={
                        styles["minor-navbar__overlay-container-side-list-text"]
                      }
                      onClick={() => authenticationRedirect("login")}
                    >
                      {t("minor_navbar.login_page")}
                    </button>
                    <button
                      className={
                        styles["minor-navbar__overlay-container-side-list-text"]
                      }
                      onClick={() => authenticationRedirect("register")}
                    >
                      {t("minor_navbar.register_page")}
                    </button>
                  </>
                )}

                <Link
                  href={"https://www.instagram.com/flowech.official/"}
                  target="_blank"
                  rel="noreferrer"
                  className={
                    styles["minor-navbar__overlay-container-side-list-text"]
                  }
                >
                  Instagram
                </Link>
                <Link
                  href={"https://page.line.me/709cgixx"}
                  target="_blank"
                  rel="noreferrer"
                  className={
                    styles["minor-navbar__overlay-container-side-list-text"]
                  }
                >
                  Line OA
                </Link>
                <Link
                  href={
                    "https://www.tiktok.com/@flowechofficial?_t=8bDXXIRhOuw&_r=1"
                  }
                  target="_blank"
                  rel="noreferrer"
                  className={
                    styles["minor-navbar__overlay-container-side-list-text"]
                  }
                >
                  TikTok
                </Link>
                {user && (
                  <button
                    className={
                      styles["minor-navbar__overlay-container-side-list-text"]
                    }
                    onClick={() => handleLogout()}
                  >
                    {t("minor_navbar.logout")}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MinorNavbar;

import React from "react";
import Navbar from "../Navbar/Navbar";
import MinorNavbar from "../MinorNavbar/MinorNavbar";
import styles from "./NonFooterLayout.module.scss";

interface NonFooterLayoutProps {
  children: React.ReactNode;
}

const NonFooterLayout: React.FC<NonFooterLayoutProps> = ({ children }) => {
  return (
    <div className={styles["non-footer-layout"]}>
      <div className={styles["non-footer-layout__navbar"]}>
        <Navbar />
      </div>
      <MinorNavbar isNonFooterLayout={true} />
      <div className={styles["non-footer-layout__container"]}>
        <div className={styles["non-footer-layout__container--children"]}>
          {children}
        </div>
      </div>
    </div>
  );
};

const NonFooterLayoutWithDevice: React.FC<NonFooterLayoutProps> = ({
  children,
}: NonFooterLayoutProps) => {
  return (
    <>
      <NonFooterLayout>{children}</NonFooterLayout>
    </>
  );
};

export default NonFooterLayoutWithDevice;

import React from "react";
import Navbar from "../Navbar/Navbar";
import MinorNavbar from "../MinorNavbar/MinorNavbar";
import Footer from "../Footer/Footer";
import styles from "./MainLayout.module.scss";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles["main-layout"]}>
      <MinorNavbar />
      <div className={styles["main-layout__navbar"]}>
        <Navbar />
      </div>
      <div className={styles["main-layout__container"]}>
        <div className={styles["main-layout__container--children"]}>
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

const MainLayoutWithDevice: React.FC<MainLayoutProps> = ({
  children,
}: MainLayoutProps) => {
  return <MainLayout>{children}</MainLayout>;
};

export default MainLayoutWithDevice;

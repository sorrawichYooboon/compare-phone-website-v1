import styles from "./TitleSection.module.scss";
import Instruction1 from "./../../../../public/instruction_1.png";
import Instruction2 from "./../../../../public/instruction_2.png";
import Instruction3 from "./../../../../public/instruction_3.png";
import Instruction4 from "./../../../../public/instruction_4.png";
import Instruction5 from "./../../../../public/instruction_5.png";
import Instruction6 from "./../../../../public/instruction_6.png";
import FlowechLogo from "../../../../public/flowech_logo_04042023_500x500_removebg.png";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import { AiOutlineArrowDown, AiOutlineArrowRight } from "react-icons/ai";

const TitleSection = () => {
  const t = useTranslations();
  const [step, setStep] = useState(1);
  const [stepImage, setStepImage] = useState(Instruction1);
  const [stepDescription, setStepDescription] = useState<string>(
    `${t("compare_page.title_section.mock_article1")}`
  );
  const [isHoverGoToSearch, setIsHoverGoToSearch] = useState(false);

  const onChangeStep = useCallback(
    (step: number) => {
      setStep(step);
      setStepDescription(
        `${t(`compare_page.title_section.mock_article${step}`)}`
      );
      setStepImage(
        [
          Instruction1,
          Instruction2,
          Instruction3,
          Instruction4,
          Instruction5,
          Instruction6,
        ][step - 1] || Instruction1
      );
    },
    [t]
  );

  useEffect(() => {
    onChangeStep(step);
  }, [t, step, onChangeStep]);

  const mostSearchSectionScroll = () => {
    const element = document.getElementById("most-search-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const searchSectionScroll = () => {
    const element = document.getElementById("search-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className={styles["title-section"]}>
      <div className={styles["title-section__background"]} />
      <div className={styles["title-section__container"]}>
        <div className={styles["title-section__container-glass-background"]} />
        <h1 className={styles["title-section__container--title"]}>
          {t("compare_page.title_section.mock_title_1")}
        </h1>
        <h1 className={styles["title-section__container--subtitle"]}>
          {t("compare_page.title_section.mock_title_2")}
        </h1>
        <br />
        <h2 className={styles["title-section__container--description"]}>
          {t("compare_page.title_section.mock_title_4")}
        </h2>
        <button
          className={styles["title-section__container--goto-search"]}
          onClick={searchSectionScroll}
          onMouseEnter={() => setIsHoverGoToSearch(true)}
          onMouseLeave={() => setIsHoverGoToSearch(false)}
        >
          {isHoverGoToSearch ? (
            <>
              {t("compare_page.title_section.join")}{" "}
              <AiOutlineArrowRight
                className={
                  styles["title-section__container--goto-search-arrow"]
                }
              />
            </>
          ) : (
            t("compare_page.title_section.join")
          )}
        </button>
        <div className={styles["title-section__container--goto-mostsearch"]}>
          <button
            className={
              styles["title-section__container--goto-mostsearch-button"]
            }
            onClick={mostSearchSectionScroll}
          >
            <AiOutlineArrowDown />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TitleSection;

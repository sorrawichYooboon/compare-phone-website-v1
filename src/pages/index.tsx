import { ReactElement } from "react";
import MainLayout from "@/Layout/MainLayout/MainLayout";
import SearchSection from "../features/compare/SearchSection/SearchSection";
import TitleSection from "../features/compare/TitleSection/TitleSection";
import TopSearchSection from "../features/compare/TopSearchSection/MostSearchSection";
import Head from "next/head";
import { useTranslations } from "next-intl";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: (await import(`locales/${locale}.json`)).default,
    },
  };
}

const Compare = () => {
  const t = useTranslations();
  return (
    <>
      <Head>
        <title>{t("compare_page.title")}</title>
        <meta name="description" content={t("compare_page.description")} />
      </Head>
      <TitleSection />
      <TopSearchSection />
      <SearchSection />
    </>
  );
};

Compare.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export default Compare;

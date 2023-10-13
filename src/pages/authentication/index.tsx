import { ReactElement } from "react";
import NonFooterLayout from "@/Layout/NonFooterLayout/NonFooterLayout";
import LoginSection from "@/features/login/LoginSection/LoginSection";
import RegisterSection from "@/features/register/RegisterSection/RegisterSection";
import Head from "next/head";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useAuthentication } from "@/context/useAuthentication";
import { useEffect } from "react";

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      messages: (await import(`locales/${locale}.json`)).default,
    },
  };
}

const Authentication = () => {
  const t = useTranslations();
  const router = useRouter();
  const { user } = useAuthentication();
  const { action } = router.query;

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <>
      <div className="authentication-page__background">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <Head>
        <title>{t("authentication_page.title")}</title>
        <meta
          name="description"
          content={t("authentication_page.description")}
        />
      </Head>
      {action === "login" && <LoginSection />}
      {action === "register" && <RegisterSection />}
    </>
  );
};

Authentication.getLayout = function getLayout(page: ReactElement) {
  return <NonFooterLayout>{page}</NonFooterLayout>;
};

export default Authentication;

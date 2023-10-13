import { Head, Html, Main, NextScript } from "next/document";

const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

export default function Document() {
  return (
    <Html>
      <Head>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());

                  gtag('config', '${googleAnalyticsId}');
                `,
          }}
        />
        <link rel="alternate" href="https://www.flowech.com/en" hrefLang="en" />
        <link
          rel="alternate"
          href="https://www.flowech.com/"
          hrefLang="x-default"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=optional"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/flowech-icon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

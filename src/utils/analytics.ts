declare global {
  interface Window {
    gtag: Function;
  }
}

const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

export const pageview = (url: string) => {
  if (googleAnalyticsId) {
    window.gtag("config", googleAnalyticsId, {
      page_path: url,
    });
  }
};

import AdvertBanner from "@/components/advert-settings/advert-banner";
import AdvertBannerTwo from "@/components/advert-settings/advert-banner-2";
import AdvertBannerThree from "@/components/advert-settings/advert-banner-3";
import AdvertBannerFour from "@/components/advert-settings/advert-banner-4";
import AdvertBannerFive from "@/components/advert-settings/advert-banner-5";
import AdvertBannerSix from "@/components/advert-settings/advert-banner-6";
import { fetchBanners } from "@/lib/fetchData";
import React from "react";

export default async function AdvertBannersPage() {
  const banner = await fetchBanners();

  return (
    <div>
      The website works with 5 Advert Banners all around the site
      <AdvertBanner banner={banner.banner_1} />
      <br />
      <AdvertBannerTwo banner={banner.banner_2} />
      <br />
      <AdvertBannerThree banner={banner.banner_3} />
      <br />
      <AdvertBannerFour banner={banner.banner_4} />
      <br />
      <AdvertBannerFive banner={banner.banner_5} />
      <br />
      <AdvertBannerSix banner={banner.banner_6} />
    </div>
  );
}

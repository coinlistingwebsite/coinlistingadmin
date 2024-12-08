import BannerOne from "@/components/cex-banners/banner-1";
import BannerTwo from "@/components/cex-banners/banner-2";
import BannerThree from "@/components/cex-banners/banner-3";
import BannerFour from "@/components/cex-banners/banner-4";
import BannerFive from "@/components/cex-banners/banner-5";
import BannerSix from "@/components/cex-banners/banner-6";
import BannerSeven from "@/components/cex-banners/banner-7";
import BannerEight from "@/components/cex-banners/banner-8";
import BannerNine from "@/components/cex-banners/banner-9";
import { fetchCexBanners } from "@/lib/fetchData";
import React from "react";

export const dynamic = "force-dynamic";

export default async function CexBannerPage() {
  const banner = await fetchCexBanners();

  if (!banner)
    return (
      <main className="max-w-7xl mx-auto py-40 text-center">
        <h1 className="text-3xl">404 - Page Not Found</h1>
        <p>Sorry, the page you are looking for could not be found.</p>
      </main>
    );

  return (
    <main>
      <span className="badge badge-warning badge-lg my-10">
        CEX GATE ADVERT BANNERS
      </span>

      <div className="grid gird-cols-1 md:grid-cols-2 gap-3">
        <BannerOne banner={banner.banner_1} />
        <BannerTwo banner={banner.banner_2} />
        <BannerThree banner={banner.banner_3} />
        <BannerFour banner={banner.banner_4} />
        <BannerFive banner={banner.banner_5} />
        <BannerSix banner={banner.banner_6} />
        {/* <BannerSeven banner={banner.banner_7} /> */}
      </div>

      <span className="badge badge-warning badge-lg my-10">
        CEX GATE Footer ADVERT BANNERS
      </span>

      {/* <div>
        <BannerEight banner={banner.banner_8} />

        <br />

        <BannerNine banner={banner.banner_9} />
      </div> */}
    </main>
  );
}

"use client";

import { useEffect, useRef } from "react";

type AdBannerProps = {
  dataAdSlot: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
  className?: string;
};

export function AdBanner({
  dataAdSlot,
  dataAdFormat = "auto",
  dataFullWidthResponsive = true,
  className = "",
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      // @ts-ignore
      if (typeof window !== "undefined" && window.adsbygoogle) {
        // @ts-ignore
        window.adsbygoogle.push({});
      }
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, []);

  // Replace this with your actual AdSense publisher ID when going live
  const AD_CLIENT_ID = "ca-pub-XXXXXXXXXXXXXXXX";

  return (
    <div className={`flex justify-center items-center my-6 overflow-hidden w-full ${className}`}>
      <div className="w-full max-w-[1200px] min-h-[90px] bg-muted/20 border border-muted/30 rounded flex items-center justify-center text-muted-foreground/50 text-sm">
        {/* AdSense ins tag */}
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", minWidth: "250px" }}
          data-ad-client={AD_CLIENT_ID}
          data-ad-slot={dataAdSlot}
          data-ad-format={dataAdFormat}
          data-full-width-responsive={dataFullWidthResponsive.toString()}
        />
        {/* Placeholder text shown during development or if ad blocker is active */}
        <span className="absolute pointer-events-none opacity-0">[ Advertisement ]</span>
      </div>
    </div>
  );
}

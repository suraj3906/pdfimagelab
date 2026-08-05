import { AdBanner } from "@/components/ads/ad-banner";

interface AdPlaceholderProps {
  type: "banner" | "sidebar" | "inline";
}

export function AdPlaceholder({ type }: AdPlaceholderProps) {
  let format = "auto";
  let slot = "";

  if (type === "banner") {
    format = "horizontal";
    slot = "banner-ad-slot";
  } else if (type === "sidebar") {
    format = "vertical";
    slot = "sidebar-ad-slot";
  } else if (type === "inline") {
    format = "fluid";
    slot = "inline-ad-slot";
  }

  return (
    <div className="w-full">
      <AdBanner dataAdSlot={slot} dataAdFormat={format} />
    </div>
  );
}

import React from "react";
import Marquee from "react-fast-marquee";

// Define the interface based on your JSON structure
interface Product {
  id: number | string;
  nameBn: string;
  image: string;
  today: number;
  unit: string;
  change: {
    dir: "up" | "down";
    pct: number;
  };
}

const MarqueeSection = async () => {
  let data: Product[] = [];

  try {
    const res = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/products",
      {
        next: { revalidate: 10 },
      },
    );

    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch marquee data:", error);
  }

  return (
    <div className="w-full bg-[#f9fafb] border-y border-gray-200 py-1.5">
      <Marquee direction="left" pauseOnHover={true} speed={80}>
        {data.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex items-center gap-2 px-6 border-r border-gray-300 text-sm font-medium text-gray-800"
          >
            {/* Category Icon */}
            <span className="text-base bg-white rounded-full p-0.5 shadow-sm">
              {item.image}
            </span>

            {/* Product Name & Price using native Bengali conversion */}
            <span>
              {item.nameBn} {item.today.toLocaleString("bn-BD")} টাকা/
              {item.unit === "kg" ? "কেজি" : item.unit}
            </span>

            {/* Price Change Indicator */}
            {item.change?.dir === "up" ? (
              <span className="text-[#e53e3e] flex items-center gap-1 font-bold">
                ▲ {item.change.pct.toLocaleString("bn-BD")}%
              </span>
            ) : (
              <span className="text-[#38a169] flex items-center gap-1 font-bold">
                ▼ {(item.change?.pct || 0).toLocaleString("bn-BD")}%
              </span>
            )}
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeSection;

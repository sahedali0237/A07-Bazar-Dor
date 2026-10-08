import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Product, Market } from "@/types/page";

export const MetaData = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");

  if (!res.ok) return { title: "Error" };

  const products: Product[] = await res.json();
  const data = products.find((product) => product.slug === slug);

  if (!data) return { title: "পণ্য পাওয়া যায়নি" };

  return {
    title: `${data.nameBn} এর আজকের বাজার দর`,
    description: `আজকে ${data.nameBn} এর দাম ${data.today} টাকা। গতকালের তুলনায় দাম ${
      data.change.dir === "up"
        ? "বেড়েছে"
        : data.change.dir === "down"
          ? "কমেছে"
          : "অপরিবর্তিত আছে"
    }।`,
  };
};

// 2. Details Page Component
const DetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await res.json();
  const data = products.find((product) => product.slug === slug);

  if (!data) {
    notFound();
  }

  const priceDiff = Math.abs(data.today - data.yesterday);

  const diffText =
    data.change.dir === "up"
      ? "বেড়েছে"
      : data.change.dir === "down"
        ? "কমেছে"
        : "পরিবর্তন হয়নি";

  const changeColorClass =
    data.change.dir === "up"
      ? "text-red-600"
      : data.change.dir === "down"
        ? "text-green-600"
        : "text-gray-500";

  const changeIcon =
    data.change.dir === "up" ? "▲" : data.change.dir === "down" ? "▼" : "—";

  const allMins: number[] = data.markets.map((market: Market) => market.min);
  const allMaxs: number[] = data.markets.map((market: Market) => market.max);

  const globalMin = Math.min(...allMins);
  const globalMax = Math.max(...allMaxs);

  const rowAverages: number[] = data.markets.map(
    (market: Market) => (market.min + market.max) / 2,
  );

  const totalAvg: number =
    rowAverages.reduce((acc, value) => acc + value, 0) / rowAverages.length;

  const formattedAvg: string | number = Number.isInteger(totalAvg)
    ? totalAvg
    : totalAvg.toFixed(2);

  const unitMap: Record<string, string> = {
    kg: "কেজি",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
  };

  const unit = unitMap[data.unit] || data.unit;

  return (
    <main className="min-h-screen bg-[#f4f7f5] px-4 py-8 text-gray-800 md:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Breadcrumb Section */}
        <nav className="text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-gray-900">
            হোম
          </Link>
          <span className="mx-2">&gt;</span>
          <span>{data.categoryNameBn}</span>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-900">{data.nameBn}</span>
        </nav>

        {/* Main Header Card */}
        <div className="flex flex-col justify-between gap-6 rounded-2xl bg-white p-6 md:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] md:flex-row md:items-center">
          <div className="flex items-center gap-5 md:gap-6">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#f4f7f5] text-4xl shadow-inner">
              {data.image}
            </div>

            <div>
              <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
                {data.nameBn}
              </h1>

              <p className="mb-2 text-sm text-gray-500">
                প্রতি {unit} - {data.categoryNameBn}
              </p>

              <p className="text-sm font-medium text-gray-600">
                গতকালের তুলনায় আজ দাম{" "}
                <span className="font-bold text-gray-900">{diffText}</span>
                {data.change.dir !== "flat" && (
                  <>
                    {" - "}
                    {priceDiff} টাকা
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="min-w-40 shrink-0 rounded-xl bg-[#f4f7f5] p-5 text-center">
            <p className="mb-2 text-xs font-semibold text-gray-500">
              আজকের দাম
            </p>

            <div className="mb-1 text-4xl font-bold text-gray-900">
              {data.today}
            </div>

            <p className="mb-2 text-xs text-gray-500">টাকা / {unit}</p>

            <div className={`text-xs font-bold ${changeColorClass}`}>
              {changeIcon} {data.change.pct}%
            </div>
          </div>
        </div>

        {/* Price Summary Section */}
        <section className="pt-2">
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            দামের সারসংক্ষেপ
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <p className="mb-2 text-sm font-medium text-gray-500">
                সর্বনিম্ন দাম
              </p>
              <div className="mb-2 flex items-baseline gap-1 text-3xl font-bold text-[#00a651]">
                {globalMin}
                <span className="text-base font-normal text-gray-500">
                  টাকা
                </span>
              </div>
              <p className="text-xs text-gray-400">সবচেয়ে কম দামের বাজার</p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <p className="mb-2 text-sm font-medium text-gray-500">
                সর্বাধিক দাম
              </p>
              <div className="mb-2 flex items-baseline gap-1 text-3xl font-bold text-[#ed1c24]">
                {globalMax}
                <span className="text-base font-normal text-gray-500">
                  টাকা
                </span>
              </div>
              <p className="text-xs text-gray-400">সবচেয়ে বেশি দামের বাজার</p>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
              <p className="mb-2 text-sm font-medium text-gray-500">গড় দাম</p>
              <div className="mb-2 flex items-baseline gap-1 text-3xl font-bold text-[#00a651]">
                {formattedAvg}
                <span className="text-base font-normal text-gray-500">
                  টাকা
                </span>
              </div>
              <p className="text-xs text-gray-400">প্রতি {unit}-এর হিসাবে</p>
            </div>
          </div>
        </section>

        {/* Market Based Price Table */}
        <section className="pt-4 pb-12">
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse whitespace-nowrap text-left">
                <thead>
                  <tr className="border-b border-gray-100 bg-[#fbfcfc]">
                    <th className="p-5 text-sm font-semibold text-gray-600">
                      বাজার
                    </th>
                    <th className="p-5 text-sm font-semibold text-gray-600">
                      বিভাগ
                    </th>
                    <th className="p-5 text-center text-sm font-semibold text-gray-600">
                      সর্বনিম্ন
                    </th>
                    <th className="p-5 text-center text-sm font-semibold text-gray-600">
                      সর্বাধিক
                    </th>
                    <th className="p-5 pr-8 text-right text-sm font-semibold text-gray-600">
                      গড়
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {data.markets.map((market: Market, index: number) => {
                    const rowAvg: number = (market.min + market.max) / 2;
                    const formattedRowAvg = Number.isInteger(rowAvg)
                      ? rowAvg
                      : rowAvg.toFixed(2);

                    return (
                      <tr
                        key={`${market.market}-${index}`}
                        className="transition-colors hover:bg-gray-50/50"
                      >
                        <td className="p-5 text-sm font-semibold text-gray-800">
                          {market.market}
                        </td>
                        <td className="p-5 text-sm text-gray-500">
                          {market.division}
                        </td>
                        <td className="p-5 text-center text-sm text-gray-700">
                          {market.min} টাকা
                        </td>
                        <td className="p-5 text-center text-sm text-gray-700">
                          {market.max} টাকা
                        </td>
                        <td className="p-5 pr-8 text-right text-sm font-bold text-gray-900">
                          {formattedRowAvg} টাকা
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default DetailsPage;

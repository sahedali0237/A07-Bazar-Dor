import Image from "next/image";
import Link from "next/link";
// import CurrentDate from "./currentDate";

import { connection } from "next/server";
import { Suspense } from "react";

const CurrentDate = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

  return <p className="mt-1 min-h-6 font-bold text-black">{date}</p>;
};
const Banner = () => {
  return (
    <section className="mx-4 mt-5 rounded-2xl border border-gray-200 bg-white px-8 py-6 md:px-10 md:py-7">
      <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-green-50 px-4 py-1.5 text-sm font-medium text-green-700 md:text-base">
            হালনাগাদ,{" "}
            <Suspense fallback={<p></p>}>
              <CurrentDate />
            </Suspense>
          </span>

          <h2 className="mt-3 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500 md:text-base md:leading-7">
            চাল, ডাল, তেল, মসলা, মাছ, মাংস, চিনিসহ ও অন্যান্য পণ্যের দাম —
            বাজারভিত্তিক বিস্তারিত, গত, সর্বশেষ-পরিবর্তন এবং নামমাত্র পরিবর্তন
            এক জায়গায়।
          </p>

          <Link
            href="/"
            className="mt-5 inline-block rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 md:text-base"
          >
            সব দাম দেখুন
          </Link>
        </div>

        <div className="shrink-0">
          <Image
            src="/image/bazar-hero.png"
            alt="বাজারের পণ্য"
            width={260}
            height={200}
            className="h-auto w-48 md:w-56"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;

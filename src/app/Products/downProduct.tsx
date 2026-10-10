import Link from "next/link";
import { Product } from "@/types/page";

type DownProductsProps = {
  products?: Product[];
  isLoading?: boolean;
};

const DownProducts = ({ products = [], isLoading }: DownProductsProps) => {
  if (isLoading) {
    return (
      <section className="mt-10">
        <div className="mb-5">
          <div className="h-8 w-32 rounded bg-gray-200 animate-pulse"></div>
          <div className="mt-2 h-4 w-48 rounded bg-gray-200 animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm animate-pulse"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-gray-200"></div>

                  <div>
                    <div className="mb-2 h-5 w-24 rounded bg-gray-200"></div>
                    <div className="h-4 w-16 rounded bg-gray-100"></div>
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <div className="mb-2 h-7 w-16 rounded bg-gray-200"></div>
                  <div className="h-3 w-8 rounded bg-gray-100"></div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="h-4 w-24 rounded bg-gray-200"></div>
                <div className="h-7 w-16 rounded-full bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-900">দাম কমেছে</h2>

        <p className="mt-1 text-sm text-gray-500">যেসব পণ্যের দাম আজ কমেছে</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/Products/${product.slug}`}
            className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-50 text-3xl">
                  {product.image}
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-green-600">
                    {product.nameBn}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    প্রতি {product.unit}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xl font-bold text-gray-900">
                  {product.today}
                </p>

                <p className="text-xs text-gray-500">টাকা</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="text-sm text-gray-500">
                গতকাল: {product.yesterday} টাকা
              </span>

              <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-bold text-green-600">
                ▼ {product.change.pct}%
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default DownProducts;

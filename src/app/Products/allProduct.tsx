import Link from "next/link";
import { Product } from "@/types/page";

type AllProductsProps = {
  products: Product[];
};

const AllProducts = ({ products }: AllProductsProps) => {
  return (
    <section className="mt-10">
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>

        <p className="mt-1 text-sm text-gray-500">সব পণ্যের বর্তমান বাজার দর</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => {
          const changeColor =
            product.change.dir === "up"
              ? "bg-red-50 text-red-600"
              : product.change.dir === "down"
                ? "bg-green-50 text-green-600"
                : "bg-gray-50 text-gray-500";

          const changeIcon =
            product.change.dir === "up"
              ? "▲"
              : product.change.dir === "down"
                ? "▼"
                : "—";

          return (
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
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600">
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
                  {product.categoryNameBn}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-bold ${changeColor}`}
                >
                  {changeIcon} {product.change.pct}%
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default AllProducts;

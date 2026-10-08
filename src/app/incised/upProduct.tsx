import Link from "next/link";

type UpProduct = {
  id: string | number;
  slug: string;
  image: string;
  nameBn: string;
  unit: string;
  today: number;
  change: {
    pct: number;
  };
};

const UpProducts = ({ products }: { products: UpProduct[] }) => {
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
          আজ দাম বেড়েছে ▲
        </h2>

        <p className="mt-1 text-gray-500">
          আজ যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-5 flex h-24 items-center justify-center rounded-xl bg-gray-50 text-5xl">
              {product.image}
            </div>

            <h3 className="text-lg font-bold text-gray-900">
              {product.nameBn}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              প্রতি{" "}
              {product.unit === "kg"
                ? "কেজি"
                : product.unit === "liter"
                  ? "লিটার"
                  : product.unit === "dozen"
                    ? "ডজন"
                    : product.unit === "piece"
                      ? "পিস"
                      : product.unit}
            </p>

            <div className="mt-5 flex items-end justify-between gap-3">
              <div>
                <p className="text-sm text-gray-500">আজকের দাম</p>
                <p className="mt-1 text-xl font-bold text-gray-900">
                  {product.today} টাকা
                </p>
              </div>

              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
                ▲ {product.change.pct}%
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default UpProducts;

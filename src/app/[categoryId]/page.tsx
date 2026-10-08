import SortDropdown from "../components/SortDropdown";

interface Market {
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: string | number;
  categoryNameBn?: string;
  categoryIcon?: string;
  nameBn: string;
  unit: string;
  image?: string;
  today: string | number;
  yesterday?: string | number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets?: Market[];
}

interface PageProps {
  params: Promise<{
    categoryId: string;
  }>;
  searchParams: Promise<{
    sort?: string;
  }>;
}

const CategoryPage = async ({ params, searchParams }: PageProps) => {
  const { categoryId } = await params;
  const { sort } = await searchParams;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${categoryId}`,
    {
      next: { revalidate: 10 },
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const result = await res.json();

  console.log("API RESULT:", result);

  const products: Product[] = Array.isArray(result)
    ? result
    : result.products || [];

  // Copy array before sorting
  const sortedProducts = [...products];

  // Low to High
  if (sort === "price-asc") {
    sortedProducts.sort((a, b) => Number(a.today) - Number(b.today));
  }

  // High to Low
  if (sort === "price-desc") {
    sortedProducts.sort((a, b) => Number(b.today) - Number(a.today));
  }

  const firstProduct = sortedProducts[0];

  const categoryName = firstProduct?.categoryNameBn || categoryId;

  const categoryIcon = firstProduct?.categoryIcon || "🛒";

  return (
    <main className="min-h-screen bg-[#f4f6f4] px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Category Header */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f4f6f4] text-3xl">
                {categoryIcon}
              </div>

              <div>
                <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                  {categoryName}
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  মোট {sortedProducts.length} টি পণ্য
                </p>
              </div>
            </div>

            {/* Sort */}
            <SortDropdown />
          </div>
        </div>

        {/* Product Grid */}
        {sortedProducts.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center">
            <p className="text-gray-500">
              এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {sortedProducts.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-md"
              >
                {/* Product Information */}
                <div className="p-5">
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f4f6f4] text-2xl">
                        {product.image || "🛒"}
                      </div>

                      <div>
                        <h2 className="font-semibold text-gray-900">
                          {product.nameBn}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                          প্রতি {product.unit}
                        </p>
                      </div>
                    </div>

                    {/* Price Change */}
                    <div
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        product.change.dir === "up"
                          ? "bg-red-50 text-red-600"
                          : product.change.dir === "down"
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {product.change.dir === "up"
                        ? "▲"
                        : product.change.dir === "down"
                          ? "▼"
                          : "—"}{" "}
                      {product.change.pct}%
                    </div>
                  </div>

                  {/* Today's Price */}
                  <div className="border-t border-gray-100 pt-4">
                    <p className="text-sm text-gray-500">আজকের দাম</p>

                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-gray-900">
                        ৳{product.today}
                      </span>

                      <span className="text-sm text-gray-500">
                        / {product.unit}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Regional Markets */}
                {product.markets && product.markets.length > 0 && (
                  <details className="border-t border-gray-100">
                    <summary className="cursor-pointer px-5 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                      বিভিন্ন বাজারের দাম
                    </summary>

                    <div className="max-h-52 overflow-y-auto px-5 pb-5">
                      <div className="space-y-2">
                        {product.markets.map((market, index) => (
                          <div
                            key={`${market.division}-${index}`}
                            className="flex items-center justify-between rounded-lg bg-[#f4f6f4] px-3 py-2"
                          >
                            <span className="text-sm text-gray-600">
                              {market.division}
                            </span>

                            <span className="text-sm font-semibold text-gray-900">
                              ৳{market.min} - ৳{market.max}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </details>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoryPage;

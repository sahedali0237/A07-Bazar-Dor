import Banner from "./components/banner/page";
import AllProducts from "./incised/allProduct";
import DownProducts from "./incised/downProduct";
import UpProducts from "./incised/upProduct";

const page = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      cache: "no-store",
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  const products = data;

  const risers = [...products]
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = [...products]
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <Banner />
      <main className="px-4 py-8 md:px-8 lg:px-12">
        <UpProducts products={risers} />
        <DownProducts products={fallers} />
        <AllProducts products={products} />
      </main>
    </>
  );
};

export default page;

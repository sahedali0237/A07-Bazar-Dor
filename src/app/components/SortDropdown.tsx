"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

const SortDropdownContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") || "default";

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    const query = params.toString();

    router.push(query ? `${pathname}?${query}` : pathname);
  };

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="sort" className="text-sm font-medium text-gray-600">
        Sort:
      </label>

      <select
        id="sort"
        value={currentSort}
        onChange={(e) => handleSort(e.target.value)}
        className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 outline-none focus:border-gray-400"
      >
        <option value="default">Default</option>

        <option value="price-asc">Price: Low to High</option>

        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
};

const SortDropdown = () => {
  return (
    <Suspense
      fallback={
        <div className="h-9 w-32 animate-pulse rounded-lg bg-gray-100"></div>
      }
    >
      <SortDropdownContent />
    </Suspense>
  );
};

export default SortDropdown;

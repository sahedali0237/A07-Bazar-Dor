import React from "react";

const AllProductsSkeleton = () => {
  const skeletonCards = Array.from({ length: 6 });

  return (
    <section className="mt-10">
      <div className="mb-5">
        <div className="h-8 w-32 rounded bg-gray-200 animate-pulse"></div>
        <div className="mt-2 h-4 w-48 rounded bg-gray-200 animate-pulse"></div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skeletonCards.map((_, index) => (
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
              <div className="h-4 w-20 rounded bg-gray-200"></div>
              <div className="h-7 w-16 rounded-full bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AllProductsSkeleton;

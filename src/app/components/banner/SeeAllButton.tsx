"use client";

import { toast } from "react-toastify";

const SeeAllButton = () => {
  const handelSeeAll = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast.info("this function is not added yet!");
  };

  return (
    <button
      onClick={handelSeeAll}
      className="mt-5 inline-block rounded-md bg-green-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 md:text-base"
    >
      সব দাম দেখুন
    </button>
  );
};
export default SeeAllButton;

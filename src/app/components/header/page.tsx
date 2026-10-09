import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";

import { connection } from "next/server";

const CurrentDate = async () => {
  await connection();

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
    timeZone: "Asia/Dhaka",
  });

  return <p className="mt-1 min-h-6 font-bold text-black">{date}</p>;
};

const HeaderSection = () => {
  return (
    <header>
      <div className="flex justify-between items-center p-4 bg-gray-100">
        <Link href="/">
          <div className="flex items-center">
            <Image
              width={32}
              height={32}
              src="/image/logo-icon.png"
              alt="Logo"
              className="h-8 w-8 mr-2"
            />

            <div className="flex flex-col">
              <h1 className="text-lg font-bold text-black">বাজার দর</h1>

              <div className="text-sm text-gray-600">
                <Suspense fallback={<p></p>}>
                  <CurrentDate />
                </Suspense>
              </div>
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
  <Link
    href="/signIn"
    className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition duration-300 hover:border-blue-600 hover:text-blue-600"
  >
    Sign In
  </Link>

  <Link
    href="/signUp"
    className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-300 hover:bg-blue-700 hover:shadow-md"
  >
    Sign Up
  </Link>
</div>
      </div>
    </header>
  );
};

export default HeaderSection;

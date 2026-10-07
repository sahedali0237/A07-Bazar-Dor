"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeaderSection = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });
  return (
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

            <div className="text-sm text-gray-600">{date}</div>
          </div>
        </div>
      </Link>

      <div className="flex gap-1.5">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Sign In
        </button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default HeaderSection;

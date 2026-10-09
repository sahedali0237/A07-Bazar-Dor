"use client";

import React, { useState } from "react";
import { FiEye, FiEyeOff, FiGithub } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f2f5f3] p-4 font-sans sm:p-6">
      <div className="mb-6 w-full max-w-md text-center">
        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          অ্যাকাউন্ট তৈরি করুন
        </h1>
        <p className="text-sm text-gray-500">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div>
            <label
              className="mb-1.5 block text-sm font-medium text-gray-800"
              htmlFor="name"
            >
              নাম
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              placeholder="সাহেদ আলি"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none transition-shadow placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#108a3d]"
            />
          </div>

          <div>
            <label
              className="mb-1.5 block text-sm font-medium text-gray-800"
              htmlFor="email"
            >
              ইমেইল
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none transition-shadow placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#108a3d]"
            />
          </div>

          <div>
            <label
              className="mb-1.5 block text-sm font-medium text-gray-800"
              htmlFor="password"
            >
              পাসওয়ার্ড
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="new-password"
                placeholder="কমপক্ষে ৮ অক্ষর"
                minLength={8}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-900 outline-none transition-shadow placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#108a3d]"
              />
              <button
                type="button"
                aria-label={
                  showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                }
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label
              className="mb-1.5 block text-sm font-medium text-gray-800"
              htmlFor="confirm_password"
            >
              পাসওয়ার্ড নিশ্চিত করুন
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm_password"
                name="confirmPassword"
                autoComplete="new-password"
                placeholder="আবার লিখুন"
                minLength={8}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-gray-900 outline-none transition-shadow placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#108a3d]"
              />
              <button
                type="button"
                aria-label={
                  showConfirmPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                }
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showConfirmPassword ? (
                  <FiEyeOff size={18} />
                ) : (
                  <FiEye size={18} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-[#108a3d] py-2.5 font-medium text-white shadow-sm outline-none transition-colors hover:bg-[#0e7734] focus:ring-2 focus:ring-[#108a3d] focus:ring-offset-2"
          >
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="grow border-t border-gray-200" />
          <span className="px-4 text-sm font-medium text-gray-400">অথবা</span>
          <div className="grow border-t border-gray-200" />
        </div>

        <div className="flex flex-col gap-3">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-700 outline-none transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-200"
          >
            <FcGoogle size={18} />
            Google দিয়ে চালিয়ে যান
          </button>

          <div className="flex gap-4">
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-700 outline-none transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-200"
            >
              <FiGithub size={18} />
              GitHub
            </button>

            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-700 outline-none transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-200"
            >
              <FaFacebook size={18} color="#1877F2" />
              Facebook
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/signIn"
              className="font-medium text-[#108a3d] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-400 transition-colors hover:text-gray-600"
        >
          &larr; হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}

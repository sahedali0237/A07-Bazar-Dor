"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";
import SocialProvider from "../components/socialprovider/page";

export default function LoginPage() {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    const { data, error } = await authClient.signIn.email({
      email: user.email,
      password: user.password,
      callbackURL: "/",
    });
    if (data) {
      toast.success("সাইন ইন সফল হয়েছে।");
    }
    if (error) {
      const message =
        typeof error === "string"
          ? error
          : error?.message || "সাইন ইন করতে সমস্যা হয়েছে।";
      toast.error(message);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleForgetPassword = () => {
    toast.info("Password reset functionality is coming soon!");
  };
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f2f5f3] p-4 font-sans sm:p-6">
      <div className="mb-6 w-full max-w-md text-center">
        <h1 className="mb-2 text-2xl font-bold text-gray-800">
          স্বাগতম ফিরে আসুন
        </h1>
        <p className="text-sm text-gray-500">
          আপনার অ্যাকাউন্টে সাইন ইন করুন এবং বাজারের বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <form onSubmit={onSubmit} className="space-y-4">
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
            <div className="mb-1.5 flex items-center justify-between gap-2">
              <label
                className="block text-sm font-medium text-gray-800"
                htmlFor="password"
              >
                পাসওয়ার্ড
              </label>
              <button
                type="button"
                onClick={handleForgetPassword}
                className="text-xs font-medium text-[#108a3d] hover:underline"
              >
                পাসওয়ার্ড ভুলে গেছেন?
              </button>
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="new-password"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
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

          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-[#108a3d] py-2.5 font-medium text-white shadow-sm outline-none transition-colors hover:bg-[#0e7734] focus:ring-2 focus:ring-[#108a3d] focus:ring-offset-2"
          >
            সাইন ইন করুন
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="grow border-t border-gray-200" />
          <span className="px-4 text-sm font-medium text-gray-400">অথবা</span>
          <div className="grow border-t border-gray-200" />
        </div>

        <div>
          <SocialProvider />
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signUp"
              className="font-medium text-[#108a3d] hover:underline"
            >
              অ্যাকাউন্ট তৈরি করুন
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

"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const UserData = () => {
  const handleSignOut = async () => {
    await authClient.signOut();
  };

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending) {
    return <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />;
  }

  return (
    <div>
      {user ? (
        <div className="flex flex-col items-center justify-center gap-0.5">
          <div className="avatar">
            <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
              <Image
                alt={user.name || "User Avatar"}
                src={user.image || "/image/default-avatar.png"}
                width={40}
                height={40}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>
          </div>

          <span className="text-center text-sm font-medium text-gray-800">
            {user.name}
          </span>

          <button onClick={handleSignOut} className="btn btn-error btn-sm">
            Sign Out
          </button>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default UserData;

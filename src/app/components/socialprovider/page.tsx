import React from "react";
import { authClient } from "@/lib/auth-client";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FiGithub } from "react-icons/fi";

const SocialProvider = () => {
  const handelProviderGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };
  const handelProviderGitHub = async () => {
    await authClient.signIn.social({
      provider: "github",
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handelProviderGoogle}
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-700 outline-none transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-200"
      >
        <FcGoogle size={18} />
        Google দিয়ে চালিয়ে যান
      </button>

      <div className="flex gap-4">
        <button
          onClick={handelProviderGitHub}
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
  );
};

export default SocialProvider;

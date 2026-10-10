import Link from "next/link";
import { FiHome } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gray-50 px-6 py-24">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes blob {
              0% { transform: translate(0px, 0px) scale(1); }
              33% { transform: translate(30px, -50px) scale(1.1); }
              66% { transform: translate(-20px, 20px) scale(0.9); }
              100% { transform: translate(0px, 0px) scale(1); }
            }
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
              100% { transform: translateY(0px); }
            }
            .animate-blob {
              animation: blob 7s infinite;
            }
            .animate-float {
              animation: float 6s ease-in-out infinite;
            }
            .animation-delay-2000 {
              animation-delay: 2s;
            }
            .animation-delay-4000 {
              animation-delay: 4s;
            }
          `,
        }}
      />

      <div className="absolute top-1/4 left-1/4 h-64 w-64 md:h-96 md:w-96 animate-blob rounded-full bg-purple-300 opacity-60 mix-blend-multiply blur-3xl filter"></div>
      <div className="animation-delay-2000 absolute top-1/3 right-1/4 h-64 w-64 md:h-96 md:w-96 animate-blob rounded-full bg-yellow-200 opacity-60 mix-blend-multiply blur-3xl filter"></div>
      <div className="animation-delay-4000 absolute bottom-1/4 left-1/2 h-64 w-64 md:h-96 md:w-96 animate-blob rounded-full bg-pink-300 opacity-60 mix-blend-multiply blur-3xl filter"></div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="relative animate-float">
          <h1 className="bg-linear-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-[120px] font-extrabold tracking-tighter text-transparent drop-shadow-sm md:text-[180px]">
            404
          </h1>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rotate-none12whitespace-nowrap rounded bg-gray-900 px-4 py-1 text-sm font-bold tracking-widest text-white shadow-lg md:bottom-12 md:text-base">
            PAGE NOT FOUND
          </div>
        </div>

        <h2 className="mt-8 text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
          Looks like you&apos;ve lost your way.
        </h2>

        <p className="mt-6 max-w-lg text-lg text-gray-600 md:text-xl">
          We can&apos;t seem to find the page you&apos;re looking for. It might
          have been moved, deleted, or perhaps it never existed at all.
        </p>

        
        <Link
          href="/"
          className="group mt-10 flex items-center gap-3 rounded-full bg-linear-to-r from-gray-900 to-gray-700 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 active:scale-95"
        >
          <FiHome className="text-xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:text-pink-400" />
          <span>Back to Homepage</span>
        </Link>
      </div>
    </div>
  );
}

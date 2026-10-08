import Link from "next/link";
import React from "react";

// Updated interface to match your JSON data
interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const NavList = async () => {
  let data: Category[] = [];

  try {
    const res = await fetch(
      "https://api.abcz.workers.dev/api/bazardor/categories",
      {
        cache: "no-cache",
      },
    );

    if (!res.ok) {
      console.error(
        `Failed to fetch categories: ${res.status}${res.statusText}`,
      );
    } else {
      data = await res.json();
    }
  } catch (error) {
    console.error(
      `Error fetching categories: ${
        error instanceof Error ? error.message : String(error)
      }`,
    );
  }

  return (
    <nav className="flex items-center justify-center w-full py-4 bg-white border-b overflow-x-auto">
      <ul className="flex items-center gap-6 px-4">
        {data.map((n) => (
          <li key={n.id}>
            <Link
              href={`/category/${n.slug}`}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-black whitespace-nowrap"
            >
              {n.icon && <span className="text-lg">{n.icon}</span>}

              <span>{n.nameBn}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavList;

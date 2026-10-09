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
      "https://api.api-store.workers.dev/api/bazardor/categories",
      {
        next: { revalidate: 10 },
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
    <nav className="flex w-full items-center justify-center overflow-x-auto border-b bg-white py-4">
      <ul className="flex items-center gap-6 px-4">
        {data.map((n) => (
          <li key={n.id}>
            <Link
              href={`/${n.slug}`}
              className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-gray-700 hover:text-black"
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

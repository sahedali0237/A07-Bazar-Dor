import React from "react";
import ResponsiveNav, { Category } from "./ResponsiveNav";

const NavList = async () => {
  let data: Category[] = [];

  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/bazardor/categories",
      {
        next: { revalidate: 10 },
      },
    );

    if (!res.ok) {
      console.error(
        `Failed to fetch categories: ${res.status} ${res.statusText}`,
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

  return <ResponsiveNav data={data} />;
};

export default NavList;

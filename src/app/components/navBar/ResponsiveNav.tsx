"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

interface ResponsiveNavProps {
  data: Category[];
}

const ResponsiveNav = ({ data }: ResponsiveNavProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full border-b bg-white">
      <div className="flex items-center justify-between md:justify-center px-4 py-4">
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-2xl text-gray-700 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <ul className="hidden md:flex items-center gap-6 overflow-x-auto">
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
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4">
          <ul className="flex flex-col items-start gap-4">
            {data.map((n) => (
              <li key={n.id} className="w-full">
                <Link
                  href={`/${n.slug}`}
                  onClick={() => setIsOpen(false)} 
                  className="flex items-center gap-2 whitespace-nowrap text-sm font-medium text-gray-700 hover:text-black"
                >
                  {n.icon && <span className="text-lg">{n.icon}</span>}
                  <span>{n.nameBn}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default ResponsiveNav;

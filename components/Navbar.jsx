"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-zinc-900 via-blue-500 to-blue-800 text-white px-4 py-5 shadow-lg relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-extrabold cursor-pointer tracking-tight bg-white bg-clip-text text-transparent bg-gradient-to-r from-teal-200 via-teal-300 to-teal-400"
        >
          MachinesApp
        </Link>
        <button
          className="md:hidden block focus:outline-none z-12"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
        {/* Desktop menu */}
        <div className="hidden md:flex md:items-center md:w-auto">
          <ul className="flex text-lg space-x-8">
            <NavItem href="/" label="Home" />
            <NavItem href="/machines" label="Machines" />
            <NavItem href="/tasks" label="Tasks" />
            <NavItem href="/profile" label="Profile" />
          </ul>
        </div>
      </div>
      {/* Overlay for blur effect */}
      {open && (
        <div
          className="fixed inset-0 z-10 bg-black/30 backdrop-blur-sm transition-all"
          onClick={() => setOpen(false)}
        />
      )}
      {/* Mobile menu */}
      <MobileMenu open={open} setOpen={setOpen} />
    </nav>
  );
}

function NavItem({ href, label }) {
  return (
    <li>
      <Link
        href={href}
        className="relative group cursor-pointer font-semibold px-2 py-1 transition-colors hover:text-teal-300 duration-300"
      >
        <span className="relative z-10 ">{label}</span>
        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-teal-300 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
      </Link>
    </li>
  );
}

const MobileMenu = ({ open, setOpen }) => {
  return (
    <div
      className={`${
        open ? "block" : "hidden"
      } fixed top-20 right-4 w-[220px] bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl md:hidden z-50 border border-blue-200`}
    >
      <ul className="flex flex-col items-center space-y-4 py-6">
        <MobileNavItem href="/" label="Home" setOpen={setOpen} />
        <MobileNavItem href="/machines" label="Machines" setOpen={setOpen} />
        <MobileNavItem href="/tasks" label="Tasks" setOpen={setOpen} />
        <MobileNavItem href="/profile" label="Profile" setOpen={setOpen} />
      </ul>
    </div>
  );
};

function MobileNavItem({ href, label, setOpen }) {
  return (
    <li className="w-[80%] relative group text-center bg-gradient-to-r from-zinc-800 via-blue-800 to-blue-600 rounded-lg px-6 py-2 shadow-lg">
      <Link
        href={href}
        className="text-white font-bold tracking-wide block hover:text-teal-300 transition-colors"
        onClick={() => setOpen(false)}
      >
        <span className="relative z-10 ">{label}</span>
        <span className="absolute left-[25px] bottom-2 w-full rounded-xl h-0.5 bg-teal-300 scale-x-0 group-hover:scale-x-75 transition-transform origin-left duration-300"></span>
      </Link>
    </li>
  );
}

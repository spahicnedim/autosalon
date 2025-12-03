"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className={`fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-6 z-30 ${scrolled ? "bg-[#050B20]" : "bg-transparent"}`}
    >
      <div className="text-2xl font-bold tracking-wide">
        <Link href={"/"}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={150}
            height={50}
            className="object-contain"
          />
        </Link>
      </div>
      <ul className="hidden md:flex gap-8 text-lg font-medium">
        <li className="hover:text-gray-500 text-white cursor-pointer ">
          <Link href={"/"}>Početna</Link>
        </li>
        <li className="hover:text-gray-500 text-white cursor-pointer">
          <Link href={"/cars"}>Autosalon</Link>
        </li>
        <li className="hover:text-gray-500 text-white cursor-pointer">
          <Link href={"/usluge"}>Usluge</Link>
        </li>
        <li className="hover:text-gray-500 text-white cursor-pointer">
          <Link href={"/kontakt"}>Kontakt</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;

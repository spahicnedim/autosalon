"use client";

import Image from "next/image";
import { useRef, useEffect, useMemo, useState } from "react";
import { gsap } from "gsap";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

const Hero = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // UI state for selects
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // Fetch brands and cars to populate filters just like on /cars
  const { data: brendsRes } = useQuery({
    queryKey: ["brends"],
    queryFn: () => api.get("/brend"),
  });

  const { data: carsRes } = useQuery({
    queryKey: ["cars"],
    queryFn: () => api.get("/cars"),
  });

  const cars = carsRes?.data ?? [];

  const types: string[] = useMemo(() => {
    const set = new Set<string>();
    for (const c of cars) {
      if (c.oblikKaroserije) set.add(c.oblikKaroserije);
    }
    return Array.from(set);
  }, [cars]);

  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power3.out" },
      );
    }
  }, []);

  const scrollToSection = () => {
    const nextSection = document.getElementById("cars-section");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedBrand) params.set("brand", selectedBrand);
    if (selectedType) params.set("type", selectedType);
    const qs = params.toString();
    router.push(`/cars${qs ? `?${qs}` : ""}`);
  };

  return (
    <div className="relative min-h-screen w-full">
      {/* Hero Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero.jpg"
          alt="Audi"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-6 z-20 text-white">
        <div className="text-2xl font-bold tracking-wide">
          <Image
            src="/logo.png"
            alt="Logo"
            width={150}
            height={50}
            className="object-contain"
          />
        </div>
        <ul className="hidden md:flex gap-8 text-lg font-medium">
          <li className="hover:text-gray-300 cursor-pointer">Početna</li>
          <li className="hover:text-gray-300 cursor-pointer">Autosalon</li>
          <li className="hover:text-gray-300 cursor-pointer">Usluge</li>
          <li className="hover:text-gray-300 cursor-pointer">Webshop</li>
        </ul>
      </nav>

      {/* Hero Content */}
      <div
        ref={contentRef}
        className="flex flex-col items-center justify-center text-center text-white min-h-screen px-4"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          Pronađite svoj idealni automobil
        </h1>
        <p className="text-base sm:text-lg md:text-xl mb-10 max-w-2xl">
          Pregledajte našu ekskluzivnu kolekciju pažljivo odabranih automobila.
        </p>

        {/* Search bar */}
        <div className="bg-white/90 backdrop-blur-md rounded-full shadow-lg p-2 sm:p-3 md:p-4 flex flex-row items-center gap-2 sm:gap-3 md:gap-4 w-full max-w-3xl">
          {/* Brand select */}
          <select
            className="flex-1 px-2 sm:px-3 md:px-4 py-2 sm:py-3 rounded-xl text-sm sm:text-base md:text-lg text-gray-800 focus:outline-none cursor-pointer"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">Odaberite Marku</option>
            {brendsRes?.map((b: any) => (
              <option key={b.id} value={b.naziv}>
                {b.naziv}
              </option>
            ))}
          </select>

          <div className="w-px bg-gray-300 self-stretch"></div>

          {/* Type select (SUV, Limuzina, itd.) */}
          <select
            className="flex-1 px-2 sm:px-3 md:px-4 py-2 sm:py-3 rounded-xl text-sm sm:text-base md:text-lg text-gray-800 focus:outline-none cursor-pointer"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Tip vozila</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <button
            className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 bg-[#D62828] text-white text-sm sm:text-base md:text-lg font-semibold rounded-full hover:bg-red-700 transition cursor-pointer whitespace-nowrap"
            onClick={handleSearch}
          >
            Pretraži
          </button>
        </div>

        {/* Scroll Button */}
        <button
          onClick={scrollToSection}
          className="mt-14 flex flex-col items-center gap-2 text-white animate-bounce cursor-pointer"
        >
          <span className="text-sm uppercase tracking-wider">Explore More</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Hero;

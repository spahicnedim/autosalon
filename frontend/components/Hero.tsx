"use client";

import Image from "next/image";
import { useRef, useEffect, useMemo, useState } from "react";
import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface HeroProps {
  brends: { id: string; naziv: string }[];
  cars: { id: string; Karoserija?: { naziv: string } }[];
  karoserija: { data: { id: string; naziv: string }[] };
}

const Hero = ({ brends, cars, karoserija }: HeroProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedType, setSelectedType] = useState("");

  // Izračun tipova vozila iz server-side podataka
  const types: string[] = useMemo(() => {
    const set = new Set<string>();
    for (const c of cars) {
      if (c.Karoserija?.naziv) set.add(c.Karoserija?.naziv);
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
    if (nextSection) nextSection.scrollIntoView({ behavior: "smooth" });
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
          alt="Hero"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

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
          <select
            className="flex-1 px-2 sm:px-3 md:px-4 py-2 sm:py-3 rounded-xl text-sm sm:text-base md:text-lg text-gray-800 focus:outline-none cursor-pointer"
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">Odaberite Marku</option>
            {brends.map((b) => (
              <option key={b.id} value={b.naziv}>
                {b.naziv}
              </option>
            ))}
          </select>

          <div className="w-px bg-gray-300 self-stretch"></div>

          <select
            className="flex-1 px-2 sm:px-3 md:px-4 py-2 sm:py-3 rounded-xl text-sm sm:text-base md:text-lg text-gray-800 focus:outline-none cursor-pointer"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Tip vozila</option>
            {karoserija.data.map((t) => (
              <option key={t.id} value={t.naziv}>
                {t.naziv}
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

"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

type CarsPageProps = {
  searchParams: any;
  initialCars: any[];
  initialBrends: any[];
};

const CarsPage = ({
  searchParams,
  initialCars,
  initialBrends,
}: CarsPageProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const initialBrand = searchParams?.brend || "";
  const initialType = searchParams?.type || "";

  // Applied filters (only change when user clicks the button)
  const [brandFilter, setBrandFilter] = useState(initialBrand);
  const [typeFilter, setTypeFilter] = useState(initialType);
  const [sort, setSort] = useState("latest");

  // Pending selections in the UI controls
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedType, setSelectedType] = useState(initialType);

  useEffect(() => {
    const brandFromUrl = params.get("brand") || "";
    const typeFromUrl = params.get("type") || "";
    setBrandFilter(brandFromUrl);
    setTypeFilter(typeFromUrl);
    setSelectedBrand(brandFromUrl);
    setSelectedType(typeFromUrl);
  }, [params]);

  const cars = initialCars ?? [];
  const brendsRes = initialBrends ?? [];

  // Unique types derived from cars (e.g., SUV, Limuzina, itd.)
  const types: string[] = useMemo(() => {
    const set = new Set<string>();
    for (const c of cars) {
      if (c.oblikKaroserije) set.add(c.oblikKaroserije);
    }
    return Array.from(set);
  }, [cars]);

  // Filtriranje po brandu i tipu (karoseriji)
  const filteredCars = cars.filter(
    (car: any) =>
      (brandFilter ? car.brend?.naziv === brandFilter : true) &&
      (typeFilter ? car.oblikKaroserije === typeFilter : true),
  );

  // Sorting
  const sortedCars = useMemo(() => {
    const toNum = (v: any) => {
      const n = Number(v);
      return Number.isFinite(n) ? n : 0;
    };
    const arr = [...filteredCars];
    switch (sort) {
      case "priceAsc":
        return arr.sort((a, b) => toNum(a.cijena) - toNum(b.cijena));
      case "priceDesc":
        return arr.sort((a, b) => toNum(b.cijena) - toNum(a.cijena));
      case "latest":
      default:
        return arr.sort((a, b) => toNum(b.godina) - toNum(a.godina));
    }
  }, [filteredCars, sort]);

  return (
    <div className="w-full bg-[#050B20]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 md:px-12 py-6 z-30 bg-transparent">
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
          <li className="hover:text-gray-500 text-white cursor-pointer">
            Početna
          </li>
          <li className="hover:text-gray-500 text-white  cursor-pointer">
            Autosalon
          </li>
          <li className="hover:text-gray-500 text-white  cursor-pointer">
            Usluge
          </li>
          <li className="hover:text-gray-500 text-white  cursor-pointer">
            Webshop
          </li>
        </ul>
      </nav>

      {/* Filter Section */}
      <section className="pt-32 pb-16  flex justify-center">
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
            onClick={() => {
              const query = new URLSearchParams();

              if (selectedBrand) query.set("brend", selectedBrand);
              if (selectedType) query.set("type", selectedType);

              router.push(`/cars?${query.toString()}`);

              setBrandFilter(selectedBrand);
              setTypeFilter(selectedType);
            }}
          >
            Pretraži
          </button>

          {/* Reset */}
          {(brandFilter || typeFilter) && (
            <button
              className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 bg-gray-200 text-gray-800 text-sm sm:text-base md:text-lg font-semibold rounded-full hover:bg-gray-300 transition cursor-pointer whitespace-nowrap"
              onClick={() => {
                setSelectedBrand("");
                setSelectedType("");
                setBrandFilter("");
                setTypeFilter("");
              }}
            >
              Reset
            </button>
          )}
        </div>
      </section>

      {/* Cars Grid Section */}
      <section className="pt-24 py-20 bg-[#F9FBFC] flex flex-col items-center justify-center mx-auto rounded-t-[80px]">
        <div className="w-full max-w-7xl px-6 mb-18 flex justify-start">
          <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold">
            Sva vozila
          </h2>
        </div>

        {/* Informacije i sortiranje */}
        <div className="w-full max-w-7xl px-6 mb-8 flex justify-between items-center">
          <span className="text-gray-600 text-sm">
            Prikazano {filteredCars.length} vozila
          </span>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-gray-600 text-sm">
              Sort:
            </label>
            <select
              id="sort"
              className="px-2 py-1 rounded-lg border border-gray-300 focus:outline-none"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="latest">Najnovije</option>
              <option value="priceAsc">Cijena rastuće</option>
              <option value="priceDesc">Cijena opadajuće</option>
            </select>
          </div>
        </div>
        <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedCars.map((car: any) => (
            <Card key={car.id} className="w-full max-w-sm mx-auto p-0 h-full">
              {car.slike?.[0] && (
                <Image
                  src={car.slike[0].thumbUrl}
                  alt={car.model}
                  className="w-full h-52 object-cover rounded-t-xl"
                  width={400}
                  height={300}
                />
              )}
              <CardHeader className="pt-0 pl-8">
                <CardTitle className="text-lg font-medium text-gray-900">
                  {car.brend.naziv} {car.model} - {car.godina}
                </CardTitle>
                <CardDescription className="line-clamp-1">
                  {car.opis}
                </CardDescription>
                <Separator className="bg-gray-300" />
              </CardHeader>
              <CardContent className="flex flex-row items-center justify-between px-8">
                <div className="flex flex-col gap-1 justify-between items-center">
                  <Image
                    src="/icons/kilometraza.svg"
                    alt="strelica"
                    width={20}
                    height={20}
                  />
                  <p>{car.kilometraza}</p>
                </div>
                <div className="flex flex-col gap-1 justify-between items-center">
                  <Image
                    src="/icons/gorivo.svg"
                    alt="strelica"
                    width={20}
                    height={20}
                  />
                  <p>{car.gorivo}</p>
                </div>
                <div className="flex flex-col gap-1 justify-between items-center">
                  <Image
                    src="/icons/mjenjac.svg"
                    alt="strelica"
                    width={20}
                    height={20}
                  />
                  <p>{car.mjenjac}</p>
                </div>
              </CardContent>
              <CardHeader>
                <Separator className="bg-gray-300" />
              </CardHeader>
              <CardFooter className="flex flex-row items-center justify-between pb-6">
                <p className="font-extrabold text-3xl text-gray-900 tracking-tight">
                  {car.cijena?.toLocaleString()}{" "}
                  <span className="text-lg font-semibold">KM</span>
                </p>
                <Link
                  className="text-lg font-medium text-[#D62828]"
                  href={`/car/${car.id}`}
                >
                  Detalji
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CarsPage;

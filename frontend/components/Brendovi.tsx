import Image from "next/image";
import React from "react";
import Link from "next/link";

interface Brend {
  id: number;
  naziv: string;
  logo?: string;
}

async function getBrends(): Promise<Brend[]> {
  const res = await fetch("http://autosalon_backend:4000/api/brend", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch brends");
  return res.json();
}

export default async function Brendovi() {
  const brends = await getBrends();

  return (
    <section className="py-20  max-w-7xl mx-auto flex flex-col items-center justify-center">
      <div className="w-full flex flex-row justify-between items-center mb-10 px-6">
        <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold">
          Marke vozila koje nudimo
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 w-full px-6 place-items-center">
        {brends.map((brend) => (
          <Link
            key={brend.id}
            className="flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-md rounded-2xl p-4 bg-[#F9FBFC]"
            href={`/cars?brand=${encodeURIComponent(brend.naziv)}`}
          >
            {brend.logo ? (
              <div className="relative w-28 h-14 sm:w-32 sm:h-16">
                <Image
                  src={brend.logo}
                  alt={brend.naziv}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="w-28 h-14 sm:w-32 sm:h-16 flex items-center justify-center bg-gray-100 text-gray-500 rounded-xl">
                Nema loga
              </div>
            )}
            <p className="text-gray-800 font-medium text-lg">{brend.naziv}</p>
          </Link>
        ))}
      </div>

      {/*<div className="mt-10">*/}
      {/*  <Link*/}
      {/*    href="/cars"*/}
      {/*    className="text-primary text-lg font-medium hover:underline"*/}
      {/*  >*/}
      {/*    Pogledaj ponudu svih vozila*/}
      {/*  </Link>*/}
      {/*</div>*/}
    </section>
  );
}

import React from "react";
import Image from "next/image";
import CarGalleryWithDetails from "@/components/CarGallery";
import ShareButton from "@/components/ShareButton";
export const revalidate = 3600;

interface Car {
  id: number;
  model: string;
  godina: number;
  opis: string;
  cijena: number;
  kilometraza: string;
  gorivo: string;
  mjenjac: string;
  slike: { url: string; thumbUrl: string }[];
  brend: { naziv: string };
  createdAt: string;
  pregledi: any;
  status: string;
}

interface PageProps {
  params: { carId: string };
}

async function getCars(carId: string): Promise<Car> {
  const res = await fetch(`http://localhost:4000/api/cars/${carId}`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch cars");
  const data = await res.json();

  return data;
}

const Page = async ({ params }: PageProps) => {
  const car: Car = await getCars(params?.carId);

  return (
    <div className="w-full bg-[#050B20]">
      {/* Filter Section */}
      <section className="pt-10 pb-16  flex justify-center"></section>

      {/* Cars Grid Section */}
      <section className="pt-24 py-15 bg-[#F9FBFC] flex flex-col items-center justify-center mx-auto rounded-t-[80px]">
        <div className="w-full max-w-7xl mb-8 flex justify-start">
          <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold">
            {car.brend.naziv} {car.model} - {car.godina}
          </h2>
        </div>

        {/* Informacije i sortiranje */}
        <div className="w-full max-w-7xl flex justify-between items-center">
          <div className="flex flex-row items-center gap-2">
            <div className="bg-[#FEEBEB] rounded-full flex flex-row items-center justify-center pt-2 pb-2 px-4 py-4 gap-2">
              <Image
                src="/icons/calendar.svg"
                alt="Godina"
                width={15}
                height={15}
              />
              <p className="text-[#D62828] text-sm">{car.godina}</p>
            </div>
            <div className="bg-[#FEEBEB] rounded-full flex flex-row items-center justify-center pt-2 pb-2 px-4 py-4 gap-2">
              <Image
                src="/icons/kilometraza.svg"
                alt="kilometraza"
                width={17}
                height={17}
              />
              <p className="text-[#D62828] text-sm">{car.kilometraza}</p>
            </div>
            <div className="bg-[#FEEBEB] rounded-full flex flex-row items-center justify-center pt-2 pb-2 px-4 py-4 gap-2">
              <Image
                src="/icons/mjenjac.svg"
                alt="mjenjac"
                width={17}
                height={17}
              />
              <p className="text-[#D62828] text-sm">{car.mjenjac}</p>
            </div>
            <div className="bg-[#FEEBEB] rounded-full flex flex-row items-center justify-center pt-2 pb-2 px-4 py-4 gap-2">
              <Image
                src="/icons/gorivo.svg"
                alt="gorivo"
                width={17}
                height={17}
              />
              <p className="text-[#D62828] text-sm">{car.gorivo}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ShareButton car={car} />
          </div>
        </div>

        <CarGalleryWithDetails slike={car.slike} car={car} />
      </section>
    </div>
  );
};
export default Page;

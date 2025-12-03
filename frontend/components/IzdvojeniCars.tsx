import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Car {
  id: string;
  model: string;
  godina: number;
  opis: string;
  cijena: number;
  kilometraza: string;
  gorivo: string;
  mjenjac: string;
  slike: { thumbUrl: string }[];
  brend: { naziv: string };
}

async function getCars(): Promise<Car[]> {
  const res = await fetch("http://autosalon_backend:4000/api/cars", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch cars");
  const data = await res.json();
  return data.data;
}

export default async function IzdvojeniCars() {
  const cars = await getCars();

  return (
    <section
      id="cars-section"
      className="pt-24 py-20 bg-[#F9FBFC] flex flex-col max-w-7xl items-center justify-center mx-auto"
    >
      <div className="w-full flex flex-row justify-between items-center mb-6 px-6">
        <h2 className="text-3xl sm:text-4xl md:text-4xl font-bold">
          Izdvojena vozila
        </h2>
        <Link
          href={"/cars"}
          className="text-lg font-medium text-gray-900 flex flex-row items-center gap-2"
        >
          Pogledaj sva vozila
          <Image
            src="/icons/strelica.svg"
            alt="strelica"
            width={20}
            height={20}
            className="w-4 h-4"
          />
        </Link>
      </div>

      <Carousel className="w-full px-6">
        <CarouselContent className="-ml-2 md:-ml-4">
          {cars.map((car) => (
            <CarouselItem
              key={car.id}
              className="pl-2 md:pl-4 basis-[85%] sm:basis-[45%] md:basis-[30%] pb-4"
            >
              <Card className="w-full p-0 h-full">
                {car.slike?.[0] && (
                  <div className="relative w-full h-52">
                    <Image
                      src={car.slike[0].thumbUrl}
                      alt={`${car.brend.naziv} ${car.model} ${car.godina}`}
                      fill
                      className="object-cover rounded-t-xl"
                    />
                  </div>
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
                      alt="kilometraza"
                      width={20}
                      height={20}
                    />
                    <p>{car.kilometraza}</p>
                  </div>
                  <div className="flex flex-col gap-1 justify-between items-center">
                    <Image
                      src="/icons/gorivo.svg"
                      alt="gorivo"
                      width={20}
                      height={20}
                    />
                    <p>{car.gorivo}</p>
                  </div>
                  <div className="flex flex-col gap-1 justify-between items-center">
                    <Image
                      src="/icons/mjenjac.svg"
                      alt="mjenjac"
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
                    className="text-lg font-medium text-primary"
                    href={`/car/${car.id}`}
                  >
                    Detalji
                  </Link>
                </CardFooter>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Strelice iz shadcn-a */}
        <CarouselPrevious className="cursor-pointer" />
        <CarouselNext className="cursor-pointer" />
      </Carousel>
    </section>
  );
}

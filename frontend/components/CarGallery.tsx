"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BadgeCheck,
  Check,
  FileText,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import CarDetailsPdfDocument from "@/components/pdf/CarDetailPdfDocument";
import { pdf } from "@react-pdf/renderer";

interface CarGalleryProps {
  slike: { url: string; thumbUrl: string }[];
  car: {
    id: number;
    createdAt: string;
    brend: { naziv: string };
    model: string;
    godina: number;
    cijena: number;
    gorivo: string;
    mjenjac: string;
    kilometraza: string;
    zapremina?: number;
    snaga?: number;
    boja?: string;
    oblikKaroserije?: string;
    opis?: string;
    pregledi: number;
    status: string;
    oprema?: { id: number; oprema: { naziv: string } }[];
  };
}

export default function CarGalleryWithDetails({ slike, car }: CarGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [views, setViews] = useState<number>(car.pregledi || 0);
  const imageRef = useRef<HTMLDivElement>(null);

  const { mutate: incrementViews } = useMutation({
    mutationFn: async () => {
      const data = await api.put(`/cars/${car.id}/view`, {});
      return data;
    },
    onSuccess: (data) => {
      setViews(data.pregledi);
    },
  });

  useEffect(() => {
    incrementViews();
  }, [car.id]);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 1.04 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
      );
    }
  }, [currentIndex]);

  const handleGeneratePdf = async () => {
    const QRCode = await import("qrcode");

    const qrDataUrl = await QRCode.toDataURL(
      `https://autosalon.ba/cars/${car.id}`,
    );
    const blob = await pdf(
      <CarDetailsPdfDocument car={car} qrCodeDataUrl={qrDataUrl} />,
    ).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <section className="w-full bg-[#F9FBFC] py-12 sm:px-6 md:px-8 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-24 ">
        {/* Galerija lijevo */}
        <div className="flex-1 min-w-[65%]">
          <div
            ref={imageRef}
            className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden "
          >
            <Image
              src={slike[currentIndex]?.url || "/placeholder.jpg"}
              alt={car.model}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 70vw"
              priority
            />
          </div>

          {/* Thumbnails */}
          <div className="flex flex-wrap gap-3 mt-5">
            {slike.map((slika, i) => (
              <div
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`relative w-28 h-24 rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-300 ${
                  currentIndex === i
                    ? "border-[#D62828] scale-105"
                    : "border-gray-200 hover:scale-105"
                }`}
              >
                <Image
                  src={slika.thumbUrl}
                  alt={`Thumbnail ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Detalji desno */}
        <Card className="w-full md:w-[35%] h-fit self-start bg-white rounded-3xl shadow-lg border border-gray-100">
          <CardContent className="p-6 space-y-5">
            {/* Status badge */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium bg-[#FEEBEB] text-[#D62828] px-3 py-1 rounded-full">
                <BadgeCheck className="w-3.5 h-3.5" />{" "}
                {car.status || "Rabljeno vozilo"}
              </span>
              <span className="text-sm text-gray-500">
                Objavljeno:{" "}
                {car.createdAt
                  ? new Date(car.createdAt).toLocaleDateString()
                  : "Nepoznato"}
              </span>
            </div>

            {/* Cijena */}
            <div>
              <p className="text-gray-500 text-sm">Cijena do registracije</p>
              <p className="font-extrabold text-4xl text-gray-900 tracking-tight">
                {car.cijena?.toLocaleString()}{" "}
                <span className="text-lg font-semibold">KM</span>
              </p>
            </div>

            {/* Lokacija */}
            <div className="flex items-center gap-2 text-gray-700">
              <MapPin className="w-4 h-4 text-red-600" />
              <span>Jelah, Bosna i Hercegovina</span>
            </div>

            {/* Kontakt informacije */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-[#D62828]" />
                <span>061 123 456</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MessageCircle className="w-4 h-4 text-green-600" />
                <span>Viber dostupan</span>
              </div>
            </div>

            {/* Dugmad */}
            <div className="flex flex-col gap-3 mt-6">
              <Button
                onClick={handleGeneratePdf}
                className="bg-[#D62828] text-white hover:bg-[#B71C1C] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                {car.brend?.naziv}-{car.model}.pdf
              </Button>

              <Button
                variant="outline"
                className="border-[#D62828] text-[#D62828] hover:bg-[#FEEBEB] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Pošalji upit prodavcu
              </Button>
            </div>

            {/* Broj pregleda */}
            <p className="text-sm text-gray-400 text-center pt-2">
              👁️ {views ?? "-"} pregleda ovog oglasa
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Karakteristike vozila */}
      <div className="max-w-7xl mx-auto flex flex-col px-4 sm:px-6 lg:px-0">
        <div className="mt-16 max-w-full sm:max-w-[65%] mb-10">
          <h3 className="text-2xl font-semibold mb-6">Karakteristike vozila</h3>

          {/* Flex layout za poravnanje labela i vrijednosti */}
          <div className="flex flex-col sm:flex-row flex-wrap sm:flex-nowrap gap-x-20 gap-y-6">
            {/* Lijeva kolona */}
            <div className="flex flex-col gap-4 flex-1 min-w-[180px]">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 w-32">
                  <Image
                    src="/iconsKarakteristike/calendar.svg"
                    alt="godina"
                    width={16}
                    height={16}
                  />
                  Godina
                </span>
                <span className="font-bold">{car.godina}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 w-32">
                  <Image
                    src="/iconsKarakteristike/zapremina.svg"
                    alt="zapremina"
                    width={17}
                    height={17}
                  />
                  Zapremina
                </span>
                <span className="font-bold">{car.zapremina || "—"} cm³</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 w-32">
                  <Image
                    src="/iconsKarakteristike/snaga.svg"
                    alt="snaga"
                    width={18}
                    height={18}
                  />
                  Snaga
                </span>
                <span className="font-bold">
                  {car.snaga ? `${car.snaga} KS` : "—"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 w-32">
                  <Image
                    src="/iconsKarakteristike/gorivo.svg"
                    alt="gorivo"
                    width={17}
                    height={17}
                  />
                  Gorivo
                </span>
                <span className="font-bold">{car.gorivo}</span>
              </div>
            </div>

            {/* Desna kolona */}
            <div className="flex flex-col gap-4 flex-1 min-w-[180px]">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 w-32">
                  <Image
                    src="/iconsKarakteristike/kilometraza.svg"
                    alt="kilometraza"
                    width={17}
                    height={17}
                  />
                  Kilometraža
                </span>
                <span className="font-bold">{car.kilometraza}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 w-32">
                  <Image
                    src="/iconsKarakteristike/mjenjac.svg"
                    alt="mjenjac"
                    width={17}
                    height={17}
                  />
                  Mjenjač
                </span>
                <span className="font-bold">{car.mjenjac}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 w-32">
                  <Image
                    src="/iconsKarakteristike/boja.svg"
                    alt="boja"
                    width={18}
                    height={18}
                  />
                  Boja
                </span>
                <span className="font-bold">{car.boja || "—"}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2 w-32">
                  <Image
                    src="/iconsKarakteristike/karoserija.svg"
                    alt="karoserija"
                    width={19}
                    height={19}
                  />
                  Karoserija
                </span>
                <span className="font-bold">{car.oblikKaroserije || "—"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Popis dodatne opreme */}
        {car.oprema && car.oprema.length > 0 && (
          <div className="mt-4 max-w-[65%] border-t border-gray-200 pt-6">
            <h3 className="text-2xl font-semibold mb-4">Dodatna oprema</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
              {car.oprema.map((item, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <Check className="text-[#D62828] w-5 h-5 mt-0.5" />
                  <span>{item.oprema.naziv}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Opis vozila */}
        {car.opis && (
          <div className="max-w-[65%] mt-16 mb-10 border-t border-gray-200 pt-6">
            <h3 className="text-2xl font-semibold mb-4">Opis vozila</h3>
            <div className="leading-relaxed text-gray-700 whitespace-pre-line">
              {car.opis}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

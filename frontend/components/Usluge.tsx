"use client";

import {
  Phone,
  ArrowRight,
  Clock,
  Shield,
  Navigation,
  Truck,
} from "lucide-react";
import Image from "next/image";

export default function Usluge() {
  return (
    <div className="w-full bg-neutral-50 text-neutral-900 overflow-hidden">
      {/* HERO BLOCK */}
      <div className="relative w-full h-[80vh]">
        <Image
          src="/slep-bg.png"
          alt="Šlep služba"
          fill
          className="object-cover brightness-[0.55]"
        />

        {/* Blur gradient bottom */}
        <div className="absolute bottom-0 left-0 w-full h-30 bg-gradient-to-t from-[#050B20] to-transparent"></div>

        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white max-w-3xl drop-shadow-2xl">
            Profesionalna
            <br />
            Šlep Služba 24/7
          </h1>

          <p className="text-lg md:text-xl text-white/90 max-w-2xl mt-6 drop-shadow">
            Brz, siguran i povoljan transport vozila — dostupni u svakom
            trenutku na teritoriji cijele BiH.
          </p>

          <a
            href="tel:+38761123456"
            className="w-xl mt-10 inline-flex justify-center items-center gap-3 px-8 py-4 bg-white text-black rounded-full text-lg font-semibold shadow-xl hover:bg-neutral-200 transition"
          >
            Hitni Poziv <Phone size={22} />
          </a>
        </div>
      </div>

      {/* STATISTIKE */}
      <div className="bg-[#050B20] text-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold">24/7</p>
            <p className="text-gray-300 mt-1">Dostupnost</p>
          </div>
          <div>
            <p className="text-4xl font-bold">20 min</p>
            <p className="text-gray-300 mt-1">Prosječan dolazak</p>
          </div>
          <div>
            <p className="text-4xl font-bold">1000+</p>
            <p className="text-gray-300 mt-1">Prevezenih vozila</p>
          </div>
          <div>
            <p className="text-4xl font-bold">100%</p>
            <p className="text-gray-300 mt-1">Sigurnost</p>
          </div>
        </div>
      </div>

      {/* GLAVNI INFO */}
      <div className="max-w-7xl mx-auto py-24 px-6 grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* Lijeva strana */}
        <div>
          <h2 className="text-4xl font-bold mb-6">
            Zašto izabrati našu šlep službu?
          </h2>
          <p className="text-lg text-neutral-600 leading-relaxed mb-8">
            Bilo da je u pitanju kvar, nesreća ili transport specijalnih vozila
            — mi garantiramo brz dolazak, siguran prevoz i transparentnu cijenu.
          </p>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Clock className="w-8 h-8 text-[#050B20]" />
              <div>
                <h4 className="text-xl font-semibold">
                  Dolazak u najkraćem roku
                </h4>
                <p className="text-neutral-600">
                  Naša ekipa reaguje odmah nakon poziva i pokriva cijelu BiH.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-[#050B20]" />
              <div>
                <h4 className="text-xl font-semibold">
                  Osigurana zaštita vozila
                </h4>
                <p className="text-neutral-600">
                  Profesionalna oprema i stručni vozači garantuju potpunu
                  sigurnost.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Navigation className="w-8 h-8 text-[#050B20]" />
              <div>
                <h4 className="text-xl font-semibold">GPS praćenje</h4>
                <p className="text-neutral-600">
                  Transparentan uvid gdje se vaše vozilo nalazi u svakom
                  trenutku.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Truck className="w-8 h-8 text-[#050B20]" />
              <div>
                <h4 className="text-xl font-semibold">
                  Transport svih vrsta vozila
                </h4>
                <p className="text-neutral-600">
                  Putnička, kombi, teretna, neregistrovana i oštećena vozila.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Desna strana */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="/slep-vozilo.png"
            alt="Šlep vozilo"
            width={900}
            height={600}
            className="object-cover"
          />

          <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-lg px-6 py-4 rounded-2xl shadow-xl">
            <p className="font-semibold text-neutral-800">
              Brz i siguran transport
            </p>
          </div>
        </div>
      </div>

      {/*/!* CTA *!/*/}
      {/*<div className="bg-[#050B20] text-white py-20 text-center">*/}
      {/*  <h3 className="text-4xl md:text-5xl font-bold mb-6">*/}
      {/*    Trebate hitnu šlep pomoć?*/}
      {/*  </h3>*/}
      {/*  <p className="text-neutral-300 text-lg mb-10">*/}
      {/*    Nazovite odmah — dostupni smo 24 sata dnevno, 7 dana u sedmici.*/}
      {/*  </p>*/}

      {/*  <a*/}
      {/*    href="tel:+38761123456"*/}
      {/*    className="inline-flex items-center gap-3 px-12 py-4 bg-white text-black rounded-full text-lg font-semibold hover:bg-neutral-200 transition shadow-xl"*/}
      {/*  >*/}
      {/*    Pozovi Sada <ArrowRight size={22} />*/}
      {/*  </a>*/}
      {/*</div>*/}
    </div>
  );
}

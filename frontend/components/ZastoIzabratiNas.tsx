import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export default function ZastoIzabratiNas() {
  return (
    <section className="w-full bg-[#F9FBFC] py-20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch rounded-2xl overflow-hidden shadow-lg">
        {/* Lijeva strana - slika */}
        <div className="relative w-full md:w-1/2">
          <Image
            src="/car-banner.png"
            alt="Car driving in the mountains"
            width={800}
            height={600}
            className="object-cover w-full h-full"
          />
          {/*<button className="absolute inset-0 flex items-center justify-center">*/}
          {/*  <div className="rounded-full p-4 shadow-lg hover:scale-105 transition">*/}
          {/*    <svg*/}
          {/*      xmlns="http://www.w3.org/2000/svg"*/}
          {/*      fill="#D62828"*/}
          {/*      viewBox="0 0 24 24"*/}
          {/*      strokeWidth={1.5}*/}
          {/*      stroke="#D62828"*/}
          {/*      className="w-8 h-8"*/}
          {/*    >*/}
          {/*      <path*/}
          {/*        strokeLinecap="round"*/}
          {/*        strokeLinejoin="round"*/}
          {/*        d="M8.25 4.5v15l11.25-7.5L8.25 4.5z"*/}
          {/*      />*/}
          {/*    </svg>*/}
          {/*  </div>*/}
          {/*</button>*/}
        </div>

        {/* Desna strana - tekst */}
        <div className="w-full md:w-1/2 bg-primary/20 p-8 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#050B20]">
            Prodajte svoj auto brzo i sigurno
          </h2>
          <p className="text-gray-600 mb-6">
            Posvećeni smo pružanju izuzetne usluge, fer cijena i jednostavnog
            procesa prodaje vozila.
          </p>

          <ul className="space-y-3 mb-6">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="text-[#D62828]" /> Brza i fer procjena
              vozila
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="text-[#D62828]" /> 24/7 dostupna podrška
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="text-[#D62828]" /> Više od 1000
              zadovoljnih klijenata
            </li>
          </ul>

          <button className="px-6 py-3 bg-[#D62828] text-white rounded-full font-semibold hover:bg-red-700 transition w-fit">
            Kontaktirajte nas
          </button>
        </div>
      </div>

      {/* Donji info blok */}
      <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 text-center max-w-5xl mx-auto ">
        <div>
          <h3 className="text-3xl font-bold text-[#050B20]">836M</h3>
          <p className="text-gray-600">Auta na prodaju</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-[#050B20]">738M</h3>
          <p className="text-gray-600">Zadovoljni kupci</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-[#050B20]">100M</h3>
          <p className="text-gray-600">Posjeta mjesečno</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-[#050B20]">238M</h3>
          <p className="text-gray-600">Verifikovani partneri</p>
        </div>
      </div>

      <div className="border-b-2 border-gray-200 mt-15 max-w-7xl mx-auto" />

      <section className="py-15">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12 text-[#050B20]">
            Zašto izabrati nas?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Kartica 1 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-[#D62828]/10 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#D62828"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-[#050B20]">
                Brza obrada i podrška
              </h3>
              <p className="text-gray-600 text-sm">
                Naš tim je dostupan 24/7 kako bi osigurao brz i jednostavan
                proces prodaje vašeg vozila.
              </p>
            </div>

            {/* Kartica 2 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-[#D62828]/10 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#D62828"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-[#050B20]">
                Pouzdanost i sigurnost
              </h3>
              <p className="text-gray-600 text-sm">
                Garantujemo transparentne cijene i siguran proces bez skrivenih
                troškova.
              </p>
            </div>

            {/* Kartica 3 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-[#D62828]/10 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#D62828"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-[#050B20]">
                Najbolje cijene na tržištu
              </h3>
              <p className="text-gray-600 text-sm">
                Uvijek nudimo fer i konkurentne cijene pri otkupu i prodaji
                vozila.
              </p>
            </div>

            {/* Kartica 4 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-[#D62828]/10 p-4 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="#D62828"
                  className="w-10 h-10"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.429 4.5h11.142a1.5 1.5 0 011.5 1.5v12.75a1.5 1.5 0 01-1.5 1.5H6.429a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 011.5-1.5z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-lg text-[#050B20]">
                Iskustvo i profesionalizam
              </h3>
              <p className="text-gray-600 text-sm">
                Više od 10 godina iskustva u automobilskoj industriji garantuje
                kvalitetnu uslugu.
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

import React from "react";
import Image from "next/image";
import { Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <div>
      {/* Footer */}
      <footer className="bg-[#050B20] text-white mt-20">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo i opis */}
          <div>
            <Image
              src="/Logo.png"
              alt="Autosalon Logo"
              width={150}
              height={50}
              className="mb-4"
            />
            <p className="text-gray-400 text-sm leading-relaxed">
              Vaš pouzdan partner pri kupovini i prodaji vozila. Nudimo
              kvalitet, povjerenje i transparentnost.
            </p>
          </div>

          {/* Radno vrijeme */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Radno vrijeme</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                Ponedjeljak – Petak:{" "}
                <span className="text-white">08:00 – 18:00</span>
              </li>
              <li>
                Subota: <span className="text-white">09:00 – 14:00</span>
              </li>
              <li>
                Nedjelja: <span className="text-white">Zatvoreno</span>
              </li>
            </ul>
          </div>

          {/* Usluge */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Naše usluge</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="hover:text-white transition-colors duration-200">
                Prodaja vozila
              </li>
              <li className="hover:text-white transition-colors duration-200">
                Otkup vozila
              </li>
              <li className="hover:text-white transition-colors duration-200">
                Posredovanje
              </li>
              <li className="hover:text-white transition-colors duration-200">
                Registracija i osiguranje
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                📍{" "}
                <span className="text-white">Jelah, Bosna i Hercegovina</span>
              </li>
              <li>
                📞 <span className="text-white">+387 61 123 456</span>
              </li>
              <li>
                ✉️ <span className="text-white">info@autosalon.ba</span>
              </li>
            </ul>

            {/* Društvene mreže */}
            <div className="flex gap-4 mt-4">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-full hover:bg-[#1877F2] transition-colors"
              >
                <Facebook />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-full hover:bg-[#E1306C] transition-colors"
              >
                <Instagram />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center bg-white/10 rounded-full hover:bg-[#0A66C2] transition-colors"
              >
                <Linkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Donji bar */}
        <div className="border-t border-white/10 mt-10 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Autosalon Jelah. Sva prava zadržana.
        </div>
      </footer>
    </div>
  );
};
export default Footer;

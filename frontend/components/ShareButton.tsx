"use client";

import Image from "next/image";

interface ShareButtonProps {
  car: {
    id: number;
    brend: { naziv: string };
    model: string;
    godina: number;
  };
}

export default function ShareButton({ car }: ShareButtonProps) {
  const handleShare = async () => {
    const shareData = {
      title: `${car.brend.naziv} ${car.model}`,
      url: `https://ilmaauto.com/auto/${car.id}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Dijeljenje otkazano ili nije uspjelo:", err);
      }
    } else {
      // fallback ako dijeljenje nije podržano
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          shareData.url,
        )}`,
        "_blank",
      );
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex flex-row items-center gap-2 text-[#D62828] hover:underline transition"
    >
      <Image src="/icons/share.svg" alt="podijeli" width={20} height={20} />
      <span>Podijeli</span>
    </button>
  );
}

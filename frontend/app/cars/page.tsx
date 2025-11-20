import { Metadata } from "next";
import CarsPage from "@/components/CarsPage";
import { getBrends, getCars } from "@/actions/actions";

export const revalidate = 3600; // ISR: revalidate every hour

type Props = {
  searchParams: {
    brend?: string;
    type?: string;
    page?: string;
  };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { brend, type, page } = await searchParams;

  let title = "Vozila - Ilma Auto";
  let description = "Pregledajte kompletnu ponudu vozila u Ilma Auto salonu.";

  if (brend && type) {
    title = `${brend} ${type} - Ilma Auto`;
    description = `Pretražite našu ponudu ${brend} ${type} vozila. Kvalitetna i provjerena ponuda.`;
  } else if (brend) {
    title = `${brend} vozila - Ilma Auto`;
    description = `Veliki izbor ${brend} vozila u našem autosalonu.`;
  } else if (type) {
    title = `${type} vozila - Ilma Auto`;
    description = `Pretražite ${type} vozila iz naše bogate ponude.`;
  }

  if (page) {
    title += ` | Stranica ${page}`;
  }

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `http://localhost/cars?brand=${brend || ""}&type=${
        type || ""
      }&page=${page || "1"}`,
    },
  };
}

export default async function Page({ searchParams }: Props) {
  const [cars, brends] = await Promise.all([getCars(), getBrends()]);
  return (
    <CarsPage
      searchParams={searchParams}
      initialCars={cars}
      initialBrends={brends}
    />
  );
}

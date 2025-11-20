import Hero from "@/components/Hero";
import IzdvojeniCars from "@/components/IzdvojeniCars";
import Brendovi from "@/components/Brendovi";
import ZastoIzabratiNas from "@/components/ZastoIzabratiNas";
import { api } from "@/lib/api";

async function getCars() {
  const res = await fetch("http://localhost:4000/api/cars", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch cars");
  const json = await res.json();
  return json.data ?? [];
}

async function getBrends() {
  const res = await fetch("http://localhost:4000/api/brend", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error("Failed to fetch brends");
  const json = await res.json();
  return json ?? [];
}

const Home = async () => {
  const [cars, brends] = await Promise.all([getCars(), getBrends()]);

  return (
    <div>
      <Hero brends={brends} cars={cars} />
      <IzdvojeniCars />
      <Brendovi />
      <ZastoIzabratiNas />
    </div>
  );
};

export default Home;

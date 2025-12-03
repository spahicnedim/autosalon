import Hero from "@/components/Hero";
import IzdvojeniCars from "@/components/IzdvojeniCars";
import Brendovi from "@/components/Brendovi";
import ZastoIzabratiNas from "@/components/ZastoIzabratiNas";
import { getBrends, getCars, getKaroserija } from "@/actions/actions";

const Home = async () => {
  const [cars, brends, karoserija] = await Promise.all([
    getCars(),
    getBrends(),
    getKaroserija(),
  ]);

  return (
    <div>
      <Hero brends={brends} cars={cars} karoserija={karoserija} />
      <IzdvojeniCars />
      <Brendovi />
      <ZastoIzabratiNas />
    </div>
  );
};

export default Home;

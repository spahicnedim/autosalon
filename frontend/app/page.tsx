import Hero from "@/components/Hero";
import IzdvojeniCars from "@/components/IzdvojeniCars";
import Brendovi from "@/components/Brendovi";
import ZastoIzabratiNas from "@/components/ZastoIzabratiNas";
import { getBrends, getCars } from "@/actions/actions";

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

import { getCars } from "@/actions/actions";
import AdminCarList from "@/components/AdminCarList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AdminCarsPage = async () => {
  const cars = await getCars();

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Admin – Cars</h1>
      <div className="flex gap-3">
        <Link href="/admin/cars/new">
          <Button>Dodaj automobil</Button>
        </Link>
      </div>
      <AdminCarList cars={cars} />
    </div>
  );
};

export default AdminCarsPage;

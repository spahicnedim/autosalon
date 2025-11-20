import { getCars } from "@/actions/actions";
import AdminCarList from "@/components/AdminCarList";

const AdminCarsPage = async () => {
  const cars = await getCars();

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Admin – Cars</h1>

      <AdminCarList cars={cars} />
    </div>
  );
};

export default AdminCarsPage;

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";

const AdminCarsPage = () => {
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["cars"],
    queryFn: () => api.get("/cars"),
  });

  const deleteCar = useMutation({
    mutationFn: (id: number) => api.delete(`/cars/${id}`),
    onSuccess: async () => {
      try {
        await fetch("/api/revalidate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paths: ["/", "/cars"] }),
        });
      } catch (e) {
        // no-op: revalidation failure shouldn't block navigation
      }
      qc.invalidateQueries({ queryKey: ["cars"] });
      window.location.href = "/admin/cars";
    },
  });

  if (isLoading) return <p>Loading...</p>;
  const cars = data?.data || [];

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Admin – Cars</h1>
      <Button onClick={() => (window.location.href = "/admin/cars/new")}>
        + Add Car
      </Button>

      <div className="mt-6 space-y-4">
        {cars.map((car: any) => (
          <div
            key={car.id}
            className="flex items-center justify-between border p-4 rounded"
          >
            <div>
              <p className="font-bold">
                {car.brend?.naziv} {car.model}
              </p>
              <p>
                {car.godina} – {car.cijena} KM
              </p>
            </div>
            <Button
              variant="destructive"
              onClick={() => deleteCar.mutate(car.id)}
              className="text-red"
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCarsPage;

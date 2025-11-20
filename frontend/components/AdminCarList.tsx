"use client";

import { Button } from "@/components/ui/button";

interface Props {
  cars: any[];
}

export default function AdminCarList({ cars }: Props) {
  const deleteCar = async (id: number) => {
    await fetch(`/api/cars/${id}`, { method: "DELETE" });

    await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paths: ["/", "/admin/cars"] }),
    });

    window.location.reload();
  };

  return (
    <div className="p-6">
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
              onClick={() => deleteCar(car.id)}
              variant="destructive"
              className="text-red"
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

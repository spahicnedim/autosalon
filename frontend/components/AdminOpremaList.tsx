"use client";

import { Button } from "@/components/ui/button";

interface Props {
  oprema: any[];
}

export default function AdminOpremaList({ oprema }: Props) {
  // const deleteBrend = async (id: number) => {
  //   await fetch(`/api/cars/${id}`, { method: "DELETE" });
  //
  //   await fetch("/api/revalidate", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ paths: ["/", "/admin/cars"] }),
  //   });
  //
  //   window.location.reload();
  // };

  return (
    <div className="p-6">
      {/*<Button onClick={() => (window.location.href = "/admin/cars/new")}>*/}
      {/*  + Add Car*/}
      {/*</Button>*/}
      <div className="mt-6 space-y-4">
        {oprema.map((oprema: any) => (
          <div
            key={oprema.id}
            className="flex items-center justify-between border p-4 rounded"
          >
            <div>
              <p className="font-bold">{oprema.naziv}</p>
            </div>
            {/*<Button*/}
            {/*  onClick={() => deleteCar(car.id)}*/}
            {/*  variant="destructive"*/}
            {/*  className="text-red"*/}
            {/*>*/}
            {/*  Delete*/}
            {/*</Button>*/}
          </div>
        ))}
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getOprema } from "@/actions/actions";
import AdminOpremaList from "@/components/AdminOpremaList";

const Page = async () => {
  const oprema = await getOprema();

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Admin – Cars</h1>
      <div className="flex gap-3">
        <Link href="/admin/oprema/new">
          <Button>Dodaj opremu</Button>
        </Link>
      </div>
      <AdminOpremaList oprema={oprema?.data} />
    </div>
  );
};
export default Page;

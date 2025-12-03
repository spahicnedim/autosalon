import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AdminBrendoviList from "@/components/AdminBrendoviList";
import { getBrends } from "@/actions/actions";

const Page = async () => {
  const brendovi = await getBrends();

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Admin – Cars</h1>
      <div className="flex gap-3">
        <Link href="/admin/brendovi/new">
          <Button>Dodaj brend</Button>
        </Link>
      </div>
      <AdminBrendoviList brendovi={brendovi} />
    </div>
  );
};
export default Page;

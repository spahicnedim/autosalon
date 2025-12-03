import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Admin</h1>
      <div className="flex gap-3">
        <Link href="/admin/cars">
          <Button>Vozila</Button>
        </Link>

        <Link href="/admin/brendovi">
          <Button variant="secondary">Brendovi</Button>
        </Link>

        <Link href="/admin/oprema">
          <Button variant="secondary">Oprema</Button>
        </Link>
      </div>
    </div>
  );
};
export default Page;

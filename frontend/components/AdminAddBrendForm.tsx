"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";

export default function AddBrendPage() {
  const [naziv, setNaziv] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const qc = useQueryClient();

  const createBrend = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("naziv", naziv);
      if (logo) formData.append("logo", logo);

      return api.post("/brend", formData, true);
    },
    onSuccess: async () => {
      try {
        await fetch("/api/revalidate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paths: ["/", "/brends"] }),
        });
      } catch {}

      qc.invalidateQueries({ queryKey: ["brends"] });
      window.location.href = "/admin/brendovi";
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createBrend.mutate();
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Dodaj novi brend</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Naziv brenda</Label>
          <Input
            value={naziv}
            onChange={(e) => setNaziv(e.target.value)}
            required
          />
        </div>

        <div>
          <Label>Logo brenda</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setLogo(e.target.files?.[0] || null)}
            required
          />
        </div>

        <Button
          className="w-full"
          type="submit"
          disabled={createBrend.isLoading}
        >
          {createBrend.isLoading ? "Spremanje..." : "Sačuvaj brend"}
        </Button>
      </form>
    </div>
  );
}

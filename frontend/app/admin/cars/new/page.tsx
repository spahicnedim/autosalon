// "use client";
//
// import { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { api } from "@/lib/api";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@radix-ui/react-select";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Textarea } from "@/components/ui/textarea";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
//
// interface CarForm {
//   brendId: string;
//   model: string;
//   godina: string;
//   kilometraza: string;
//   cijena: string;
//   oblikKaroserije: string;
//   gorivo: string;
//   mjenjac: string;
//   boja: string;
//   snaga: string;
//   zapremina: string;
//   opis: string;
//   opremaIds: number[];
// }
//
// const AdminAddCarPage = () => {
//   const qc = useQueryClient();
//
//   const { data: brends } = useQuery({
//     queryKey: ["brends"],
//     queryFn: () => api.get("/brend"),
//   });
//
//   const { data: oprema } = useQuery({
//     queryKey: ["oprema"],
//     queryFn: () => api.get("/oprema"),
//   });
//
//   const [form, setForm] = useState<CarForm>({
//     brendId: "",
//     model: "",
//     godina: "",
//     kilometraza: "",
//     cijena: "",
//     oblikKaroserije: "",
//     gorivo: "",
//     mjenjac: "",
//     boja: "",
//     snaga: "",
//     zapremina: "",
//     opis: "",
//     opremaIds: [] as number[],
//   });
//   const [files, setFiles] = useState<File[]>([]);
//
//   const createCar = useMutation({
//     mutationFn: async (data: any) => {
//       const formData = new FormData();
//       Object.keys(data).forEach((key) => {
//         if (key === "opremaIds") {
//           data.opremaIds.forEach((id: number) =>
//             formData.append("opremaIds[]", id.toString()),
//           );
//         } else {
//           formData.append(key, data[key]);
//         }
//       });
//       files.forEach((file) => formData.append("slike", file));
//
//       return api.post("/cars", formData, true);
//     },
//     onSuccess: async () => {
//       try {
//         await fetch("/api/revalidate", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ paths: ["/", "/cars"] }),
//         });
//       } catch (e) {
//         // no-op: revalidation failure shouldn't block navigation
//       }
//       qc.invalidateQueries({ queryKey: ["cars"] });
//       window.location.href = "/admin/cars";
//     },
//   });
//
//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >,
//   ) => {
//     const { name, value } = e.target;
//     setForm((prev: any) => ({ ...prev, [name]: value }));
//   };
//
//   const handleOpremaChange = (id: number) => {
//     setForm((prev: any) => {
//       const exists = prev.opremaIds.includes(id);
//       return {
//         ...prev,
//         opremaIds: exists
//           ? prev.opremaIds.filter((x: number) => x !== id)
//           : [...prev.opremaIds, id],
//       };
//     });
//   };
//
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     createCar.mutate(form);
//   };
//
//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <Card className="shadow-lg">
//         <CardHeader>
//           <CardTitle className="text-2xl font-semibold">
//             Dodaj novi automobil
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* --- Osnovne informacije --- */}
//             <div className="grid md:grid-cols-2 gap-4">
//               <div>
//                 <Label>Brend</Label>
//                 <select
//                   name="brendId"
//                   value={form.brendId}
//                   onChange={handleChange}
//                   required
//                   className="border rounded-md px-3 py-2 w-full"
//                 >
//                   <option value="">Odaberi brend</option>
//                   {brends?.map((b: any) => (
//                     <option key={b.id} value={b.id}>
//                       {b.naziv}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//
//               <div>
//                 <Label>Model</Label>
//                 <Input
//                   name="model"
//                   placeholder="Model"
//                   value={form.model}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//
//               <div>
//                 <Label>Godina</Label>
//                 <Input
//                   type="number"
//                   name="godina"
//                   placeholder="2020"
//                   value={form.godina}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//
//               <div>
//                 <Label>Kilometraža</Label>
//                 <Input
//                   type="number"
//                   name="kilometraza"
//                   placeholder="150000"
//                   value={form.kilometraza}
//                   onChange={handleChange}
//                 />
//               </div>
//
//               <div>
//                 <Label>Cijena (KM)</Label>
//                 <Input
//                   type="number"
//                   name="cijena"
//                   placeholder="35000"
//                   value={form.cijena}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//
//               <div>
//                 <Label>Oblik karoserije</Label>
//                 <Input
//                   name="oblikKaroserije"
//                   placeholder="Limuzina, SUV..."
//                   value={form.oblikKaroserije}
//                   onChange={handleChange}
//                 />
//               </div>
//
//               <div>
//                 <Label>Gorivo</Label>
//                 <Input
//                   name="gorivo"
//                   placeholder="Dizel, Benzin..."
//                   value={form.gorivo}
//                   onChange={handleChange}
//                 />
//               </div>
//
//               <div>
//                 <Label>Mjenjač</Label>
//                 <Input
//                   name="mjenjac"
//                   placeholder="Manuelni, Automatski"
//                   value={form.mjenjac}
//                   onChange={handleChange}
//                 />
//               </div>
//
//               <div>
//                 <Label>Boja</Label>
//                 <Input
//                   name="boja"
//                   placeholder="Crna, Siva..."
//                   value={form.boja}
//                   onChange={handleChange}
//                 />
//               </div>
//
//               <div>
//                 <Label>Snaga (KS)</Label>
//                 <Input
//                   type="number"
//                   name="snaga"
//                   placeholder="150"
//                   value={form.snaga}
//                   onChange={handleChange}
//                 />
//               </div>
//
//               <div>
//                 <Label>Zapremina (ccm)</Label>
//                 <Input
//                   type="number"
//                   name="zapremina"
//                   placeholder="1998"
//                   value={form.zapremina}
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//
//             <div>
//               <Label>Opis</Label>
//               <Textarea
//                 name="opis"
//                 placeholder="Unesite detaljan opis automobila..."
//                 value={form.opis}
//                 onChange={handleChange}
//               />
//             </div>
//
//             <Separator className="my-6" />
//
//             {/* --- Oprema --- */}
//             <div>
//               <Label className="font-semibold mb-2 block">Oprema</Label>
//               <div className="grid md:grid-cols-3 gap-2">
//                 {oprema?.map((o: any) => (
//                   <div key={o.id} className="flex items-center space-x-2">
//                     <Checkbox
//                       checked={form.opremaIds.includes(o.id)}
//                       onCheckedChange={() => handleOpremaChange(o.id)}
//                       id={`oprema-${o.id}`}
//                     />
//                     <Label htmlFor={`oprema-${o.id}`}>{o.naziv}</Label>
//                   </div>
//                 ))}
//               </div>
//             </div>
//
//             <Separator className="my-6" />
//
//             {/* --- Slike --- */}
//             <div>
//               <Label className="block font-semibold mb-2">
//                 Slike automobila
//               </Label>
//               <Input
//                 type="file"
//                 multiple
//                 onChange={(e) => {
//                   const selectedFiles = Array.from(e.target.files || []);
//                   setFiles((prev) => [...prev, ...selectedFiles]);
//                 }}
//               />
//               {files.length > 0 && (
//                 <div className="flex flex-wrap gap-3 mt-4">
//                   {files.map((file, index) => (
//                     <div
//                       key={index}
//                       className="relative w-32 h-24 rounded-lg overflow-hidden border"
//                     >
//                       <img
//                         src={URL.createObjectURL(file)}
//                         alt={file.name}
//                         className="object-cover w-full h-full"
//                       />
//                       <button
//                         type="button"
//                         onClick={() =>
//                           setFiles((prev) => prev.filter((_, i) => i !== index))
//                         }
//                         className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded"
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//
//             <Separator className="my-6" />
//
//             <Button
//               type="submit"
//               className="w-full"
//               disabled={createCar.isLoading}
//             >
//               {createCar.isLoading ? "Spremanje..." : "Sačuvaj automobil"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };
//
// export default AdminAddCarPage;

import { getBrends, getKaroserija, getOprema } from "@/actions/actions";
import AdminAddCarForm from "@/components/AdminAddCarForm";

export default async function AdminAddCarPage() {
  const [brends, oprema, karoserija] = await Promise.all([
    getBrends(),
    getOprema(),
    getKaroserija(),
  ]);

  return (
    <AdminAddCarForm brends={brends} oprema={oprema} karoserija={karoserija} />
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

const LoginPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) });

  const mutation = useMutation({
    mutationFn: (data: any) => api.post("/auth/login", data),
    onSuccess: (res) => {
      localStorage.setItem("token", res.token);
      router.push("/admin");
    },
    onError: () => alert("Pogresni kredencijali"),
  });

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Prijava</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit((d) => mutation.mutate(d))}
            className="space-y-4"
          >
            <Input placeholder="Korisnicko ime" {...register("username")} />
            <Input
              placeholder="Lozinka"
              type="password"
              {...register("password")}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;

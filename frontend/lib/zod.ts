import { z } from "zod";

export const carSchema = z.object({
    brendId: z.string().min(1, "Brend je obavezan"),
    model: z.string().min(1, "Model je obavezan"),
    godina: z.number().min(1900).max(new Date().getFullYear()),
    kilometraza: z.number().min(0),
    cijena: z.number().min(1),
    oblikKaroserije: z.string().optional(),
    gorivo: z.string().optional(),
    mjenjac: z.string().optional(),
    boja: z.string().optional(),
    snaga: z.number().optional(),
    zapremina: z.number().optional(),
    opis: z.string().optional(),
    opremaIds: z.array(z.number()).optional(),
});

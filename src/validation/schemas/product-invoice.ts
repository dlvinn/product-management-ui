import { z } from "zod";

export const productInvoiceSchema = z.object({
  id: z.number().optional(),
  number: z.string().optional(),
  quantity: z.number().positive(),
  price: z.number().positive(),
  currencyId: z.string(),
  retailerId: z.string(),
  date: z.string().date(),
});

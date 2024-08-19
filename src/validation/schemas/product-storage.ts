import { z } from "zod";

export const productStorageSchema = z.object({
  id: z.number().optional(),
  quantity: z.number().positive(),
  productId: z.number().optional(),
  price: z.number().positive(),
  currencyId: z.string(),
  storageId: z.string(),
});

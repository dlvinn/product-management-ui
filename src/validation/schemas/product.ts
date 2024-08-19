import { z } from "zod";
import { productInvoiceSchema } from "./product-invoice";
import { productStorageSchema } from "./product-storage";

export const productSchema = z.object({
  id: z.number().optional(),
  barcode: z.string().min(5),
  code: z.string().optional(),
  categoryId: z.string().optional(),
  name: z.string().min(3),
  size: z.string().optional(),
  weight: z.number().default(0),
  partNumbers: z.array(z.string()),
  threshold: z.number().int({ message: "The threshold must be an integer." }),
  images: z.custom<FileList>(
    (value) => {
      if (!(value instanceof FileList)) {
        return false; // Not a FileList
      }
      // Check if FileList is not empty
      if (value.length === 0) {
        return false; // No files
      }
      // Validate each file
      for (let i = 0; i < value.length; i++) {
        const file = value[i];
        // Example validation: Check file size and type
        if (file.size > 5 * 1024 * 1024) {
          // 5MB limit
          return false; // File too large
        }
        if (!["image/jpeg", "image/png"].includes(file.type)) {
          // Allowed types
          return false; // Invalid file type
        }
      }
      return true; // Valid FileList
    },
    {
      message: "Invalid file list or file validation failed",
    }
  ),
  notes: z.array(z.string()).optional(),
  manufacturerId: z.string().optional(),
  invoices: z.array(productInvoiceSchema),
  storages: z.array(productStorageSchema),
});

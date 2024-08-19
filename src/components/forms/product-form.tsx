"use client";
import HeaderWithTitle from "@/components/headers/header-with-title";
import { Form } from "@/components/ui/form";
import { productSchema } from "@/validation/schemas/product";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Toaster } from "../ui/toaster";
import { useToast } from "../ui/use-toast";
interface ProductFormComponentProps {}
const Images = dynamic(() => import("./cards/images"), {
  ssr: false,
});
const Storages = dynamic(() => import("./cards/storages"), {
  ssr: false,
});
const Pricing = dynamic(() => import("./cards/inventory"), {
  ssr: false,
});
const Inventory = dynamic(() => import("./cards/inventory"), {
  ssr: false,
});
const ProductInvoices = dynamic(() => import("./cards/invoices"), {
  ssr: false,
});
const BasicInformation = dynamic(() => import("./cards/basic-information"), {
  ssr: false,
});
const AdditionalInformation = dynamic(
  () => import("./cards/additional-information"),
  {
    ssr: false,
  }
);
const ConfirmationFooterComponent = dynamic(
  () => import("../footers/confirmation-footer"),
  {
    ssr: false,
  }
);
const ProductFormComponent: React.FC<ProductFormComponentProps> = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      id: undefined, // Optional, no default
      barcode: "12345", // At least 5 characters
      name: "", // At least 3 characters required
      size: "", // Optional
      weight: 0, // Defaults to 0
      partNumbers: ["part Number"], // Empty array
      threshold: 0, // Integer value, default to 0
      code: "", // Optional
      images: {} as FileList, // Empty FileList object
      notes: ["note"], // Empty array
      categoryId: "", // Optional
      manufacturerId: "", // Optional
      invoices: [{}], // Empty array, validated by productInvoiceSchema
      storages: [{}], // Empty array, validated by productStorageSchema
    },
  });
  const onSubmit = (data: z.infer<typeof productSchema>) => {
    toast({
      description: "Form validated successfully",
    });
    console.log("onSubmit", data);
    console.log("onSubmit");
  };
  return (
    <Form {...form}>
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <HeaderWithTitle title="Add Product" className="px-1 py-3" />
        <main className="flex gap-6 flex-col xl:flex-row flex-wrap xl:flex-nowrap">
          <div className="flex flex-col xl:w-1/3 gap-y-6">
            <BasicInformation className="" control={form.control} />
            <Pricing className="" control={form.control} />
          </div>
          <div className="flex flex-col xl:w-1/3 gap-y-6">
            <Images control={form.control} />
            <Inventory className="" control={form.control} />
          </div>
          <div className="flex flex-col xl:w-1/3 gap-y-6">
            <AdditionalInformation className="h-fit" control={form.control} />
            <Storages className="" control={form.control} />
            <ProductInvoices
              className="lg:col-start-3"
              control={form.control}
            />
          </div>
        </main>
        <ConfirmationFooterComponent
          ButtonTitle="Create Product"
          className="my-3"
        />
      </form>
    </Form>
  );
};
export default ProductFormComponent;

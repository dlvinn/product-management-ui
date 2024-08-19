import dynamic from "next/dynamic";
const ProductFormComponent = dynamic(
  () => import("@/components/forms/product-form"),
  { ssr: false }
);
interface AddProductPageProps {}
export default function AddProduct(): React.ReactElement<AddProductPageProps> {
  return <ProductFormComponent />;
}

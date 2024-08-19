import ButtonLinkComponent from "@/components/links/button-link";

interface ProductPageProps {}
const ProductPage: React.FC<ProductPageProps> = () => {
  return (
    <>
      <ButtonLinkComponent
        href="/product/add-product"
        buttonTitle="go to add Product page"
      />
    </>
  );
};

export default ProductPage;

import ButtonLinkComponent from "@/components/links/button-link";

interface HomePageProps {}
const HomePage: React.FC<HomePageProps> = () => {
  return (
    <ButtonLinkComponent href="/product" buttonTitle="go to Product page" />
  );
};

export default HomePage;

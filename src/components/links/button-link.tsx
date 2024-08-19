import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface ButtonLinkComponentProps {
  href: string;
  buttonTitle: string;
}
const ButtonLinkComponent: React.FC<ButtonLinkComponentProps> = ({
  href,
  buttonTitle,
}) => {
  return (
    <Link
      href={href}
      className={`${buttonVariants({ variant: "outline" })} m-auto`}
    >
      {buttonTitle}
    </Link>
  );
};

export default ButtonLinkComponent;

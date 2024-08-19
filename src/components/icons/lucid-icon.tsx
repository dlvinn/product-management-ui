import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import dynamic from "next/dynamic";

interface IconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name], {
    ssr: false, // Ensures it's only loaded on the client side
    loading: () => <span>...</span>, // A placeholder while the icon is loading
  });

  return <LucideIcon {...props} />;
};

export default Icon;

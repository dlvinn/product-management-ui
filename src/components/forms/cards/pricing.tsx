import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Control } from "react-hook-form";
interface PricingProps {
  className?: string;
  control: Control<any> | undefined;
}
const Pricing: React.FC<PricingProps> = ({ className, control }) => {
  return (
    <Card className={`${className} no-overflow`}>
      <CardHeader>
        <CardTitle>Pricing</CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};
export default Pricing;

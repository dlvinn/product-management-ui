import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Barcode } from "lucide-react";
import BarcodeGenerator from "react-barcode";

import { Input } from "@/components/ui/input";
import { SelectContent } from "@radix-ui/react-select";
import { useRef, useState } from "react";
import { Control } from "react-hook-form";
import { dummyCategories } from "../../../../public/assets/data/dummy/category";
import { dummyManufacturers } from "../../../../public/assets/data/dummy/manufacturer";
interface BasicInformationProps {
  className?: string;
  control: Control<any> | undefined;
}
const BasicInformation: React.FC<BasicInformationProps> = ({
  className,
  control,
}) => {
  const barcodeInputRef = useRef<HTMLInputElement | null>(null); // Ref to access the input element
  const [barcode, setBarcode] = useState<string | null>(null);

  const handleClick = () => {
    if (barcodeInputRef.current) {
      const value = barcodeInputRef.current.value;
      if (value) {
        setBarcode(value); // Set barcode value to generate barcode
      }
    }
  };
  return (
    <Card className={`${className} no-overflow`}>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={control}
          name="barcode"
          render={({ field }) => {
            const { ref, ...rest } = field; // Destructure field to exclude ref
            return (
              <FormItem className="overflow-auto">
                <FormLabel>Barcode</FormLabel>
                <FormControl className="no-overflow">
                  <div className="flex w-full  items-center space-x-2 ">
                    <Input
                      ref={barcodeInputRef}
                      placeholder="enter the product barcode"
                      {...rest}
                    />
                    <Button onClick={handleClick} type="button">
                      <Barcode size={16} />{" "}
                    </Button>
                  </div>
                </FormControl>

                <FormMessage />
                {barcode && <BarcodeGenerator value={barcode} />}
              </FormItem>
            );
          }}
        />
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="enter the name" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input placeholder="enter the code" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category..." />
                  </SelectTrigger>
                  <SelectContent>
                    {dummyCategories.map((category) => (
                      <SelectItem
                        value={category.id.toString()}
                        key={"category" + category.id}
                        className="xl:w-[25rem] sm:w-screen"
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="manufacturerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>manufacturer</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select manufacturer..." />
                  </SelectTrigger>
                  <SelectContent>
                    {dummyManufacturers.map((manufacturer: Manufacturer) => (
                      <SelectItem
                        className="xl:w-[25rem] sm:w-screen"
                        value={manufacturer.id.toString()}
                        key={"manufacterer" + manufacturer.id}
                      >
                        {manufacturer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
export default BasicInformation;

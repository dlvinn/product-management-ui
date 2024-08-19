import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash } from "lucide-react";
import React from "react";
import { Control, useFieldArray } from "react-hook-form";
import { dummyCurrencies } from "../../../../public/assets/data/dummy/currency";
import { dummyStorages } from "../../../../public/assets/data/dummy/storages";

interface StoragesProps {
  className?: string;
  control: Control<any> | undefined;
}

const Storages: React.FC<StoragesProps> = ({ className, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "storages",
  });
  // const hasAppendedRef = useRef(false);

  // useEffect(() => {
  //   append({});

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <Card className={`${className} no-overflow`}>
      <CardHeader>
        <CardTitle>Storages </CardTitle>
      </CardHeader>
      <CardContent>
        {fields &&
          fields.map((field, index) => (
            <div className="grid grid-cols-4 gap-4" key={"storage " + field.id}>
              {/* Storage Selector */}
              <FormField
                control={control}
                name={`storages[${index}].storageId`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Storage</FormLabel>
                    <FormControl className="no-overflow">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select storage" />
                        </SelectTrigger>
                        <SelectContent>
                          {dummyStorages.map(
                            (storage: SingleStorage, index) => (
                              <SelectItem
                                key={index}
                                value={storage.id.toString()}
                              >
                                {storage.name}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Quantity Input Field */}
              <FormField
                control={control}
                name={`storages[${index}].quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl className="no-overflow">
                      <Input
                        {...field}
                        placeholder="Enter quantity"
                        type="number"
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Price Input Field */}
              <FormField
                control={control}
                name={`storages[${index}].price`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl className="no-overflow">
                      <Input
                        {...field}
                        placeholder="Enter price value"
                        type="number"
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Currency Selector */}
              <FormField
                control={control}
                name={`storages[${index}].currencyId`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Currency</FormLabel>
                    <FormControl className="no-overflow">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                        <SelectContent>
                          {dummyCurrencies.map((currency: Currency, index) => (
                            <SelectItem key={index} value={currency.code}>
                              {currency.code}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Remove Button */}
              {index > 0 && (
                <div className="flex justify-end mt-2">
                  <Button
                    type="button"
                    className="bg-orange-600 hover:bg-red-700 text-white border border-red-700 rounded-lg px-10 py-2"
                    onClick={() => remove(0)}
                  >
                    <Trash size={20} />
                  </Button>
                </div>
              )}
            </div>
          ))}

        <Button
          type="button"
          className="w-full bg-black text-white flex items-center justify-center mt-4"
          onClick={() => append({})}
        >
          <Plus size={20} className="mr-2" />
          Add Storage
        </Button>
      </CardContent>
    </Card>
  );
};

export default Storages;

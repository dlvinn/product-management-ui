/* eslint-disable react-hooks/exhaustive-deps */
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
import { dummyRetailers } from "../../../../public/assets/data/dummy/retailers";

import { formatISO, parseISO } from "date-fns";

// Function to format the date string for the schema
function formatDate(date: string): string {
  const parsedDate = parseISO(date);
  const formattedDate = formatISO(parsedDate, { representation: "date" });
  return formattedDate;
}

interface InvoicesProps {
  className?: string;
  control: Control<any> | undefined;
}

const Invoices: React.FC<InvoicesProps> = ({ className, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "invoices",
  });

  // useEffect(() => {
  //   append({});
  // }, []);
  return (
    <Card className={`${className} no-overflow`}>
      <CardHeader>
        <CardTitle>Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        {fields.map((field, index) => (
          <div className="grid grid-cols-3 gap-4" key={field.id}>
            {/* Storage Selector */}
            <FormField
              control={control}
              name={`invoices[${index}].number`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invoice Number</FormLabel>
                  <FormControl className="no-overflow">
                    <Input
                      {...field}
                      placeholder="Enter Invoice Number"
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Quantity Input Field */}
            <FormField
              control={control}
              name={`invoices[${index}].quantity`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl className="no-overflow">
                    <Input
                      {...field}
                      placeholder="Enter quantity"
                      type="number"
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Price Input Field */}
            <FormField
              control={control}
              name={`invoices[${index}].price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl className="no-overflow">
                    <Input
                      {...field}
                      placeholder="Enter the Price"
                      type="number"
                      onChange={(event) => field.onChange(+event.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Currency Selector */}

            <FormField
              control={control}
              name={`invoices[${index}].currencyId`}
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
                        {dummyCurrencies.map((currency: Currency) => (
                          <SelectItem
                            key={"currency" + currency.id}
                            value={currency.id.toString()}
                          >
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
            <FormField
              control={control}
              name={`invoices[${index}].retailerId`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Retailer</FormLabel>
                  <FormControl className="no-overflow">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Retailer" />
                      </SelectTrigger>
                      <SelectContent>
                        {dummyRetailers.map((retailer: Retailer) => (
                          <SelectItem
                            key={"retailer" + retailer.id}
                            value={retailer.id.toString()}
                          >
                            {retailer.name}
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
              name={`invoices[${index}].date`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date:</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      value={field.value}
                      onChange={(event) =>
                        field.onChange(formatDate(event.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Remove Button */}

            {index > 0 && (
              <div className="flex justify-end mt-2 grid-cols-3 mr-auto">
                <Button
                  type="button"
                  className="bg-orange-600 hover:bg-red-700 text-white border border-red-700 rounded-lg px-10 py-2"
                  onClick={() => remove(index)}
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

export default Invoices;

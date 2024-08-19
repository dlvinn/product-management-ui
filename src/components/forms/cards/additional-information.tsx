import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash } from "lucide-react";
import { Control, useFieldArray } from "react-hook-form";

interface AdditionalInformationProps {
  className?: string;
  control: Control<any> | undefined;
}

const AdditionalInformation: React.FC<AdditionalInformationProps> = ({
  className,
  control,
}) => {
  // Use useFieldArray for partNumbers
  const {
    fields: partNumbersFields,
    append: appendPartNumber,
    remove: removePartNumber,
  } = useFieldArray({
    control,
    name: "partNumbers", // Must match the name in your form schema
  });

  // Use useFieldArray for notes
  const {
    fields: notesFields,
    append: appendNote,
    remove: removeNote,
  } = useFieldArray({
    control,
    name: "notes", // Must match the name in your form schema
  });

  return (
    <Card className={`${className} no-overflow`}>
      <CardHeader>
        <CardTitle>Additional Information</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Part Numbers */}
        {partNumbersFields.map((field, index) => (
          <FormField
            key={field.id}
            control={control}
            name={`partNumbers.${index}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Part Number {index + 1}</FormLabel>
                <FormControl className="no-overflow">
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      {...field}
                      placeholder={`Enter part number ${index + 1}`}
                    />
                    {partNumbersFields.length > 1 && (
                      <Button
                        type="button"
                        className="bg-red-600 hover:bg-red-700 text-white border border-red-700 rounded-lg"
                        onClick={() => removePartNumber(index)}
                      >
                        <Trash size={20} />
                      </Button>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        ))}
        <Button
          type="button"
          className="w-full bg-black text-white flex items-center justify-center mt-2"
          onClick={() => appendPartNumber("part Number")} // Append empty object
        >
          <Plus size={20} className="mr-2" />
          Add Part Number
        </Button>

        {/* Notes */}
        {notesFields.map((field, index) => (
          <FormField
            key={field.id}
            control={control}
            name={`notes.${index}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note {index + 1}</FormLabel>
                <FormControl className="no-overflow">
                  <div className="flex w-full items-center space-x-2">
                    <Textarea
                      {...field}
                      aria-rowcount={3}
                      placeholder={`Enter note ${index + 1}`}
                    />
                    {notesFields.length > 1 && (
                      <Button
                        type="button"
                        className="bg-red-600 hover:bg-red-700 text-white border border-red-700 rounded-lg"
                        onClick={() => removeNote(index)}
                      >
                        <Trash size={20} />
                      </Button>
                    )}
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        ))}
        <Button
          type="button"
          className="w-full bg-black text-white flex items-center justify-center mt-2"
          onClick={() => appendNote("note ")} // Append empty object
        >
          <Plus size={20} className="mr-2" />
          Add Note
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdditionalInformation;

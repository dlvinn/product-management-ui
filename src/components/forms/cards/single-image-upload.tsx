"use client";

import { useForm } from "react-hook-form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { ChangeEvent, useState } from "react";

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const filesArray = Array.from(event.target.files!);
  const displayUrls = filesArray.map((file) => URL.createObjectURL(file));
  const fileNames = filesArray.map((file) => file.name);

  return { files, displayUrls, fileNames };
}

export function RegisterForm() {
  const [preview, setPreview] = useState<string[]>([]);
  const form = useForm<any>({
    mode: "onSubmit",
  });

  function submitCircleRegistration(value: any) {
    console.log({ value });
  }

  return (
    <>
      <Form {...form}>
        <form
          className="space-y-8"
          onSubmit={form.handleSubmit(submitCircleRegistration)}
        >
          <Avatar className="w-24 h-24">
            <AvatarImage src={preview[0]} />
            <AvatarFallback>BU</AvatarFallback>
          </Avatar>
          <FormField
            control={form.control}
            name="circle_image"
            render={({ field: { onChange, value, ...rest } }) => (
              <>
                <FormItem>
                  <FormLabel>Circle Image</FormLabel>
                  <FormControl>
                    <Input
                      multiple
                      type="file"
                      {...rest}
                      onChange={(event) => {
                        const { files, displayUrls, fileNames } =
                          getImageData(event);
                        setPreview(displayUrls);
                        onChange(files);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Choose best image that bring spirits to your circle.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <Button type="submit">Register</Button>
        </form>
      </Form>
    </>
  );
}

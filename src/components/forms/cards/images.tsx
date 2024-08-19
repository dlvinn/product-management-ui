"use client";
import ImagePreviewDialog from "@/components/dialogs/image-preview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Trash } from "lucide-react";
import Image from "next/legacy/image";
import { ChangeEvent, useState } from "react";
import { Control } from "react-hook-form";

// Function to extract image data and URLs
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
interface ImagesUploadProps {
  className?: string;
  control: Control<any> | undefined;
}

const ImagesUpload: React.FC<ImagesUploadProps> = ({ className, control }) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Function to handle selected image removal
  const removeImage = (index: number) => {
    setPreviews(previews.filter((_, i) => i !== index));
    setFileNames(fileNames.filter((_, i) => i !== index));
  };

  return (
    <Card className={`${className} no-overflow`}>
      <CardHeader>
        <CardTitle>Images</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Image preview and upload button */}
        <div className="space-y-4 mb-4">
          {previews.length === 0 ? (
            <div className="grid grid-cols-3 gap-4 mb-4 pt-2">
              {/* Placeholder for no images */}
              <div className="relative col-span-3 h-64 bg-orange-600 rounded flex items-center justify-center text-white text-xl font-semibold">
                <div className="text-gray-800 absolute top-[-30px] left-0 w-full text-left text-sm font-medium py-2">
                  Main Image
                </div>
              </div>
              <div className="relative col-span-1 h-32 bg-orange-600 rounded flex items-center justify-center text-white text-xl font-semibold"></div>
              <div className="relative col-span-1 h-32 bg-orange-600 rounded flex items-center justify-center text-white text-xl font-semibold"></div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4 mb-4">
              {/* Main Image */}
              <div className="relative col-span-3">
                <Image
                  src={previews[0]}
                  alt="Main Image"
                  layout="responsive"
                  width={800}
                  height={600}
                  className="object-cover w-full h-auto"
                  onClick={() => setSelectedImage(previews[0])}
                />
                <div className="text-gray-800 absolute top-[-30px] left-0 w-full text-left text-sm font-medium py-2">
                  Main Image: {fileNames[0]}
                </div>

                <div className="absolute inset-0 flex gap-2 items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                  <Button
                    className="bg-red-500 hover:bg-orange-600 text-white p-2 rounded"
                    onClick={() => removeImage(0)}
                  >
                    <Trash size={16} />
                  </Button>
                  <ImagePreviewDialog
                    onOpen={() => setSelectedImage(previews[0])}
                    image={selectedImage}
                    title={fileNames[0]}
                  />
                </div>
              </div>

              {/* Other Images */}
              {previews.slice(1).map((preview, index) => (
                <div key={index + 1} className="relative col-span-1">
                  <Image
                    src={preview}
                    alt={`Image ${index + 1}`}
                    layout="responsive"
                    width={100}
                    height={100}
                    className="object-cover w-full h-auto"
                    onClick={() => setSelectedImage(preview)}
                  />
                  <div className="absolute top-2 right-2 flex space-x-2 opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <Button
                      className="bg-red-500 hover:bg-orange-600 text-white p-2 rounded"
                      onClick={() => removeImage(index + 1)}
                    >
                      <Trash size={16} />
                    </Button>
                    <ImagePreviewDialog
                      onOpen={() => setSelectedImage(preview)}
                      image={selectedImage}
                      title={fileNames[index + 1]}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Image Button */}

          <label className="block">
            <FormField
              control={control}
              name="images"
              render={({ field: { onChange, value, ...rest } }) => (
                <>
                  <FormItem>
                    <FormControl className="hidden">
                      <Input
                        multiple
                        type="file"
                        {...rest}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          const { files, displayUrls, fileNames } =
                            getImageData(event);
                          setPreviews((prevPreviews) => [
                            ...prevPreviews,
                            ...displayUrls,
                          ]);
                          setFileNames((prevFileNames) => [
                            ...prevFileNames,
                            ...fileNames,
                          ]);
                          onChange(files);
                        }}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                </>
              )}
            />

            <Button
              type="button"
              className="w-full bg-black text-white flex items-center justify-center"
              onClick={() => {
                const fileInput = document.querySelector(
                  'input[type="file"]'
                ) as HTMLInputElement;
                fileInput?.click();
              }}
            >
              <Plus size={16} className="mr-2" />
              Add Images
            </Button>
          </label>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImagesUpload;

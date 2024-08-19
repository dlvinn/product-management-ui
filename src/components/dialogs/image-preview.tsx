import { Button } from "@/components/ui/button"; // Adjust the import path as needed
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Adjust the import path as needed
import { Eye } from "lucide-react";
import Image from "next/legacy/image";
import { FC } from "react";

interface ImagePreviewDialogProps {
  image: string | null;
  title: string;
  onOpen: () => void;
}

const ImagePreviewDialog: FC<ImagePreviewDialogProps> = ({
  image,
  title,
  onOpen,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
          onClick={onOpen}
        >
          <Eye size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md lg:max-w-3xl"
        aria-describedby={undefined}
      >
        {image && (
          <>
            <DialogTitle>{title}</DialogTitle>
            <Image
              src={image}
              alt="Preview Image"
              layout="responsive"
              width={800}
              height={600}
              className="object-contain w-full h-auto"
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ImagePreviewDialog;

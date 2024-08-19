import { Button } from "@/components/ui/button"; // Adjust the import path as needed
import { LucideIcon } from "lucide-react"; // Import type for icons
import { FC } from "react";

interface IconButtonProps {
  icon: LucideIcon; // Icon component (e.g., Trash, Eye, etc.)
  onClick: () => void;
  type?: "button" | "submit" | "reset"; // Button type
  className?: string;
}

const IconButton: FC<IconButtonProps> = ({
  icon: Icon,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <Button
      type={type}
      className={`p-2 rounded ${className}`}
      onClick={onClick}
    >
      <Icon size={16} />
    </Button>
  );
};

export default IconButton;

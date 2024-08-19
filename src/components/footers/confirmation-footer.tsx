import { Button } from "@/components/ui/button";
import { useGoBack } from "@/hooks/useGoBack";

interface ConfirmationFooterComponentProps {
  ButtonTitle: string;
  className?: string;
}
const ConfirmationFooterComponent: React.FC<
  ConfirmationFooterComponentProps
> = ({ ButtonTitle, className }) => {
  const { goBack } = useGoBack();
  return (
    <footer className={`${className} flex justify-end gap-5 `}>
      <Button variant="outline" onClick={goBack} type="button">
        Cancel
      </Button>{" "}
      <Button type="submit">{ButtonTitle}</Button>
    </footer>
  );
};
export default ConfirmationFooterComponent;

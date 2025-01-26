import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type AlertComponentProps = {
  error: string;
};

const AlertComponent = ({ error }: AlertComponentProps) => (
  <Alert variant="destructive">
    <AlertCircle className="h-4 w-4" />
    <AlertTitle>{error && <>{error.toLowerCase()}</>}</AlertTitle>
  </Alert>
);

export default AlertComponent;

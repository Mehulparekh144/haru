import { Loader2 } from "lucide-react";
import { Button } from "./button";

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  loading: boolean;
}

export const LoadingButton = ({ ...props }: LoadingButtonProps) => {
  return (
    <Button {...props} disabled={props.loading || props.disabled}>
      {props.loading && <Loader2 className="size-4 animate-spin" />}
      {props.children}
    </Button>
  );
};

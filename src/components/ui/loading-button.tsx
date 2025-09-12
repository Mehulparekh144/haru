import { Loader2 } from "lucide-react";
import { Button } from "./button";

type LoadingButtonProps = React.ComponentProps<typeof Button> & {
  loading?: boolean;
};

export const LoadingButton = (props: LoadingButtonProps) => {
  const { loading = false, disabled, children, ...rest } = props;
  return (
    <Button {...rest} disabled={loading || disabled}>
      {loading && <Loader2 className="size-4 animate-spin" />}
      {children}
    </Button>
  );
};

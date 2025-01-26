import AlertComponent from "@/components/AlertComponent";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type ForgotPasswordData } from "@/schemas/auth";
import { useFormContext } from "react-hook-form";

type ForgotPasswordFormInner = {
  onForgotPasswordSubmit: (values: ForgotPasswordData) => void;
  loading: boolean;
  error: string;
};

export const ForgotPasswordInner = (props: ForgotPasswordFormInner) => {
  const form = useFormContext<ForgotPasswordData>();

  return (
    <form
      onSubmit={form.handleSubmit(props.onForgotPasswordSubmit)}
      className="space-y-8"
    >
      {props.error && <AlertComponent error={props.error} />}
      <div className="grid gap-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  placeholder="johndoe@mail.com"
                  type="email"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className={`transition-opacity ${
            props.loading ? "opacity-50 pointer-events-none" : "opacity-100"
          }`}
        >
          {props.loading ? "Sending Reset Link..." : "Send Reset Link"}
        </Button>
      </div>
    </form>
  );
};

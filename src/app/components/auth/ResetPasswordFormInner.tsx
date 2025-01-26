import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PasswordInput } from "@/components/ui/password-input";
import { type ResetPasswordData } from "@/schemas/auth";

type ResetPasswordFormInnerProps = {
  onResetPasswordSubmit: (values: ResetPasswordData) => void;
  loading: boolean;
};

export const ResetPasswordFormInner = (props: ResetPasswordFormInnerProps) => {
  const form = useFormContext<ResetPasswordData>();

  return (
    <form
      onSubmit={form.handleSubmit(props.onResetPasswordSubmit)}
      className="space-y-8"
    >
      <div className="grid gap-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel htmlFor="password">New Password</FormLabel>
              <FormControl>
                <PasswordInput
                  id="password"
                  placeholder="******"
                  autoComplete="new-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  id="confirmPassword"
                  placeholder="******"
                  autoComplete="new-password"
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
          {props.loading ? "Resetting Password..." : "Reset Password"}
        </Button>
      </div>
    </form>
  );
};

import Link from "next/link";
import { useFormContext } from "react-hook-form";

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
import { PasswordInput } from "@/components/ui/password-input";
import { AuthCredentials } from "@/schemas/auth";

type LoginFormInnerProps = {
  onLoginSubmit: (values: AuthCredentials) => void;
  loading: boolean;
  error: string;
};

export const LoginFormInner = (props: LoginFormInnerProps) => {
  const form = useFormContext<AuthCredentials>();

  return (
    <form
      onSubmit={form.handleSubmit(props.onLoginSubmit)}
      className="space-y-8"
    >
      {props.error && <AlertComponent error={props.error} />}
      <div className="grid gap-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel htmlFor="username">Username</FormLabel>
              <FormControl>
                <Input
                  id="username"
                  placeholder="johndoe"
                  type="username"
                  autoComplete="username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <div className="flex justify-between items-center">
                <FormLabel htmlFor="password">Password</FormLabel>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </Link>
              </div>
              <FormControl>
                <PasswordInput
                  id="password"
                  placeholder="******"
                  autoComplete="current-password"
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
          {props.loading ? "Logging in" : "Login"}
        </Button>
      </div>
    </form>
  );
};

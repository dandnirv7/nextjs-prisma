"use client";

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
import { RegisterCredentials } from "@/schemas/auth";
import { useFormContext } from "react-hook-form";
import AlertComponent from "@/components/AlertComponent";

type RegisterFormInnerProps = {
  onRegisterSubmit: (values: RegisterCredentials) => void;
  loading: boolean;
  error: string;
};

export const RegisterFormInner = (props: RegisterFormInnerProps) => {
  const form = useFormContext<RegisterCredentials>();

  return (
    <form
      onSubmit={form.handleSubmit(props.onRegisterSubmit)}
      className="space-y-8"
    >
      {props.error && <AlertComponent error={props.error} />}
      <div className="grid gap-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel htmlFor="fullName">Full Name</FormLabel>
              <FormControl>
                <Input id="fullName" placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel htmlFor="username">Username</FormLabel>
              <FormControl>
                <Input id="username" placeholder="johndoe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="grid gap-2">
              <FormLabel htmlFor="password">Password</FormLabel>
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

        <Button
          type="submit"
          className={`w-full ${props.loading ? "opacity-60" : ""}`}
        >
          {props.loading ? "Create an account..." : "Create Account"}
        </Button>
      </div>
    </form>
  );
};

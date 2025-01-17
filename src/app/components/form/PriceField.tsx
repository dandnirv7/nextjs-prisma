import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { Control } from "react-hook-form";
import { FormData } from "schemas/formSchema";

interface PriceFieldProps {
  formControl: Control<FormData>;
  onPriceChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => void;
}

const PriceField = ({ formControl, onPriceChange }: PriceFieldProps) => {
  return (
    <FormField
      control={formControl}
      name="price"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Price</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Enter price"
              value={field.value}
              onChange={(e) => onPriceChange(e, "price")}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PriceField;

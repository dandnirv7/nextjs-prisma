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

interface StockFieldProps {
  formControl: Control<FormData>;
  onPriceChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => void;
}

const StockField = ({ formControl, onPriceChange }: StockFieldProps) => {
  return (
    <FormField
      control={formControl}
      name="stock"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Stock</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Enter stock"
              value={field.value}
              onChange={(e) => onPriceChange(e, "stock")}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default StockField;

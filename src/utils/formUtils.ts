import { UseFormSetValue } from "react-hook-form";
import { FormSchema } from "schemas/formSchema";
import { z } from "zod";

const numbersOnly = /^\d*\.?\d*$/;

export const handleNumberChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  fieldName: string,
  setValue: UseFormSetValue<z.infer<typeof FormSchema>>
) => {
  const value = e.target.value;

  if (numbersOnly.test(value)) {
    const numberValue = parseInt(value, 10);
    if (
      numberValue >= 0 &&
      (fieldName === "price" ? numberValue <= 1000000 : numberValue <= 100)
    ) {
      setValue(fieldName as keyof z.infer<typeof FormSchema>, numberValue);
    }
  }
};

export const handleFileChange = (
  newFiles: File[] | null,
  setFiles: React.Dispatch<React.SetStateAction<File[] | null>>,
  setValue: UseFormSetValue<z.infer<typeof FormSchema>>
) => {
  setFiles(newFiles);

  if (newFiles && newFiles.length > 0) {
    const file = newFiles[0];
    setValue("imageUrl", file.name);
  } else {
    setValue("imageUrl", undefined);
  }
};

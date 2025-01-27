"use client";

import CategoriesField from "@/components/form/CategoriesField";
import DescriptionField from "@/components/form/DescriptionField";
import ImageField from "@/components/form/ImageField";
import NameField from "@/components/form/NameField";
import PriceField from "@/components/form/PriceField";
import StockField from "@/components/form/StockField";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { toast } from "hooks/use-toast";
import { cn } from "@/lib/utils";
import { handleFileChange, handleNumberChange } from "@/utils/formUtils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Menu } from "@prisma/client";
import { updateMenu } from "actions/menu";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormData, FormSchema } from "schemas/formSchema";
import { z } from "zod";

interface MenuExtended extends Partial<Menu> {
  classNames?: string;
  id: number;
}

export function MenuForm({
  classNames,
  id,
  name,
  category,
  price,
  description,
  imageUrl,
  status,
}: MenuExtended) {
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: name || "",
      category: category || "",
      price: price || 0,
      description: description || "",
      imageUrl: imageUrl,
      status: status || true,
      stock: 10,
    },
  });

  const [files, setFiles] = useState<File[] | null>(null);

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const result = await updateMenu(data, String(id));

      if (result.success) {
        toast({
          title: "Data berhasil disubmit",
          description: `Menu "${data.name}" telah berhasil diperbarui.`,
        });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Terjadi kesalahan",
          description: `Gagal memperbarui ke database. Error:${error.message}`,
          variant: "destructive",
        });
      }
      toast({
        title: "Terjadi kesalahan",
        description: "Gagal memperbarui data ke database. Error tidak dikenal.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card className={cn("max-w-2xl w-full mx-auto p-5 shadow-lg", classNames)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-3"
        >
          <NameField formControl={form.control} />
          <CategoriesField formControl={form.control} />
          <PriceField
            formControl={form.control}
            onPriceChange={(e) => handleNumberChange(e, "price", form.setValue)}
          />
          <DescriptionField formControl={form.control} />
          <ImageField
            formControl={form.control}
            uploadedFiles={files}
            handleFileChange={(newFiles) =>
              handleFileChange(newFiles, setFiles, form.setValue)
            }
            dropzoneOptions={dropZoneConfig}
          />
          <StockField
            formControl={form.control}
            onPriceChange={(e) => handleNumberChange(e, "stock", form.setValue)}
          />

          <div className="flex justify-end pt-4">
            <Button type="submit" className="w-[140px]">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}

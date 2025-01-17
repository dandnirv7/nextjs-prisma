import { FormData } from "schemas/formSchema";
import { toast } from "sonner";

export async function updateMenu(data: FormData, id: string) {
  try {
    const response = await fetch(`/api/menu/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to update menu");
    }

    toast.success("Menu berhasil diperbarui!");
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      toast.success(`Terjadi kesalahan: ${error.message}`);
      return { success: false, error: error.message };
    } else {
      toast.error("Terjadi kesalahan yang tidak terduga.");
      return { success: false, error: "Unknown error" };
    }
  }
}

import { ERROR_MESSAGES } from "@/utils/errorMessage";
import { EditUserForm } from "../data/schema";

export const editUser = async (values: EditUserForm, userId: number) => {
  const { password, ...updatedValues } = values;

  if (password !== "") {
    (updatedValues as EditUserForm).password = password;
  }

  const response = await fetch(`/api/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedValues),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || ERROR_MESSAGES.UPDATE_FAILED);
  }

  return data;
};

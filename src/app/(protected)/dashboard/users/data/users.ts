import { Users } from "@prisma/client";
import { fetchUsers } from "services/users";

export async function getUsers(): Promise<Users[]> {
  try {
    const response = await fetchUsers();
    const data = response.data.users;

    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}

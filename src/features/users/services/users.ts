import { UsersResponse } from "@/features/users/data/schema";

export const fetchUsers = async (
  page = 1,
  limit = 10,
  search = "",
  categories = ""
): Promise<UsersResponse> => {
  const queryParams = new URLSearchParams();

  queryParams.set("page", page.toString());
  queryParams.set("limit", limit.toString());

  if (search) queryParams.set("search", search);
  if (categories) queryParams.set("categories", categories);

  const response = await fetch(
    `http://localhost:3000/api/users?${queryParams.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();
  return data;
};

import { fetchUsers } from "@/features/users/services/users";
import { User, UsersResponse } from "./schema";

export const getUsers = async (): Promise<User[]> => {
  try {
    const response = (await fetchUsers()) as UsersResponse;

    if (response && response.data && response.data.users) {
      return response.data.users;
    } else {
      console.log("Response structure is not as expected", response);
      return [];
    }
  } catch (error) {
    console.log(`Error: ${error}`);
    return [];
  }
};

let users: User[] = [];

(async () => {
  users = await getUsers();
})();

export { users };

"use client";

import { Main } from "@/components/layout/main";
import { Heading } from "@/components/ui/heading";
import { SearchProvider } from "@/context/search-context";
import { UsersPrimaryButtons } from "../users/components/users-primary-buttons";
import { columns } from "./components/users-columns";
import { UsersTable } from "./components/users-table";
import UsersProvider from "./context/users-context";
import { getUsers } from "./data/users";

const page = async () => {
  const userList = await getUsers();

  console.log(userList);

  return (
    <UsersProvider>
      <SearchProvider>
        <Main>
          <div className="mb-2 flex items-center justify-between space-y-2 flex-wrap">
            <div>
              <Heading
                title="Users"
                description="Manage your users and their roles here."
              />
            </div>
            <UsersPrimaryButtons />
          </div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
            <UsersTable columns={columns} data={userList} />
          </div>
        </Main>
      </SearchProvider>
    </UsersProvider>
  );
};

export default page;

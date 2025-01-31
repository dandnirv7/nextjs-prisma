"use client";

import { Main } from "@/components/layout/main";
import { Heading } from "@/components/ui/heading";
import { SearchProvider } from "@/context/search-context";
import { columns } from "@/features/users/components/users-columns";
import { UsersDialogs } from "@/features/users/components/users-dialogs";
import { UsersPrimaryButtons } from "@/features/users/components/users-primary-buttons";
import { UsersTable } from "@/features/users/components/users-table";
import UsersProvider from "@/features/users/context/users-context";
import { userListSchema } from "@/features/users/data/schema";
import { users } from "@/features/users/data/users";

export default function Users() {
  const userList = userListSchema.parse(users);

  return (
    <UsersProvider>
      <SearchProvider>
        <Main>
          <div className="mb-2 flex items-center justify-between space-y-2 flex-wrap">
            <Heading
              title="Users"
              description="Manage your users and their roles here."
            />
            <UsersPrimaryButtons />
          </div>
          <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
            <UsersTable data={userList} columns={columns} />
          </div>
        </Main>
        <UsersDialogs />
      </SearchProvider>
    </UsersProvider>
  );
}

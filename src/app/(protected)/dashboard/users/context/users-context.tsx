"use client";

import React, { useState } from "react";
import useDialogState from "@/hooks/use-dialog-state";
import { Users } from "@prisma/client";

type UsersDialogType = "add" | "edit" | "delete";

interface UsersContextType {
  open: UsersDialogType | null;
  setOpen: (str: UsersDialogType | null) => void;
  currentRow: Users | null;
  setCurrentRow: React.Dispatch<React.SetStateAction<Users | null>>;
}

const UsersContext = React.createContext<UsersContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export default function UsersProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<UsersDialogType>(null);
  const [currentRow, setCurrentRow] = useState<Users | null>(null);

  return (
    <UsersContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </UsersContext>
  );
}

export const useUsers = () => {
  const usersContext = React.useContext(UsersContext);

  if (!usersContext) {
    throw new Error("useUsers has to be used within <UsersContext>");
  }

  return usersContext;
};

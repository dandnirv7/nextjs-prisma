import { RoleName } from "@prisma/client";

export interface AuthUser {
  id: number;
  email: string;
  username: string;
  fullName: string;
  role: {
    name: RoleName;
  };
}

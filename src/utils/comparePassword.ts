import bcrypt from "bcrypt";

export async function comparePassword(
  newPassword: string,
  currentHashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(newPassword, currentHashedPassword);
}

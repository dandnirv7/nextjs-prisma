import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { AuthUser } from "./types";

export interface SessionData {
  save(): unknown;
  user?: AuthUser;
  isLoggedIn: boolean;
}

const sessionOptions = {
  password: process.env.SESSION_PASSWORD!,
  cookieName: "next-auth-session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
  },
};

export async function getSession(): Promise<SessionData> {
  const cookieStore = await cookies();

  const session = await getIronSession<SessionData>(
    cookieStore,
    sessionOptions
  );

  session.isLoggedIn = session.isLoggedIn ?? false;

  return session;
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();

  const session = await getIronSession<SessionData>(
    cookieStore,
    sessionOptions
  );

  session.isLoggedIn = false;
  await session.save();
}

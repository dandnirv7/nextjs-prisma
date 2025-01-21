import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { AuthUser } from "./types";

export interface SessionData {
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

export async function getSession() {
  const cookieStore = await cookies();

  const session = await getIronSession<SessionData>(
    cookieStore,
    sessionOptions
  );

  if (!session.isLoggedIn) {
    session.isLoggedIn = false;
  }

  return session;
}

export const ERROR_MESSAGES = {
  CREATE_FAILED: "Error creating user.",
  DELETE_FAILED: "Failed to delete user.",
  INTERNAL_SERVER_ERROR: "Internal server error",
  INVALID_CREDENTIALS: "Invalid credentials",
  INVALID_EMAIL: "Invalid email address",
  INVALID_ID: "Invalid ID format.",
  LOGIN_FAILED: "Invalid login attempt. Username or password is incorrect.",
  LOGOUT_INTERNAL_ERROR: "Failed to logout, internal server error.",
  METHOD_NOT_ALLOWED: "Method not allowed.",
  PROCESS_FAILED: "Failed to process request.",
  REGISTER_FAILED:
    "Registration failed. Username or email might already be in use.",
  UPDATE_FAILED: "Failed to update user.",
  USERNAME_EMAIL_EXISTS: "Username or Email already exists.",
  USER_NOT_FOUND: "User not found.",
} as const;

export const NOTIFICATION_MESSAGES = {
  success: {
    title: "Success",
    description: "Logged out successfully",
  },
  error: {
    title: "Error",
    logoutFailed: (message: string) => `Logout failed: ${message}`,
    networkError: (message: string) =>
      `Logout failed due to network error: ${message}`,
  },
} as const;

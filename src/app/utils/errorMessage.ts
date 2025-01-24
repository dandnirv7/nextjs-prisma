export const ERROR_MESSAGES = {
  USER_NOT_FOUND: "User not found.",
  USERNAME_EMAIL_EXISTS: "Username or Email already exists.",
  INVALID_ID: "Invalid ID format.",
  PROCESS_FAILED: "Failed to process request.",
  UPDATE_FAILED: "Failed to update user.",
  DELETE_FAILED: "Failed to delete user.",
  CREATE_FAILED: "Error creating user.",
  LOGIN_FAILED: "Invalid login attempt. Username or password is incorrect.",
  REGISTER_FAILED:
    "Registration failed. Username or email might already be in use.",
} as const;

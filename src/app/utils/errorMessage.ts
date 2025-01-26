export const ERROR_MESSAGES = {
  // Validation Errors
  INVALID_CREDENTIALS: "Invalid credentials.",
  INVALID_EMAIL: "Invalid email address.",
  INVALID_ID: "Invalid ID format.",
  USERNAME_EMAIL_EXISTS: "Username or Email already exists.",
  MISSING_TOKEN_OR_PASSWORD: "Token or password is missing.",

  // Authentication and Authorization Errors
  LOGIN_FAILED: "Invalid login attempt. Username or password is incorrect.",
  USER_NOT_FOUND: "User not found.",
  INVALID_OR_EXPIRED_TOKEN: "Invalid or expired token.",

  // User Management Errors
  CREATE_FAILED: "Error creating user.",
  UPDATE_FAILED: "Failed to update user.",
  DELETE_FAILED: "Failed to delete user.",
  REGISTER_FAILED:
    "Registration failed. Username or email might already be in use.",

  // System/Server Errors
  INTERNAL_SERVER_ERROR: "Internal server error.",
  LOGOUT_INTERNAL_ERROR: "Failed to logout, internal server error.",
  METHOD_NOT_ALLOWED: "Method not allowed.",
  PROCESS_FAILED: "Failed to process request.",

  // Password Reset Errors
  PASSWORD_RESET_FAILED: "Failed to send password reset email.",
  SAME_PASSWORD: "New password cannot be the same as the previous password.",
} as const;

export const NOTIFICATION_MESSAGES = {
  success: {
    logout: {
      title: "Success",
      message: "Logged out successfully.",
    },
    forgotPassword: {
      title: "Success",
      message: "Password reset email sent. Please check your inbox.",
    },
    resetPassword: {
      title: "Success",
      message:
        "Password reset successful. You can now log in with your new password.",
    },
  },
  error: {
    logout: {
      title: "Error",
      message: (error: string) => `Logout failed: ${error}`,
    },
    forgotPassword: {
      title: "Error Sending Reset Link",
      message: "An unexpected error occurred. Please try again later.",
    },
    userNotFound: {
      message: "No account found with this email address.",
    },
    general: {
      title: "Error",
      message: "An error occurred. Please try again.",
    },
    networkError: {
      title: "Network Error",
      message: (error: string) => `Network error: ${error}`,
    },
    resetPassword: {
      title: "Error Resetting Password",
      message:
        "An unexpected error occurred while resetting your password. Please try again.",
    },
    invalidToken: {
      message:
        "The reset token is invalid or has expired. Please request a new password reset link.",
    },
  },
} as const;

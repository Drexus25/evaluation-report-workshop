// Login form validation schema (no external library required)

export interface LoginFormValues {
  username: string;
  password: string;
}

export interface ValidationError {
  field: keyof LoginFormValues;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

/**
 * Validates login form values against defined rules.
 */
export function validateLoginForm(values: LoginFormValues): ValidationResult {
  const errors: ValidationError[] = [];

  // --- Username ---
  if (!values.username || values.username.trim() === "") {
    errors.push({ field: "username", message: "Username is required." });
  } else if (values.username.trim().length < 3) {
    errors.push({
      field: "username",
      message: "Username must be at least 3 characters.",
    });
  } else if (values.username.trim().length > 32) {
    errors.push({
      field: "username",
      message: "Username must be at most 32 characters.",
    });
  } else if (!/^[a-zA-Z0-9_]+$/.test(values.username.trim())) {
    errors.push({
      field: "username",
      message: "Username may only contain letters, numbers, and underscores.",
    });
  }

  // --- Password ---
  if (!values.password || values.password === "") {
    errors.push({ field: "password", message: "Password is required." });
  } else if (values.password.length < 6) {
    errors.push({
      field: "password",
      message: "Password must be at least 6 characters.",
    });
  } else if (values.password.length > 64) {
    errors.push({
      field: "password",
      message: "Password must be at most 64 characters.",
    });
  }

  return { valid: errors.length === 0, errors };
}

export function getFieldError(
  errors: ValidationError[],
  field: keyof LoginFormValues
): string | undefined {
  return errors.find((e) => e.field === field)?.message;
}


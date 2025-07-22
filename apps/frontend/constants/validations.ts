// Email regex
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password regex (at least 8 characters, one uppercase, one lowercase, one number)
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

// Phone regex (basic international format)
export const phoneRegex = /^\+?[1-9]\d{1,14}$/;

// Validation functions
export interface ValidationResult {
  isValid: boolean;
  error: string;
  isEmpty: boolean;
}

export const validateEmail = (email: string): ValidationResult => {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return { isValid: false, error: 'Email is required', isEmpty: true };
  }

  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, error: 'Please enter a valid email address', isEmpty: false };
  }

  return { isValid: true, error: '', isEmpty: false };
};

export const validatePassword = (password: string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: 'Password is required', isEmpty: true };
  }

  if (password.length < 8) {
    return { isValid: false, error: 'Password must be at least 8 characters long', isEmpty: false };
  }

  if (!passwordRegex.test(password)) {
    return {
      isValid: false,
      error: 'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      isEmpty: false,
    };
  }

  return { isValid: true, error: '', isEmpty: false };
};

export const validateConfirmPassword = (password: string, confirmPassword: string): ValidationResult => {
  if (!confirmPassword) {
    return { isValid: false, error: 'Please confirm your password', isEmpty: true };
  }

  if (password !== confirmPassword) {
    return { isValid: false, error: 'Passwords do not match', isEmpty: false };
  }

  return { isValid: true, error: '', isEmpty: false };
};

export const validateRequired = (value: string, fieldName: string = 'Field'): ValidationResult => {
  if (!value.trim()) {
    return { isValid: false, error: `${fieldName} is required`, isEmpty: true };
  }
  return { isValid: true, error: '', isEmpty: false };
};

export const validatePhone = (phone: string): ValidationResult => {
  const trimmedPhone = phone.trim();

  if (!trimmedPhone) {
    return { isValid: false, error: 'Phone number is required', isEmpty: true };
  }

  if (!phoneRegex.test(trimmedPhone)) {
    return { isValid: false, error: 'Please enter a valid phone number', isEmpty: false };
  }

  return { isValid: true, error: '', isEmpty: false };
};

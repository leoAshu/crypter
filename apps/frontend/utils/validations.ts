import { EMAIL_REGEX, NAME_REGEX, PHONE_REGEX } from '@/constants';

const isEmpty = (value: string): boolean => !value.trim();

const createValidationResult = (isValid: boolean, error: string = ''): ValidationResult => ({ isValid, error });

const validateEmail = (email: string): ValidationResult => {
  const trimmedEmail = email.trim();

  if (isEmpty(trimmedEmail)) {
    return createValidationResult(false, 'Email is required!');
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return createValidationResult(false, 'Please enter a valid email address.');
  }

  return createValidationResult(true);
};

const validateName = (name: string): ValidationResult => {
  const trimmedName = name.trim();

  if (isEmpty(trimmedName)) {
    return createValidationResult(false, 'Name is required!');
  }

  if (!NAME_REGEX.test(trimmedName)) {
    return createValidationResult(false, 'Please enter a valid name.');
  }
  return createValidationResult(true);
};

const validatePassword = (password: string): ValidationResult => {
  if (isEmpty(password)) {
    return createValidationResult(false, 'Password is required!');
  }

  if (password.length < 8) {
    return createValidationResult(false, 'Password must be at least 8 characters long.');
  }

  // if (!PASSWORD_REGEX.test(password)) {
  //   return createValidationResult(
  //     false,
  //     'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
  //   );
  // }

  return createValidationResult(true);
};

const validateConfirmPassword = (password: string, confirmPassword: string): ValidationResult => {
  if (isEmpty(confirmPassword)) {
    return createValidationResult(false, 'Confirm password is required!');
  }

  if (password !== confirmPassword) {
    return createValidationResult(false, 'Passwords do not match!');
  }

  return createValidationResult(true);
};

const validatePhone = (phone: string): ValidationResult => {
  if (isEmpty(phone)) {
    return createValidationResult(false, 'Phone number is required!');
  }

  if (!PHONE_REGEX.test(phone)) {
    return createValidationResult(false, 'Please enter a valid phone number.');
  }

  return createValidationResult(true);
};

export { validateConfirmPassword, validateEmail, validateName, validatePassword, validatePhone };

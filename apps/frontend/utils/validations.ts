import { EMAIL_REGEX, PASSWORD_REGEX } from '@/constants';
import { ValidationResult } from '@/types';

const isEmpty = (value: string): boolean => !value.trim();

const createValidationResult = (
  isValid: boolean,
  error: string = '',
  isEmptyField: boolean = false,
): ValidationResult => ({ isValid, error, isEmpty: isEmptyField });

const validateEmail = (email: string): ValidationResult => {
  const trimmedEmail = email.trim();

  if (isEmpty(trimmedEmail)) {
    return createValidationResult(false, 'Email is required', true);
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return createValidationResult(false, 'Please enter a valid email address');
  }

  return createValidationResult(true);
};

const validatePassword = (password: string): ValidationResult => {
  if (isEmpty(password)) {
    return createValidationResult(false, 'Password is required', true);
  }

  if (password.length < 8) {
    return createValidationResult(false, 'Password must be at least 8 characters long');
  }

  if (!PASSWORD_REGEX.test(password)) {
    return createValidationResult(
      false,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number',
    );
  }

  return createValidationResult(true);
};

export { validateEmail, validatePassword };

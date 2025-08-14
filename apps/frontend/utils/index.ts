const getInitialsFromName = (name: string) => {
  if (!name) return '';

  const parts = name.trim().split(' ');
  const initials = parts.map((p) => p[0]?.toUpperCase()).join('');

  return initials.slice(0, 1);
};

const formatPhoneNumber = (value: string) => {
  if (!value) return value;

  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '');

  // Apply formatting — Example: +1 234 567 8901
  let formatted = '';

  if (digits.startsWith('1')) {
    formatted = '+1';
    if (digits.length > 1) formatted += ' ' + digits.slice(1, 4);
    if (digits.length > 4) formatted += ' ' + digits.slice(4, 7);
    if (digits.length > 7) formatted += ' ' + digits.slice(7, 11);
  } else {
    // Generic international fallback
    formatted = '+' + digits.slice(0, 2);
    if (digits.length > 2) formatted += ' ' + digits.slice(2, 5);
    if (digits.length > 5) formatted += ' ' + digits.slice(5, 8);
    if (digits.length > 8) formatted += ' ' + digits.slice(8, 12);
  }

  return formatted.trim();
};

const currencyFormatter = new Intl.NumberFormat('en-IN', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const capitalizeWords = (input: string): string => {
  return input
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const formatDateTime = (isoString: string): string => {
  const date = new Date(isoString);

  return (
    date.getFullYear() +
    '-' +
    String(date.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(date.getDate()).padStart(2, '0') +
    ' ' +
    String(date.getHours()).padStart(2, '0') +
    ':' +
    String(date.getMinutes()).padStart(2, '0') +
    ':' +
    String(date.getSeconds()).padStart(2, '0')
  );
};

const getMockUserName = (name: string) => {
  if (!name) return '';
  return name.toLowerCase().split(' ').join('_');
};

export * from './api';
export * from './haptics';
export * from './validations';
export { capitalizeWords, currencyFormatter, formatDateTime, formatPhoneNumber, getInitialsFromName, getMockUserName };

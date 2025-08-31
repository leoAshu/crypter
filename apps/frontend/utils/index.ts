const getInitialsFromName = (name: string) => {
  if (!name) return '';

  return name.toUpperCase()[0];
};

const formatPhoneNumber = (value: string) => {
  if (!value) return value;

  let digits = value.replace(/\D/g, '');
  if (digits.length > 10) digits = digits.slice(-10);

  let formatted = '';

  formatted = digits.slice(0, 3);
  if (digits.length > 3) formatted += ' ' + digits.slice(3, 6);
  if (digits.length > 6) formatted += ' ' + digits.slice(6, 11);

  return formatted.trim();
};

const trimPhoneNumber = (value: string) => {
  if (!value) return value;
  return value.replace(/\D/g, '');
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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export * from './api';
export * from './haptics';
export * from './validations';
export {
  capitalizeWords,
  currencyFormatter,
  delay,
  formatDateTime,
  formatPhoneNumber,
  getInitialsFromName,
  trimPhoneNumber,
};

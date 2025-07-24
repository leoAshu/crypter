// Email regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password regex (at least 8 characters, one uppercase, one lowercase, one number)
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

export { EMAIL_REGEX, PASSWORD_REGEX };

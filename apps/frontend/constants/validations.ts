// Email regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password regex (at least 8 characters, one uppercase, one lowercase, one number)
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

//Name Regex
const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ]{1,50}$/;

//Phone Regex
const PHONE_REGEX = /^\+?[1-9]\d{1,10}$/;

export { EMAIL_REGEX, NAME_REGEX, PASSWORD_REGEX, PHONE_REGEX };

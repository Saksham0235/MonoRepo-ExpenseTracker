export const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
export const MIN_PASSWORD_LENGTH = 6;

export const validateEmail = (email) => {
  if (!email.trim()) return "Email is required";
  if (!EMAIL_REGEX.test(email.trim())) return "Enter a valid email address";
  return undefined;
};

export const hasErrors = (errors) => Object.values(errors).some(Boolean);

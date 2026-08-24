function validateEmail(email) {
  if (!email.trim()) {
    return "Email is required.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }

  return null;
}

export function validatePassword({ password, confirmPassword }) {
  if (!password) {
    return "Password is required.";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  if (!confirmPassword) {
    return "Please confirm your password.";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  return null;
}

export function validateLogin({ email, password }) {
  const emailError = validateEmail(email);
  if (emailError) return emailError;

  if (!password) {
    return "Password is required.";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }

  return null;
}

export function validateSignup({ username, email, password, confirmPassword }) {
  if (!username.trim()) {
    return "Username is required.";
  }

  const emailError = validateEmail(email);
  if (emailError) return emailError;

  return validatePassword({ password, confirmPassword });
}

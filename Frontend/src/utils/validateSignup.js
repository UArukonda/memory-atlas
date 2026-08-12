export function validateSignup({ username, email, password, confirmPassword }) {
  if (!username.trim()) {
    return "Username is required.";
  }

  validateLogin({ email, password });

  if (!confirmPassword) {
    return "Please confirm your password.";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  return null;
}

export function validateLogin({ email, password }) {
  if (!email.trim()) {
    return "Email is required.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }

  if (!password) {
    return "Password is required.";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters long.";
  }
  return null;
}

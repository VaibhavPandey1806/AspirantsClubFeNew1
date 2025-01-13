// Mobile validation: 10 digits, optionally starting with +91
export const validateMobile = (mobile: string): boolean => {
  const mobileRegex = /^(\+91)?[6-9]\d{9}$/;
  return mobileRegex.test(mobile.replace(/\s/g, ''));
};

// Email validation: basic format check
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation: min 8 chars, 1 uppercase, 1 lowercase, 1 number
export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
};

// Username validation: alphanumeric, 3-20 chars, no spaces
export const validateUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
  return usernameRegex.test(username);
};

// OTP validation: exactly 6 digits
export const validateOtp = (otp: string): boolean => {
  const otpRegex = /^\d{6}$/;
  return otpRegex.test(otp);
};

// Name validation: letters, spaces, min 2 chars
export const validateName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Z\s]{2,}$/;
  return nameRegex.test(name);
};
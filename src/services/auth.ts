// Send OTP
export const sendOtp = async (mobile: string) => {
  try {
    const response = await api.get(`/public/sendOtp?number=${mobile}`);
    return response;
  } catch (error: any) {
    if (error.response?.status === 429) {
      throw new Error('Too many OTP requests. Please try again later.');
    }
    throw error;
  }
};

// Verify OTP
export const verifyOtp = async (mobile: string, otp: string) => {
  try {
    const response = await api.get(`/public/verifyOtp?number=${mobile}&otp=${otp}`);
    return response;
  } catch (error: any) {
    if (error.response?.status === 400) {
      if (error.response.data === 'OTP Expired') {
        throw new Error('OTP has expired. Please request a new one.');
      }
      throw new Error('Invalid OTP. Please try again.');
    }
    throw error;
  }
};
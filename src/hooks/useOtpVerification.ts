import { useState, useCallback, useEffect } from 'react';
import { sendOtp, verifyOtp } from '../services/auth';

export function useOtpVerification(mobile: string) {
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleSendOtp = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await sendOtp(mobile);
      setOtpSent(true);
      setResendTimer(120); // 2 minutes
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await verifyOtp(mobile, otp);
      setOtpVerified(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setOtp(value);
  };

  return {
    otp,
    otpSent,
    otpVerified,
    isLoading,
    error,
    canResend: resendTimer === 0,
    handleSendOtp,
    handleVerifyOtp,
    handleOtpChange
  };
}
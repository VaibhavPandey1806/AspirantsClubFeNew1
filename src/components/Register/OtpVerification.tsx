import React from 'react';
import { Send, CheckCircle, Loader2, Phone } from 'lucide-react';
import CountryCodeSelector from './CountryCodeSelector';

interface OtpVerificationProps {
  mobile: string;
  otp: string;
  otpSent: boolean;
  otpVerified: boolean;
  canResend: boolean;
  isLoading: boolean;
  onMobileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOtpChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendOtp: () => void;
  onVerifyOtp: () => void;
  error?: string;
}

export default function OtpVerification({
  mobile,
  otp,
  otpSent,
  otpVerified,
  canResend,
  isLoading,
  onMobileChange,
  onOtpChange,
  onSendOtp,
  onVerifyOtp,
  error
}: OtpVerificationProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="flex">
          <CountryCodeSelector disabled={otpSent} />
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              name="mobile"
              value={mobile}
              onChange={onMobileChange}
              placeholder="Enter mobile number"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-r-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              disabled={otpSent}
              maxLength={10}
            />
          </div>
        </div>
      </div>

      {otpVerified && (
        <div className="flex items-center gap-2 text-green-600 bg-green-50 p-2 rounded-md">
          <CheckCircle className="w-5 h-5" />
          <span>Mobile number verified successfully</span>
        </div>
      )}

      {otpSent && !otpVerified && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={onOtpChange}
              placeholder="Enter 6-digit OTP"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              maxLength={6}
            />
            <button
              onClick={onVerifyOtp}
              disabled={!otp || otp.length !== 6 || isLoading}
              className="inline-flex items-center gap-2 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4" />
              )}
              Verify OTP
            </button>
          </div>
          
          {canResend && (
            <button
              onClick={onSendOtp}
              disabled={isLoading}
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Resend OTP
            </button>
          )}
        </div>
      )}

      {!otpSent && !otpVerified && (
        <button
          onClick={onSendOtp}
          disabled={!mobile || mobile.length !== 10 || isLoading}
          className="inline-flex items-center gap-2 w-full justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          Send OTP
        </button>
      )}

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
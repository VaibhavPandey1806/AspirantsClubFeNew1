import React from 'react';
import { useRegisterForm } from '../../hooks/useRegisterForm';
import { useOtpVerification } from '../../hooks/useOtpVerification';
import FormInput from './FormInput';
import FormError from '../common/FormError';
import SubmitButton from '../common/SubmitButton';
import OtpVerification from './OtpVerification';

export default function RegisterForm() {
  const {
    formData,
    error,
    isLoading,
    handleInputChange,
    handleSubmit,
    validationErrors
  } = useRegisterForm();

  const {
    otp,
    otpSent,
    otpVerified,
    isLoading: otpLoading,
    error: otpError,
    canResend,
    handleSendOtp,
    handleVerifyOtp,
    handleOtpChange
  } = useOtpVerification(formData.mobile);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <FormError message={error} />}

      <FormInput
        label="Full Name"
        name="name"
        type="text"
        value={formData.name}
        onChange={handleInputChange}
        error={validationErrors.name}
        required
        placeholder="Enter your full name"
        icon="user"
      />

      <FormInput
        label="Username"
        name="username"
        type="text"
        value={formData.username}
        onChange={handleInputChange}
        error={validationErrors.username}
        required
        placeholder="Choose a username"
        icon="atSign"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleInputChange}
          error={validationErrors.password}
          required
          placeholder="Create password"
          icon="lock"
        />

        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          error={validationErrors.confirmPassword}
          required
          placeholder="Confirm password"
          icon="lockKeyhole"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
          <OtpVerification
            mobile={formData.mobile}
            otp={otp}
            otpSent={otpSent}
            otpVerified={otpVerified}
            canResend={canResend}
            isLoading={otpLoading}
            onMobileChange={handleInputChange}
            onOtpChange={handleOtpChange}
            onSendOtp={handleSendOtp}
            onVerifyOtp={handleVerifyOtp}
            error={otpError}
          />
        </div>

        <FormInput
          label="Email"
          name="emailId"
          type="email"
          value={formData.emailId}
          onChange={handleInputChange}
          error={validationErrors.emailId}
          required
          placeholder="Enter email address"
          icon="mail"
        />
      </div>

      <SubmitButton
        isSubmitting={isLoading}
        text="Create Account"
        loadingText="Creating Account..."
        disabled={!otpVerified}
      />

      <p className="mt-4 text-xs text-gray-500 text-center">
        By creating an account, you agree to our Terms of Service and Privacy Policy
      </p>
    </form>
  );
}
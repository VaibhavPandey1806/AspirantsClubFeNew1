import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useOtpVerification } from '../hooks/useOtpVerification';
import CountryCodeSelector from './CountryCodeSelector';

interface OtpVerificationProps {
  mobile: string;
  onMobileChange: (text: string) => void;
  error?: string;
}

export default function OtpVerification({
  mobile,
  onMobileChange,
  error
}: OtpVerificationProps) {
  const {
    otp,
    otpSent,
    otpVerified,
    isLoading,
    otpError,
    canResend,
    handleSendOtp,
    handleVerifyOtp,
    handleOtpChange
  } = useOtpVerification(mobile);

  return (
    <View style={styles.container}>
      <View style={styles.mobileInputContainer}>
        <CountryCodeSelector />
        <TextInput
          style={styles.mobileInput}
          label="Mobile Number"
          value={mobile}
          onChangeText={onMobileChange}
          mode="outlined"
          keyboardType="phone-pad"
          maxLength={10}
          error={!!error}
          disabled={otpSent}
          left={<TextInput.Icon icon="phone" />}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}

      {otpVerified ? (
        <View style={styles.verifiedContainer}>
          <Text style={styles.verifiedText}>✓ Mobile number verified</Text>
        </View>
      ) : otpSent ? (
        <View style={styles.otpContainer}>
          <TextInput
            style={styles.otpInput}
            label="Enter OTP"
            value={otp}
            onChangeText={handleOtpChange}
            mode="outlined"
            keyboardType="number-pad"
            maxLength={6}
            error={!!otpError}
          />
          <Button
            mode="contained"
            onPress={handleVerifyOtp}
            loading={isLoading}
            disabled={!otp || otp.length !== 6 || isLoading}
            style={styles.verifyButton}
          >
            Verify OTP
          </Button>
          {canResend && (
            <Button
              mode="text"
              onPress={handleSendOtp}
              disabled={isLoading}
            >
              Resend OTP
            </Button>
          )}
        </View>
      ) : (
        <Button
          mode="contained"
          onPress={handleSendOtp}
          loading={isLoading}
          disabled={!mobile || mobile.length !== 10 || isLoading}
          style={styles.sendOtpButton}
        >
          Send OTP
        </Button>
      )}

      {otpError && <Text style={styles.errorText}>{otpError}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  mobileInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mobileInput: {
    flex: 1,
  },
  otpContainer: {
    marginTop: 8,
  },
  otpInput: {
    marginBottom: 8,
  },
  verifyButton: {
    marginBottom: 8,
  },
  sendOtpButton: {
    marginTop: 8,
  },
  verifiedContainer: {
    backgroundColor: '#e6ffe6',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  verifiedText: {
    color: '#008000',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
});
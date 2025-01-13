import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { TextInput, Button, Text, useTheme } from 'react-native-paper';
import { useRegisterForm } from '../hooks/useRegisterForm';
import OtpVerification from '../components/OtpVerification';

export default function RegisterScreen({ navigation }) {
  const theme = useTheme();
  const {
    formData,
    error,
    isLoading,
    handleInputChange,
    handleSubmit,
    validationErrors
  } = useRegisterForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.form}>
          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}

          <TextInput
            label="Full Name"
            value={formData.name}
            onChangeText={(text) => handleInputChange('name', text)}
            mode="outlined"
            error={!!validationErrors.name}
            style={styles.input}
            left={<TextInput.Icon icon="account" />}
          />
          {validationErrors.name && (
            <Text style={styles.fieldError}>{validationErrors.name}</Text>
          )}

          <TextInput
            label="Username"
            value={formData.username}
            onChangeText={(text) => handleInputChange('username', text)}
            mode="outlined"
            error={!!validationErrors.username}
            style={styles.input}
            left={<TextInput.Icon icon="at" />}
          />
          {validationErrors.username && (
            <Text style={styles.fieldError}>{validationErrors.username}</Text>
          )}

          <TextInput
            label="Password"
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
            mode="outlined"
            secureTextEntry={!showPassword}
            error={!!validationErrors.password}
            style={styles.input}
            left={<TextInput.Icon icon="lock" />}
            right={
              <TextInput.Icon 
                icon={showPassword ? "eye-off" : "eye"} 
                onPress={() => setShowPassword(!showPassword)}
              />
            }
          />
          {validationErrors.password && (
            <Text style={styles.fieldError}>{validationErrors.password}</Text>
          )}

          <TextInput
            label="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(text) => handleInputChange('confirmPassword', text)}
            mode="outlined"
            secureTextEntry={!showConfirmPassword}
            error={!!validationErrors.confirmPassword}
            style={styles.input}
            left={<TextInput.Icon icon="lock-check" />}
            right={
              <TextInput.Icon 
                icon={showConfirmPassword ? "eye-off" : "eye"} 
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            }
          />
          {validationErrors.confirmPassword && (
            <Text style={styles.fieldError}>{validationErrors.confirmPassword}</Text>
          )}

          <OtpVerification
            mobile={formData.mobile}
            onMobileChange={(text) => handleInputChange('mobile', text)}
            error={validationErrors.mobile}
          />

          <TextInput
            label="Email"
            value={formData.emailId}
            onChangeText={(text) => handleInputChange('emailId', text)}
            mode="outlined"
            error={!!validationErrors.emailId}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            left={<TextInput.Icon icon="email" />}
          />
          {validationErrors.emailId && (
            <Text style={styles.fieldError}>{validationErrors.emailId}</Text>
          )}

          <Button
            mode="contained"
            onPress={handleSubmit}
            loading={isLoading}
            disabled={isLoading}
            style={styles.button}
          >
            Create Account
          </Button>

          <TouchableOpacity 
            onPress={() => navigation.navigate('Login')}
            style={styles.loginLink}
          >
            <Text style={styles.loginText}>
              Already have an account? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  form: {
    width: '100%',
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
    paddingVertical: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  fieldError: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    marginTop: -4,
  },
  loginLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  loginText: {
    color: '#004B93',
  },
});
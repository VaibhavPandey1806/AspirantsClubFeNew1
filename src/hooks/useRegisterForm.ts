import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/auth';
import { LOGIN_URL } from '../utils/constants';
import { validateMobile, validateEmail, validatePassword } from '../utils/validation';

interface FormData {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
  mobile: string;
  emailId: string;
}

interface ValidationErrors {
  name?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  mobile?: string;
  emailId?: string;
}

export function useRegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    emailId: ''
  });
  
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    }

    if (!validatePassword(formData.password)) {
      errors.password = 'Password must be at least 8 characters with 1 uppercase, 1 lowercase and 1 number';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!validateMobile(formData.mobile)) {
      errors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!validateEmail(formData.emailId)) {
      errors.emailId = 'Please enter a valid email address';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error when user types
    setValidationErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const { confirmPassword, ...registrationData } = formData;
      await registerUser(registrationData);
      window.location.href = LOGIN_URL;
    } catch (error: any) {
      setError(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    error,
    isLoading,
    validationErrors,
    handleInputChange,
    handleSubmit
  };
}
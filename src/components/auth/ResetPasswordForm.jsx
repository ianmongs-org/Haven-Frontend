import { useState } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Alert } from '../common/Alert';
import { validatePassword, getPasswordStrength } from '../../utils/validators';
import authService from '../../services/auth.service';

export const ResetPasswordForm = ({ email, otpVerified, onSuccess }) => {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'newPassword') {
      setPasswordStrength(getPasswordStrength(value));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!validatePassword(formData.newPassword)) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    if (!validate()) return;

    setLoading(true);

    try {
      await authService.resetPassword({
        email,
        newPassword: formData.newPassword,
      });

      setAlert({
        type: 'success',
        message: 'Password reset successfully!',
      });

      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'Failed to reset password. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!otpVerified) {
    return (
      <Alert
        type="warning"
        message="Please verify your OTP first before resetting your password"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Create new password</h3>
        <p className="text-sm text-gray-600">
          Your new password must be different from previous passwords
        </p>
      </div>

      <div>
        <Input
          label="New Password"
          name="newPassword"
          type="password"
          value={formData.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
          placeholder="••••••••"
          showPasswordToggle
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
        />
        {passwordStrength && formData.newPassword && (
          <div className="mt-2">
            <div className="flex gap-1 mb-1">
              {[1, 2, 3].map((level) => (
                <div
                  key={level}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    passwordStrength.level === 'weak' && level === 1
                      ? 'bg-red-500'
                      : passwordStrength.level === 'medium' && level <= 2
                      ? 'bg-yellow-500'
                      : passwordStrength.level === 'strong'
                      ? 'bg-green-500'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className={`text-xs font-medium ${
              passwordStrength.level === 'weak'
                ? 'text-red-600'
                : passwordStrength.level === 'medium'
                ? 'text-yellow-600'
                : 'text-green-600'
            }`}>
              Password strength: {passwordStrength.level}
            </p>
          </div>
        )}
      </div>

      <Input
        label="Confirm New Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        placeholder="••••••••"
        showPasswordToggle
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        }
      />

      <Button type="submit" loading={loading} className="w-full">
        Reset Password
      </Button>
    </form>
  );
};
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Alert } from '../common/Alert';
import { ROUTES } from '../../utils/constants';
import { validateEmail } from '../../utils/validators';
import authService from '../../services/auth.service';

export const ForgotPasswordForm = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const validate = () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);
    setError('');

    if (!validate()) return;

    setLoading(true);

    try {
      await authService.requestPasswordReset({ email });
      setAlert({
        type: 'success',
        message: 'Password reset code sent to your email',
      });
      setTimeout(() => {
        onSuccess(email);
      }, 1500);
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'Failed to send reset code. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

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
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Reset your password</h3>
        <p className="text-sm text-gray-600">
          Enter your email and we'll send you a code to reset your password
        </p>
      </div>

      <Input
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError('');
        }}
        error={error}
        placeholder="you@example.com"
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        }
      />

      <Button type="submit" loading={loading} className="w-full">
        Send Reset Code
      </Button>

      <p className="text-center text-sm text-gray-600">
        Remember your password?{' '}
        <Link to={ROUTES.LOGIN} className="font-semibold text-primary-600 hover:text-primary-700">
          Sign in
        </Link>
      </p>
    </form>
  );
};
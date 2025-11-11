import { useState, useRef, useEffect } from 'react';
import { Button } from '../common/Button';
import { Alert } from '../common/Alert';

export const OTPVerification = ({ email, onVerify, onResend, loading }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [alert, setAlert] = useState(null);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('').concat(Array(6 - pastedData.length).fill(''));
    setOtp(newOtp);

    const nextEmptyIndex = newOtp.findIndex(val => !val);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    const otpCode = otp.join('');
    
    if (otpCode.length !== 6) {
      setAlert({
        type: 'error',
        message: 'Please enter all 6 digits',
      });
      return;
    }

    try {
      await onVerify(otpCode);
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'Invalid verification code',
      });
    }
  };

  const handleResend = async () => {
    setAlert(null);
    try {
      await onResend();
      setAlert({
        type: 'success',
        message: 'Verification code sent successfully',
      });
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Failed to resend code. Please try again.',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="text-center">
        <p className="text-sm text-gray-600">
          We've sent a 6-digit verification code to
        </p>
        <p className="font-semibold text-gray-900 mt-1">{email}</p>
      </div>

      <div className="flex justify-center gap-3">
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={el => inputRefs.current[index] = el}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(index, e.target.value)}
            onKeyDown={e => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-300 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all bg-white/50 backdrop-blur-sm"
          />
        ))}
      </div>

      <Button type="submit" loading={loading} className="w-full">
        Verify Code
      </Button>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Didn't receive the code?{' '}
          <button
            type="button"
            onClick={handleResend}
            className="font-semibold text-primary-600 hover:text-primary-700"
          >
            Resend
          </button>
        </p>
      </div>
    </form>
  );
};
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "../../components/common/Card";
import { OTPVerification } from "../../components/auth/OTPVerification";
import { ROUTES } from "../../utils/constants";
import authService from "../../services/auth.service";
import { LOGO } from "../../assets";

export const VerifyEmailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const [loading, setLoading] = useState(false);

  const handleVerify = async (otpCode) => {
    setLoading(true);
    try {
      await authService.verifyEmail({ email, otpCode });
      setTimeout(() => {
        navigate(ROUTES.LOGIN);
      }, 1500);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    await authService.register({ email });
  };

  if (!email) {
    navigate(ROUTES.REGISTER);
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="p-2 flex items-center justify-center">
            <img src={LOGO} alt="Haven" className="w-12 h-12" />
          </div>
          <h1 className="text-3xl text-black font-bold gradient-text mb-2">
            Verify Your Email
          </h1>
          <p className="text-gray-600">
            We've sent a verification code to your email
          </p>
        </div>

        <OTPVerification
          email={email}
          onVerify={handleVerify}
          onResend={handleResend}
          loading={loading}
        />

        <p className="text-center text-sm text-gray-500 mt-6">
          Check your spam folder if you don't see the email
        </p>
      </div>
    </div>
  );
};

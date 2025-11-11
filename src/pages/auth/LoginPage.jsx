import { LoginForm } from '../../components/auth/LoginForm';
import { Card } from '../../components/common/Card';

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 mb-4 shadow-2xl">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to continue your wellness journey
          </p>
        </div>

        <Card className="animate-slide-up">
          <LoginForm />
        </Card>

        <p className="text-center text-sm text-gray-500 mt-6">
          Your mental health matters. We're here to support you.
        </p>
      </div>
    </div>
  );
};
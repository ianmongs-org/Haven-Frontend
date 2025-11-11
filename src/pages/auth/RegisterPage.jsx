import { RegisterForm } from '../../components/auth/RegisterForm';
import { Card } from '../../components/common/Card';

export const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 mb-4 shadow-2xl">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600">
            Begin your journey to better mental health
          </p>
        </div>

        <Card className="animate-slide-up">
          <RegisterForm />
        </Card>

        <p className="text-center text-sm text-gray-500 mt-6">
          Join thousands on their path to wellness
        </p>
      </div>
    </div>
  );
};
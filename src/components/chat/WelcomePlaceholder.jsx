import { useAuth } from '../../hooks/useAuth';

export const WelcomePlaceholder = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex-1 flex flex-col justify-center items-center h-full p-8 text-center">
        <div className="w-20 h-20 bg-linear-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        </div>
      <h2 className="text-3xl font-bold gradient-text mb-2">
        Welcome, {user?.full_name?.split(' ')[0] || 'User'}!
      </h2>
      <p className="text-gray-600 max-w-md">
        You're in a
        safe space. Start a new chat to talk about what's on your mind.
        Your companion, Haven, is here to listen.
      </p>
    </div>
  );
};
export const LoadingSpinner = ({ size = 'md', fullScreen = false }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const spinner = (
    <div className="flex items-center justify-center">
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute inset-0 rounded-full border-4 border-primary-200"></div>
        <div className="absolute inset-0 rounded-full border-4 border-primary-600 border-t-transparent animate-spin"></div>
      </div>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-linear-to-br from-gray-50 via-blue-50 to-purple-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};
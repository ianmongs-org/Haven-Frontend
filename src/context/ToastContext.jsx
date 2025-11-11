import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  }, []);

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-24 right-6 z-50 flex flex-col gap-3">
        {toasts.map((toast) => (
          <ToastMessage
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastMessage = ({ message, type, onClose }) => {
  const bgColor = type === 'success'
    ? 'bg-green-100 border-green-400'
    : 'bg-red-100 border-red-400';
  const textColor = type === 'success' ? 'text-green-700' : 'text-red-700';

  return (
    <div
      className={`animate-slide-up w-full max-w-sm rounded-lg border p-4 shadow-lg ${bgColor} ${textColor}`}
      role="alert"
    >
      <div className="flex items-start">
        <div className="shrink-0">
          {type === 'success' ? (
            <SuccessIcon />
          ) : (
            <ErrorIcon />
          )}
        </div>
        <div className="ml-3 flex-1 pt-0.5">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <div className="ml-4 shrink-0">
          <button
            onClick={onClose}
            className={`inline-flex rounded-md p-1 ${
              type === 'success'
                ? 'hover:bg-green-200'
                : 'hover:bg-red-200'
            } transition`}
          >
            <span className="sr-only">Close</span>
            <CloseIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

const SuccessIcon = () => (
  <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const ErrorIcon = () => (
  <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-5a1 1 0 012 0v1a1 1 0 11-2 0v-1zm1-9a1 1 0 00-1 1v4a1 1 0 102 0V5a1 1 0 00-1-1z"
      clipRule="evenodd"
    />
  </svg>
);

const CloseIcon = () => (
  <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);
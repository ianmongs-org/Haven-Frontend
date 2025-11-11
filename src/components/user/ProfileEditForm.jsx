import { useState } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Alert } from '../common/Alert';
import { validateFullName } from '../../utils/validators';
import userService from '../../services/user.service';
import { useAuth } from '../../hooks/useAuth';

export const ProfileEditForm = ({ user, onSuccess }) => {
  const { updateUser } = useAuth();
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const validate = () => {
    if (!validateFullName(fullName)) {
      setError('Full name must be at least 2 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);
    setError('');

    if (!validate()) return;

    if (fullName === user?.full_name) {
      setAlert({
        type: 'info',
        message: 'No changes to save',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await userService.updateProfile({ fullName });
      updateUser(response.data);
      
      setAlert({
        type: 'success',
        message: 'Profile updated successfully!',
      });

      if (onSuccess) {
        setTimeout(onSuccess, 1500);
      }
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'Failed to update profile. Please try again.',
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

      <Input
        label="Full Name"
        name="fullName"
        value={fullName}
        onChange={(e) => {
          setFullName(e.target.value);
          setError('');
        }}
        error={error}
        placeholder="John Doe"
        icon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
      />

      <div className="flex gap-3">
        <Button type="submit" loading={loading} className="flex-1">
          Save Changes
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => setFullName(user?.full_name || '')}
          disabled={loading}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ProfileCard } from '../../components/user/ProfileCard';
import { ProfileEditForm } from '../../components/user/ProfileEditForm';
import { StatisticsCard } from '../../components/user/StatisticsCard';
import { ChangePasswordForm } from '../../components/auth/ChangePasswordForm';
import { Card } from '../../components/common/Card';
import { Modal } from '../../components/common/Modal';
import { Button } from '../../components/common/Button';
import { Alert } from '../../components/common/Alert';
import { ROUTES } from '../../utils/constants';
import authService from '../../services/auth.service';

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleDeleteAccount = async () => {
    setDeleteLoading(true);
    try {
      await authService.deleteAccount();
      await logout();
      navigate(ROUTES.LOGIN);
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Failed to delete account. Please try again.',
      });
    } finally {
      setDeleteLoading(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile Settings</h1>
        <p className="text-lg text-gray-600">
          Manage your account information and preferences
        </p>
      </div>

      {alert && (
        <div className="mb-6">
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1">
          <ProfileCard user={user} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <StatisticsCard />

          <Card className="animate-fade-in">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <Button
                onClick={() => setShowEditModal(true)}
                variant="secondary"
                className="w-full justify-start"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </Button>

              <Button
                onClick={() => setShowPasswordModal(true)}
                variant="secondary"
                className="w-full justify-start"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Change Password
              </Button>
            </div>
          </Card>

          <Card className="animate-fade-in border-2 border-red-200 bg-red-50">
            <h3 className="text-xl font-bold text-red-900 mb-2">Danger Zone</h3>
            <p className="text-red-700 mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button
              onClick={() => setShowDeleteModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Account
            </Button>
          </Card>
        </div>
      </div>

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Profile"
      >
        <ProfileEditForm 
          user={user} 
          onSuccess={() => setShowEditModal(false)} 
        />
      </Modal>

      <Modal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="Change Password"
      >
        <ChangePasswordForm 
          onSuccess={() => setShowPasswordModal(false)} 
        />
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Account"
      >
        <div className="space-y-4">
          <Alert
            type="warning"
            message="This action cannot be undone. All your data will be permanently deleted."
          />
          <p className="text-gray-700">
            Are you sure you want to delete your account? This will remove all your chat history, insights, and personal data.
          </p>
          <div className="flex gap-3">
            <Button
              onClick={handleDeleteAccount}
              loading={deleteLoading}
              className="flex-1 bg-red-600 hover:bg-red-700"
            >
              Yes, Delete My Account
            </Button>
            <Button
              onClick={() => setShowDeleteModal(false)}
              variant="secondary"
              className="flex-1"
              disabled={deleteLoading}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
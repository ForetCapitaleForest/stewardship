import React from 'react';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import { useStore } from '@/store/useStore';

const Profile: React.FC = () => {
  const { currentUser, volunteers } = useStore();
  const volunteer = currentUser ? volunteers[currentUser.id] : null;

  if (!volunteer) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card><CardBody><p className="text-center text-gray-600 py-8">Please log in</p></CardBody></Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">My Profile</h1>
      <Card>
        <CardHeader><h2 className="text-2xl font-semibold">Personal Information</h2></CardHeader>
        <CardBody>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><dt className="text-sm font-medium text-gray-600">Name</dt><dd className="text-gray-900">{volunteer.firstName} {volunteer.lastName}</dd></div>
            <div><dt className="text-sm font-medium text-gray-600">Email</dt><dd className="text-gray-900">{volunteer.email}</dd></div>
            <div><dt className="text-sm font-medium text-gray-600">Phone</dt><dd className="text-gray-900">{volunteer.phone}</dd></div>
            <div><dt className="text-sm font-medium text-gray-600">Role</dt><dd className="text-gray-900 capitalize">{volunteer.role}</dd></div>
            <div><dt className="text-sm font-medium text-gray-600">Status</dt><dd className="text-gray-900 capitalize">{volunteer.status}</dd></div>
            <div><dt className="text-sm font-medium text-gray-600">Total Hours</dt><dd className="text-gray-900">{volunteer.totalHours}</dd></div>
          </dl>
        </CardBody>
      </Card>
    </div>
  );
};

export default Profile;

// Made with Bob

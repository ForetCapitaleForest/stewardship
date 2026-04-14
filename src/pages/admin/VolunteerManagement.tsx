import React from 'react';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import { useStore } from '@/store/useStore';

const VolunteerManagement: React.FC = () => {
  const { volunteers } = useStore();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Volunteer Management</h1>
      <Card>
        <CardHeader><h2 className="text-2xl font-semibold">All Volunteers</h2></CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.values(volunteers).map(volunteer => (
                  <tr key={volunteer.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{volunteer.firstName} {volunteer.lastName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{volunteer.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">{volunteer.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">{volunteer.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{volunteer.totalHours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default VolunteerManagement;

// Made with Bob

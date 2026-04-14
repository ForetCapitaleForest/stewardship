import React from 'react';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import { useStore } from '@/store/useStore';

const Reports: React.FC = () => {
  const { volunteers, sites } = useStore();
  
  const totalHours = Object.values(volunteers).reduce((sum, v) => sum + v.totalHours, 0);
  const activeVolunteers = Object.values(volunteers).filter(v => v.status === 'active').length;
  const activeSites = Object.values(sites).filter(s => s.status === 'active').length;
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Reports & Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardBody className="text-center">
            <div className="text-4xl font-bold text-primary-500">{totalHours}</div>
            <div className="text-gray-600">Total Hours Logged</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <div className="text-4xl font-bold text-secondary-500">{activeVolunteers}</div>
            <div className="text-gray-600">Active Volunteers</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <div className="text-4xl font-bold text-green-500">{activeSites}</div>
            <div className="text-gray-600">Active Sites</div>
          </CardBody>
        </Card>
      </div>

      <Card>
        <CardHeader><h2 className="text-2xl font-semibold">Top Volunteers</h2></CardHeader>
        <CardBody>
          <div className="space-y-2">
            {Object.values(volunteers)
              .sort((a, b) => b.totalHours - a.totalHours)
              .slice(0, 10)
              .map((volunteer, index) => (
                <div key={volunteer.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <span className="font-bold text-gray-400 mr-3">#{index + 1}</span>
                    <span className="font-medium">{volunteer.firstName} {volunteer.lastName}</span>
                  </div>
                  <span className="text-primary-600 font-semibold">{volunteer.totalHours} hours</span>
                </div>
              ))}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Reports;

// Made with Bob

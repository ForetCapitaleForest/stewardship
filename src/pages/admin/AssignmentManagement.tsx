import React from 'react';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import { useStore } from '@/store/useStore';
import { formatDate } from '@/utils/formatting';

const AssignmentManagement: React.FC = () => {
  const { assignments, sites } = useStore();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Assignment Management</h1>
      <Card>
        <CardHeader><h2 className="text-2xl font-semibold">All Assignments</h2></CardHeader>
        <CardBody>
          <div className="space-y-3">
            {Object.values(assignments).map(assignment => {
              const site = sites[assignment.siteId];
              return (
                <div key={assignment.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{assignment.taskType}</h3>
                      <p className="text-sm text-gray-600">{site?.name}</p>
                      <p className="text-sm text-gray-600">{formatDate(assignment.date)}</p>
                    </div>
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm capitalize">
                      {assignment.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default AssignmentManagement;

// Made with Bob

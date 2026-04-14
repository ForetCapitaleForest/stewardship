import React from 'react';
import { Card, CardBody } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { useStore } from '@/store/useStore';
import { formatDate } from '@/utils/formatting';

const Assignments: React.FC = () => {
  const { currentUser, assignments, sites, signUpForAssignment, cancelAssignmentSignup } = useStore();
  const assignmentList = Object.values(assignments).filter(a => a.status === 'scheduled');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Assignments</h1>
      <div className="space-y-4">
        {assignmentList.map(assignment => {
          const site = sites[assignment.siteId];
          const isSignedUp = currentUser && assignment.assignedVolunteerIds.includes(currentUser.id);
          const isFull = assignment.assignedVolunteerIds.length >= assignment.maxVolunteers;
          
          return (
            <Card key={assignment.id}>
              <CardBody>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{assignment.taskType}</h3>
                    <p className="text-gray-600 mb-2">{site?.name}</p>
                    <p className="text-sm text-gray-600">
                      {formatDate(assignment.date)} • {assignment.startTime} - {assignment.endTime}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">
                      {assignment.assignedVolunteerIds.length} / {assignment.maxVolunteers} volunteers
                    </p>
                  </div>
                  {currentUser && (
                    <div>
                      {isSignedUp ? (
                        <Button variant="outline" onClick={() => cancelAssignmentSignup(assignment.id, currentUser.id)}>
                          Cancel
                        </Button>
                      ) : (
                        <Button disabled={isFull} onClick={() => signUpForAssignment(assignment.id, currentUser.id)}>
                          {isFull ? 'Full' : 'Sign Up'}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Assignments;

// Made with Bob

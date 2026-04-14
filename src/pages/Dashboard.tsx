import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Award, TrendingUp } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { useStore } from '@/store/useStore';
import { formatDate } from '@/utils/formatting';

const Dashboard: React.FC = () => {
  const { currentUser, volunteers, assignments, activityLogs } = useStore();
  
  if (!currentUser) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardBody>
            <p className="text-center text-gray-600 py-8">Please log in to view your dashboard</p>
          </CardBody>
        </Card>
      </div>
    );
  }

  const volunteer = volunteers[currentUser.id];
  const myAssignments = Object.values(assignments).filter(a => 
    a.assignedVolunteerIds.includes(currentUser.id)
  );
  const upcomingAssignments = myAssignments.filter(a => 
    a.status === 'scheduled' && new Date(a.date) >= new Date()
  );
  const myLogs = Object.values(activityLogs).filter(l => l.volunteerId === currentUser.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Welcome back, {volunteer?.firstName}!
        </h1>
        <p className="text-xl text-gray-600">Here's your volunteer activity overview</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody className="text-center">
            <Clock className="w-10 h-10 mx-auto mb-2 text-primary-500" />
            <div className="text-3xl font-bold text-gray-900">{volunteer?.totalHours || 0}</div>
            <div className="text-gray-600">Total Hours</div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="text-center">
            <Calendar className="w-10 h-10 mx-auto mb-2 text-secondary-500" />
            <div className="text-3xl font-bold text-gray-900">{upcomingAssignments.length}</div>
            <div className="text-gray-600">Upcoming</div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="text-center">
            <Award className="w-10 h-10 mx-auto mb-2 text-accent-500" />
            <div className="text-3xl font-bold text-gray-900">{myLogs.length}</div>
            <div className="text-gray-600">Activities</div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody className="text-center">
            <TrendingUp className="w-10 h-10 mx-auto mb-2 text-green-500" />
            <div className="text-3xl font-bold text-gray-900">{volunteer?.status}</div>
            <div className="text-gray-600">Status</div>
          </CardBody>
        </Card>
      </div>

      {/* Upcoming Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold">Upcoming Assignments</h2>
          </CardHeader>
          <CardBody>
            {upcomingAssignments.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No upcoming assignments</p>
                <Link to="/assignments">
                  <Button>Browse Assignments</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {upcomingAssignments.slice(0, 5).map(assignment => (
                  <div key={assignment.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">{assignment.taskType}</div>
                    <div className="text-sm text-gray-600">
                      {formatDate(assignment.date)} • {assignment.startTime} - {assignment.endTime}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold">Recent Activity</h2>
          </CardHeader>
          <CardBody>
            {myLogs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">No activity logged yet</p>
                <Link to="/log-hours">
                  <Button>Log Hours</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {myLogs.slice(0, 5).map(log => (
                  <div key={log.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium">{log.taskType}</div>
                    <div className="text-sm text-gray-600">
                      {formatDate(log.date)} • {log.hoursWorked} hours
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

// Made with Bob

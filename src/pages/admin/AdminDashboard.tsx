import React from 'react';
import { Link } from 'react-router-dom';
import { Users, MapPin, Calendar, Activity } from 'lucide-react';
import { Card, CardBody } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { useStore } from '@/store/useStore';

const AdminDashboard: React.FC = () => {
  const { volunteers, sites, assignments, activityLogs } = useStore();
  
  const stats = {
    volunteers: Object.keys(volunteers).length,
    sites: Object.keys(sites).length,
    assignments: Object.keys(assignments).length,
    totalHours: Object.values(volunteers).reduce((sum, v) => sum + v.totalHours, 0),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardBody className="text-center">
            <Users className="w-10 h-10 mx-auto mb-2 text-primary-500" />
            <div className="text-3xl font-bold">{stats.volunteers}</div>
            <div className="text-gray-600">Volunteers</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <MapPin className="w-10 h-10 mx-auto mb-2 text-secondary-500" />
            <div className="text-3xl font-bold">{stats.sites}</div>
            <div className="text-gray-600">Sites</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <Calendar className="w-10 h-10 mx-auto mb-2 text-accent-500" />
            <div className="text-3xl font-bold">{stats.assignments}</div>
            <div className="text-gray-600">Assignments</div>
          </CardBody>
        </Card>
        <Card>
          <CardBody className="text-center">
            <Activity className="w-10 h-10 mx-auto mb-2 text-green-500" />
            <div className="text-3xl font-bold">{stats.totalHours}</div>
            <div className="text-gray-600">Total Hours</div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardBody>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link to="/admin/volunteers"><Button className="w-full">Manage Volunteers</Button></Link>
              <Link to="/admin/sites"><Button className="w-full" variant="secondary">Manage Sites</Button></Link>
              <Link to="/admin/assignments"><Button className="w-full" variant="outline">Manage Assignments</Button></Link>
              <Link to="/admin/reports"><Button className="w-full" variant="outline">View Reports</Button></Link>
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardBody>
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-2 text-sm text-gray-600">
              {Object.values(activityLogs).slice(0, 5).map(log => {
                const volunteer = volunteers[log.volunteerId];
                return (
                  <div key={log.id} className="p-2 bg-gray-50 rounded">
                    {volunteer?.firstName} logged {log.hoursWorked} hours
                  </div>
                );
              })}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;

// Made with Bob

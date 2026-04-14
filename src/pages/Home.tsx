import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine, Users, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Card, CardBody } from '@/components/common/Card';
import { useStore } from '@/store/useStore';

const Home: React.FC = () => {
  const { sites, volunteers, assignments } = useStore();
  
  const stats = {
    sites: Object.keys(sites).length,
    volunteers: Object.keys(volunteers).length,
    upcomingAssignments: Object.values(assignments).filter(
      a => a.status === 'scheduled' && new Date(a.date) >= new Date()
    ).length,
    totalHours: Object.values(volunteers).reduce((sum, v) => sum + v.totalHours, 0),
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Growing Greener Communities Together
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join our community of dedicated volunteers caring for trees and green spaces
              across our city. Make a difference, one tree at a time.
            </p>
            <div className="flex justify-center space-x-4">
              <Link to="/login">
                <Button size="lg" variant="secondary">
                  Get Started
                </Button>
              </Link>
              <Link to="/sites">
                <Button size="lg" variant="outline" className="bg-white text-primary-500 border-white hover:bg-gray-100">
                  Explore Sites
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardBody>
              <TreePine className="w-12 h-12 mx-auto mb-4 text-primary-500" />
              <div className="text-3xl font-bold text-gray-900">{stats.sites}</div>
              <div className="text-gray-600">Active Sites</div>
            </CardBody>
          </Card>
          <Card className="text-center">
            <CardBody>
              <Users className="w-12 h-12 mx-auto mb-4 text-secondary-500" />
              <div className="text-3xl font-bold text-gray-900">{stats.volunteers}</div>
              <div className="text-gray-600">Volunteers</div>
            </CardBody>
          </Card>
          <Card className="text-center">
            <CardBody>
              <Calendar className="w-12 h-12 mx-auto mb-4 text-accent-500" />
              <div className="text-3xl font-bold text-gray-900">{stats.upcomingAssignments}</div>
              <div className="text-gray-600">Upcoming Events</div>
            </CardBody>
          </Card>
          <Card className="text-center">
            <CardBody>
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-500" />
              <div className="text-3xl font-bold text-gray-900">{stats.totalHours.toLocaleString()}</div>
              <div className="text-gray-600">Hours Contributed</div>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join our community and start making a difference in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-primary-600">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
            <p className="text-gray-600">
              Create your volunteer profile and tell us about your skills and availability
            </p>
          </div>

          <div className="text-center">
            <div className="bg-secondary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-secondary-600">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose Activities</h3>
            <p className="text-gray-600">
              Browse available sites and sign up for tree care activities that match your schedule
            </p>
          </div>

          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Make an Impact</h3>
            <p className="text-gray-600">
              Participate in activities, log your hours, and watch your impact grow
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our community of volunteers and help us create a greener future
          </p>
          <Link to="/login">
            <Button size="lg">
              Become a Volunteer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

// Made with Bob

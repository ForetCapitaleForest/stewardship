import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, TreePine, User, Calendar } from 'lucide-react';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { useStore } from '@/store/useStore';

const SiteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { sites, volunteers, assignments } = useStore();
  
  const site = id ? sites[id] : null;
  const coordinator = site?.coordinatorId ? volunteers[site.coordinatorId] : null;
  const siteAssignments = Object.values(assignments).filter(a => a.siteId === id);

  if (!site) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardBody>
            <p className="text-center text-gray-600 py-8">Site not found</p>
            <div className="text-center">
              <Link to="/sites">
                <Button>Back to Sites</Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link to="/sites" className="text-primary-500 hover:text-primary-600">
          ← Back to Sites
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <h1 className="text-3xl font-bold text-gray-900">{site.name}</h1>
            </CardHeader>
            <CardBody>
              <p className="text-gray-700 mb-6">{site.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin size={20} className="mr-2" />
                    <span className="font-medium">Location</span>
                  </div>
                  <p className="text-gray-700 ml-7">
                    {site.address}<br />
                    {site.city}, {site.province}<br />
                    {site.postalCode}
                  </p>
                </div>
                
                <div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <TreePine size={20} className="mr-2" />
                    <span className="font-medium">Trees</span>
                  </div>
                  <p className="text-gray-700 ml-7">{site.treeCount} trees</p>
                </div>
              </div>
            </CardBody>
          </Card>

          {siteAssignments.length > 0 && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Upcoming Activities</h2>
              </CardHeader>
              <CardBody>
                <div className="space-y-3">
                  {siteAssignments.slice(0, 5).map(assignment => (
                    <div key={assignment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Calendar size={20} className="mr-3 text-gray-400" />
                        <div>
                          <div className="font-medium">{assignment.taskType}</div>
                          <div className="text-sm text-gray-600">
                            {new Date(assignment.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <Link to="/assignments">
                        <Button size="sm">View</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardBody>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {coordinator && (
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">Site Coordinator</h2>
              </CardHeader>
              <CardBody>
                <div className="flex items-center">
                  <User size={40} className="mr-3 text-gray-400" />
                  <div>
                    <div className="font-medium">
                      {coordinator.firstName} {coordinator.lastName}
                    </div>
                    <div className="text-sm text-gray-600">{coordinator.email}</div>
                  </div>
                </div>
              </CardBody>
            </Card>
          )}

          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Site Information</h2>
            </CardHeader>
            <CardBody>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-600">Type</dt>
                  <dd className="text-gray-900 capitalize">{site.siteType.replace('-', ' ')}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-600">Status</dt>
                  <dd className="text-gray-900 capitalize">{site.status}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-600">Size</dt>
                  <dd className="text-gray-900">{site.size} acres</dd>
                </div>
              </dl>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SiteDetail;

// Made with Bob

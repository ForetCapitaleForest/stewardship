import React from 'react';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import { useStore } from '@/store/useStore';

const SiteManagement: React.FC = () => {
  const { sites } = useStore();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Site Management</h1>
      <Card>
        <CardHeader><h2 className="text-2xl font-semibold">All Sites</h2></CardHeader>
        <CardBody>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trees</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Object.values(sites).map(site => (
                  <tr key={site.id}>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">{site.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">{site.siteType.replace('-', ' ')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{site.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{site.treeCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap capitalize">{site.status}</td>
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

export default SiteManagement;

// Made with Bob

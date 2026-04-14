import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, TreePine, User } from 'lucide-react';
import { Card, CardBody } from '@/components/common/Card';
import { useStore } from '@/store/useStore';
import { SITE_TYPES } from '@/utils/constants';

const Sites: React.FC = () => {
  const { sites, volunteers } = useStore();
  const [filter, setFilter] = React.useState<string>('all');
  const [search, setSearch] = React.useState('');

  const siteList = Object.values(sites);
  
  const filteredSites = siteList.filter(site => {
    const matchesFilter = filter === 'all' || site.siteType === filter;
    const matchesSearch = search === '' || 
      site.name.toLowerCase().includes(search.toLowerCase()) ||
      site.city.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Tree Care Sites</h1>
        <p className="text-xl text-gray-600">
          Explore our network of urban forestry sites across the city
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search sites..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">All Types</option>
          {SITE_TYPES.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
      </div>

      {/* Sites Grid */}
      {filteredSites.length === 0 ? (
        <Card>
          <CardBody>
            <p className="text-center text-gray-600 py-8">
              No sites found. {search && 'Try adjusting your search.'}
            </p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map(site => {
            const coordinator = site.coordinatorId ? volunteers[site.coordinatorId] : null;
            const siteTypeLabel = SITE_TYPES.find(t => t.value === site.siteType)?.label || site.siteType;
            
            return (
              <Link key={site.id} to={`/sites/${site.id}`}>
                <Card className="h-full hover:shadow-xl transition-shadow">
                  <CardBody>
                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                        {siteTypeLabel}
                      </span>
                      {site.status === 'seasonal' && (
                        <span className="inline-block ml-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                          Seasonal
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {site.name}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {site.description}
                    </p>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin size={16} className="mr-2 text-gray-400" />
                        <span>{site.city}</span>
                      </div>
                      <div className="flex items-center">
                        <TreePine size={16} className="mr-2 text-gray-400" />
                        <span>{site.treeCount} trees</span>
                      </div>
                      {coordinator && (
                        <div className="flex items-center">
                          <User size={16} className="mr-2 text-gray-400" />
                          <span>{coordinator.firstName} {coordinator.lastName}</span>
                        </div>
                      )}
                    </div>
                  </CardBody>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Sites;

// Made with Bob

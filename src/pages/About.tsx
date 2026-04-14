import React from 'react';
import { Card, CardBody } from '@/components/common/Card';

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">About Stewardship</h1>
      
      <div className="space-y-6">
        <Card>
          <CardBody>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              Stewardship is dedicated to fostering community engagement in urban forestry and 
              environmental conservation. We connect passionate volunteers with tree care opportunities 
              across our city, creating greener, healthier communities for everyone.
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="text-2xl font-semibold mb-4">What We Do</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                <span>Coordinate volunteer tree planting and maintenance activities</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                <span>Manage multiple urban forestry sites across the city</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                <span>Provide training and resources for volunteers</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                <span>Track and celebrate the impact of volunteer contributions</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-500 mr-2">•</span>
                <span>Build community connections through environmental stewardship</span>
              </li>
            </ul>
          </CardBody>
        </Card>

        <Card>
          <CardBody>
            <h2 className="text-2xl font-semibold mb-4">Get Involved</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Whether you're an experienced arborist or just starting your journey in environmental 
              conservation, there's a place for you in our community. Join us in making our city 
              greener, one tree at a time.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Sign up today to start volunteering, or contact us to learn more about partnership 
              opportunities.
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default About;

// Made with Bob

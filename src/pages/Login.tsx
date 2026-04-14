import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, CardHeader } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { useStore } from '@/store/useStore';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { volunteers, setCurrentUser } = useStore();
  const [email, setEmail] = React.useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple demo login - find volunteer by email
    const volunteer = Object.values(volunteers).find(v => v.email === email);
    
    if (volunteer) {
      setCurrentUser(volunteer.id, volunteer.role);
      navigate('/dashboard');
    } else {
      alert('Volunteer not found. Please check your email or sign up.');
    }
  };

  // Demo accounts for testing
  const demoAccounts = Object.values(volunteers).slice(0, 3);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-gray-600">Sign in to your volunteer account</p>
        </div>

        <Card>
          <CardBody>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="label">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-field"
                  placeholder="your.email@example.com"
                />
              </div>

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </CardBody>
        </Card>

        {demoAccounts.length > 0 && (
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Demo Accounts</h3>
            </CardHeader>
            <CardBody>
              <p className="text-sm text-gray-600 mb-4">
                Click to login with a demo account:
              </p>
              <div className="space-y-2">
                {demoAccounts.map(volunteer => (
                  <button
                    key={volunteer.id}
                    onClick={() => {
                      setCurrentUser(volunteer.id, volunteer.role);
                      navigate('/dashboard');
                    }}
                    className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <div className="font-medium">{volunteer.firstName} {volunteer.lastName}</div>
                    <div className="text-sm text-gray-600">{volunteer.email} - {volunteer.role}</div>
                  </button>
                ))}
              </div>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Login;

// Made with Bob

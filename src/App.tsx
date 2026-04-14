import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from '@/components/common/Navigation';

// Pages
import Home from '@/pages/Home';
import About from '@/pages/About';
import Sites from '@/pages/Sites';
import SiteDetail from '@/pages/SiteDetail';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Assignments from '@/pages/Assignments';
import LogHours from '@/pages/LogHours';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import VolunteerManagement from '@/pages/admin/VolunteerManagement';
import SiteManagement from '@/pages/admin/SiteManagement';
import AssignmentManagement from '@/pages/admin/AssignmentManagement';
import Reports from '@/pages/admin/Reports';

function App() {
  return (
    <BrowserRouter basename="/stewardship">
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/sites" element={<Sites />} />
            <Route path="/sites/:id" element={<SiteDetail />} />
            <Route path="/login" element={<Login />} />
            
            {/* Volunteer routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/log-hours" element={<LogHours />} />
            
            {/* Admin routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/volunteers" element={<VolunteerManagement />} />
            <Route path="/admin/sites" element={<SiteManagement />} />
            <Route path="/admin/assignments" element={<AssignmentManagement />} />
            <Route path="/admin/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

// Made with Bob

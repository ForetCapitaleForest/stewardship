# Implementation Guide - Quick Reference

## Project Setup Commands

```bash
# Initialize Vite + React + TypeScript project
npm create vite@latest . -- --template react-ts

# Install core dependencies
npm install react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install UI and utility libraries
npm install @headlessui/react
npm install lucide-react
npm install react-hook-form zod @hookform/resolvers
npm install date-fns
npm install zustand  # or use Context API

# Install dev dependencies
npm install -D @types/node
npm install -D @testing-library/react @testing-library/jest-dom vitest
```

## Project Structure

```
stewardship/
├── public/
│   └── assets/
│       └── images/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── Navigation.tsx
│   │   ├── volunteers/      # Volunteer-specific components
│   │   ├── sites/           # Site-specific components
│   │   ├── assignments/     # Assignment components
│   │   └── admin/           # Admin components
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Sites.tsx
│   │   ├── SiteDetail.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Profile.tsx
│   │   ├── Assignments.tsx
│   │   ├── LogHours.tsx
│   │   └── admin/
│   │       ├── AdminDashboard.tsx
│   │       ├── VolunteerManagement.tsx
│   │       ├── SiteManagement.tsx
│   │       └── Reports.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useVolunteers.ts
│   │   ├── useSites.ts
│   │   └── useAssignments.ts
│   ├── store/               # State management
│   │   ├── authStore.ts
│   │   ├── volunteerStore.ts
│   │   ├── siteStore.ts
│   │   └── assignmentStore.ts
│   ├── types/               # TypeScript types
│   │   ├── volunteer.ts
│   │   ├── site.ts
│   │   ├── assignment.ts
│   │   └── activity.ts
│   ├── utils/               # Utility functions
│   │   ├── storage.ts       # localStorage helpers
│   │   ├── validation.ts    # Form validation
│   │   ├── formatting.ts    # Date/number formatting
│   │   └── constants.ts     # App constants
│   ├── services/            # Data services
│   │   ├── volunteerService.ts
│   │   ├── siteService.ts
│   │   ├── assignmentService.ts
│   │   └── activityService.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .github/
│   └── workflows/
│       └── deploy.yml       # GitHub Actions workflow
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
├── package.json
└── README.md
```

## Vite Configuration for GitHub Pages

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/stewardship/', // Replace with your repo name
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
```

## GitHub Actions Deployment Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
  
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## Sample Data Models (TypeScript)

```typescript
// src/types/volunteer.ts
export interface Volunteer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  joinDate: Date;
  status: 'active' | 'inactive' | 'pending';
  role: 'volunteer' | 'coordinator' | 'admin';
  skills: string[];
  totalHours: number;
  avatarUrl?: string;
}

// src/types/site.ts
export interface Site {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  postalCode: string;
  siteType: 'park' | 'street' | 'community-garden' | 'natural-area';
  treeCount: number;
  coordinatorId?: string;
  status: 'active' | 'seasonal' | 'inactive';
  imageUrl?: string;
}

// src/types/assignment.ts
export interface Assignment {
  id: string;
  siteId: string;
  date: Date;
  startTime: string;
  endTime: string;
  taskType: string;
  description: string;
  maxVolunteers: number;
  assignedVolunteerIds: string[];
  status: 'scheduled' | 'completed' | 'cancelled';
}

// src/types/activity.ts
export interface ActivityLog {
  id: string;
  volunteerId: string;
  siteId: string;
  assignmentId?: string;
  date: Date;
  hoursWorked: number;
  taskType: string;
  description: string;
  verified: boolean;
  verifiedBy?: string;
}
```

## localStorage Service Example

```typescript
// src/services/storage.ts
const STORAGE_KEY = 'stewardship_data';

export interface AppData {
  volunteers: Record<string, Volunteer>;
  sites: Record<string, Site>;
  assignments: Record<string, Assignment>;
  activityLogs: Record<string, ActivityLog>;
  currentUser: {
    id: string;
    role: 'volunteer' | 'coordinator' | 'admin';
  } | null;
}

export const storage = {
  get: (): AppData => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : getDefaultData();
  },
  
  set: (data: AppData): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  },
  
  clear: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  },
};

function getDefaultData(): AppData {
  return {
    volunteers: {},
    sites: {},
    assignments: {},
    activityLogs: {},
    currentUser: null,
  };
}
```

## Routing Setup Example

```typescript
// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sites from './pages/Sites';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
// ... other imports

function App() {
  return (
    <BrowserRouter basename="/stewardship">
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sites" element={<Sites />} />
        <Route path="/sites/:id" element={<SiteDetail />} />
        
        {/* Volunteer routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/log-hours" element={<LogHours />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/volunteers" element={<VolunteerManagement />} />
        <Route path="/admin/sites" element={<SiteManagement />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Tailwind Configuration

```javascript
// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9f4',
          100: '#dcf2e4',
          500: '#2D5016',
          600: '#234010',
          700: '#1a300c',
        },
        secondary: {
          500: '#4A90E2',
        },
      },
    },
  },
  plugins: [],
}
```

## Development Workflow

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Build for Production**
   ```bash
   npm run build
   ```

3. **Preview Production Build**
   ```bash
   npm run preview
   ```

4. **Run Tests**
   ```bash
   npm run test
   ```

## Deployment Steps

1. **Initial Setup**
   - Create GitHub repository
   - Enable GitHub Pages in Settings → Pages
   - Set source to "GitHub Actions"

2. **Push Code**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Automatic Deployment**
   - GitHub Actions will automatically build and deploy
   - Check Actions tab for deployment status
   - Site will be live at: `https://[username].github.io/stewardship/`

## Testing Checklist

- [ ] All pages load without errors
- [ ] Navigation works correctly
- [ ] Forms validate properly
- [ ] Data persists in localStorage
- [ ] Responsive design works on mobile
- [ ] All user roles have appropriate access
- [ ] Search and filter functionality works
- [ ] Date/time displays correctly
- [ ] Images load properly
- [ ] No console errors

## Performance Optimization Tips

1. Use React.lazy() for code splitting
2. Optimize images (WebP format, proper sizing)
3. Implement virtual scrolling for long lists
4. Memoize expensive computations
5. Use production build for deployment
6. Enable compression in hosting
7. Minimize bundle size

## Common Issues & Solutions

**Issue**: Routes don't work after deployment
**Solution**: Ensure `basename` is set correctly in BrowserRouter

**Issue**: Images not loading
**Solution**: Use relative paths and place in public folder

**Issue**: localStorage data lost
**Solution**: Implement data export/import feature

**Issue**: Mobile layout broken
**Solution**: Test with mobile-first approach, use Tailwind responsive classes

## Next Steps After Deployment

1. Monitor GitHub Actions for successful deployments
2. Test all functionality on live site
3. Gather user feedback
4. Iterate and improve based on usage
5. Plan for backend integration if needed
6. Consider PWA features for offline support
7. Implement analytics to track usage

## Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [React Hook Form](https://react-hook-form.com/)
- [Headless UI](https://headlessui.com/)
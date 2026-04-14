# 🌳 Stewardship - Tree Care Volunteer Management System

A modern, React-based web application for managing tree care volunteers across multiple sites. Built for non-profit organizations to coordinate volunteer activities, track hours, and manage urban forestry sites.

## ✨ Features

### For Volunteers
- 📝 Easy registration and profile management
- 📅 Browse and sign up for tree care assignments
- ⏱️ Log volunteer hours and activities
- 📊 Track personal contribution statistics
- 🏆 View achievements and impact

### For Coordinators
- 🗺️ Manage assigned sites
- 📋 Create and schedule assignments
- ✅ Verify volunteer hours
- 📈 View site-specific reports

### For Administrators
- 👥 Comprehensive volunteer management
- 🌲 Site management and coordination
- 📊 Analytics and reporting dashboard
- 📤 Data export capabilities
- ⚙️ System configuration

## 🚀 Technology Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Date Handling**: date-fns
- **Deployment**: GitHub Pages

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/stewardship.git
   cd stewardship
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
stewardship/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── public/                     # Static assets
├── src/
│   ├── components/
│   │   ├── common/            # Reusable UI components
│   │   ├── volunteers/        # Volunteer-specific components
│   │   ├── sites/             # Site-specific components
│   │   └── admin/             # Admin components
│   ├── pages/                 # Page components
│   │   ├── admin/             # Admin pages
│   │   ├── Home.tsx
│   │   ├── Sites.tsx
│   │   └── ...
│   ├── store/                 # Zustand state management
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Utility functions
│   ├── App.tsx               # Main app component
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
```

## 🎯 Usage

### Demo Accounts

The application comes pre-loaded with sample data. Use these demo accounts to explore different roles:

**Admin Account:**
- Email: `sarah.johnson@example.com`
- Role: Admin (full access)

**Coordinator Account:**
- Email: `michael.chen@example.com`
- Role: Coordinator (site management)

**Volunteer Account:**
- Email: `emily.rodriguez@example.com`
- Role: Volunteer (basic access)

### Key Workflows

#### As a Volunteer:
1. Log in with your credentials
2. Browse available sites and assignments
3. Sign up for shifts that match your schedule
4. Log hours after completing activities
5. View your contribution statistics

#### As a Coordinator:
1. Manage your assigned sites
2. Create new assignments
3. Verify volunteer hours
4. View site-specific reports

#### As an Administrator:
1. Access the admin dashboard
2. Manage all volunteers and sites
3. Create and assign coordinators
4. View comprehensive analytics
5. Export data for reporting

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 🚀 Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

1. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Set source to "GitHub Actions"

2. **Push to main branch**
   ```bash
   git push origin main
   ```

3. **Automatic deployment**
   - GitHub Actions will automatically build and deploy
   - Site will be available at: `https://[username].github.io/stewardship/`

### Custom Domain (Optional)

To use a custom domain:
1. Add a `CNAME` file to the `public/` directory with your domain
2. Configure DNS settings with your domain provider
3. Update the `base` in `vite.config.ts` if needed

## 💾 Data Management

### Local Storage

The application uses browser localStorage for data persistence. Data includes:
- Volunteer profiles
- Site information
- Assignments
- Activity logs

### Data Export/Import

Administrators can export all data as JSON for backup purposes through the admin settings.

### Future Backend Integration

The application is designed to easily integrate with a backend API. Key integration points:
- Replace localStorage calls in `src/utils/storage.ts`
- Update store actions in `src/store/useStore.ts`
- Add authentication service
- Implement real-time updates

## 🎨 Customization

### Branding

Update colors in `tailwind.config.js`:
```javascript
colors: {
  primary: { /* Your primary color palette */ },
  secondary: { /* Your secondary color palette */ },
}
```

### Configuration

Key configuration files:
- `vite.config.ts` - Build and deployment settings
- `tailwind.config.js` - Styling and theme
- `src/utils/constants.ts` - Application constants

## 🧪 Testing

```bash
# Run tests (when implemented)
npm run test
```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Support

For support, please open an issue in the GitHub repository or contact the development team.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- UI components from [Headless UI](https://headlessui.com/)
- Icons from [Lucide](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

Made with 💚 for environmental stewardship

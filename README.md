# Re-Sift

AI-powered recruitment platform that analyzes job descriptions and candidate CVs to generate comprehensive match reports.

## Overview

Re-Sift bridges the gap between recruiters and candidates by using AI to analyze and match job descriptions with candidate resumes. The platform provides detailed compatibility scores, insights, and recommendations to streamline the hiring process.

## Features

### Landing Page
- Modern landing page with hero section and feature highlights
- User type selection modal (Recruiter / Candidate)
- Pricing section with tiered plans

### Recruiter Dashboard
- **Dashboard Home**: Overview stats, recent scans, activity calendar
- **Candidates Management**: View and manage candidate profiles
- **Companies Management**: Track and manage company profiles
- **Candidate Scan**: AI-powered analysis of candidate CVs against job descriptions
- **AI Chat**: Interactive chat interface for recruitment insights

### Candidate Dashboard
- Personalized dashboard for candidates
- Profile management
- Job matching and application tracking

### Onboarding Flows
- Recruiter onboarding with company setup
- Candidate onboarding with profile creation

### UI/UX Features
- Dark/Light theme support
- Custom cursor effects
- Responsive design
- Smooth animations and transitions

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Chakra UI
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Animations**: Framer Motion (implied by smooth transitions)

## Project Structure

```
src/
├── components/
│   ├── analysis/       # AI analysis components
│   ├── dashboard/      # Dashboard-specific components
│   ├── layout/         # Layout components (Navbar, Footer, etc.)
│   ├── pricing/        # Pricing section components
│   └── ui/             # Reusable UI components
├── config/             # Configuration files (Stripe, etc.)
├── context/            # React Context providers
├── data/               # Mock data and constants
├── lib/                # Utility functions
├── pages/              # Page components
│   └── dashboard/      # Dashboard sub-pages
└── App.tsx             # Main application component
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables

Create a `.env` file with required credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key
```

## Current Status

### Implemented
- [x] Landing page with user selection
- [x] Recruiter dashboard with stats and management
- [x] Candidate management interface
- [x] Company management interface
- [x] AI-powered candidate scan feature
- [x] AI chat interface for insights
- [x] Candidate dashboard
- [x] Onboarding flows for both user types
- [x] Dark/Light theme support
- [x] Responsive design
- [x] Pricing section

### Future Scope

#### Phase 1: Core Features
- [ ] Full user authentication system
- [ ] Real CV/Resume parsing (PDF, DOCX)
- [ ] Job description parser
- [ ] Advanced AI matching algorithm
- [ ] Email integration for notifications

#### Phase 2: Enhanced Features
- [ ] Video interview scheduling
- [ ] Candidate rating and feedback system
- [ ] Interview pipeline management
- [ ] Team collaboration features
- [ ] Candidate database search with filters

#### Phase 3: Advanced Features
- [ ] Resume builder integration
- [ ] Skills taxonomy and mapping
- [ ] Salary range predictions
- [ ] Market trends analytics
- [ ] ATS (Applicant Tracking System) integration

#### Phase 4: Enterprise
- [ ] Multi-company support
- [ ] Custom branding options
- [ ] API access for third-party integrations
- [ ] Advanced reporting and analytics
- [ ] SSO/SAML authentication

## API Integration

The frontend is designed to work with a backend API at `/rsftapi/`. Currently using mock data for demonstration.

Required backend endpoints:
- `POST /api/auth/login`
- `POST /api/auth/register`
- `GET /api/candidates`
- `POST /api/candidates/scan`
- `GET /api/companies`
- `POST /api/analysis/generate`

## License

Private - All rights reserved

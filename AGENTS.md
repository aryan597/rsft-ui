# AGENTS.md - Developer Guidelines for rsft-ui

This file provides guidelines for agentic coding agents working on the rsft-ui project. It is a React/TypeScript/Vite application using Chakra UI and Tailwind CSS.

## Build, Lint, and Test Commands

### Available npm Scripts

```bash
npm run dev          # Start development server
npm run start        # Start dev server on port 10000 (production-like)
npm run build        # Build for production
npm run lint         # Run ESLint on entire codebase
```

### Running a Single Test

**Note:** This project currently has no test suite configured. If adding tests, use Vitest or React Testing Library:

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm test --run          # Run all tests
npm test --run --filter "ComponentName"  # Run specific test file
```

To add testing, update package.json:
```json
"test": "vitest",
"test:run": "vitest run"
```

## Code Style Guidelines

### TypeScript Configuration

The project uses strict TypeScript with these key settings:
- **Strict mode enabled** - all strict type-checking flags are on
- **ES2020 target** - modern JavaScript features
- **moduleResolution: bundler** - for Vite compatibility

Always define proper types. Avoid `any`.

### Import Conventions

```typescript
// React imports first
import React, { useState, useEffect } from 'react';

// External libraries
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Internal components
import Navbar from './components/layout/Navbar';
import { ThemeProvider } from './context/ThemeContext';

// Utilities and config
import { cn } from './lib/utils';
```

### Component Patterns

Use functional components with TypeScript interfaces for props:

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
```

### Naming Conventions

- **Components**: PascalCase (e.g., `Navbar`, `AuthModal`, `PricingCard`)
- **Files**: PascalCase for components (e.g., `Navbar.tsx`), camelCase for utilities (e.g., `utils.ts`)
- **Hooks**: camelCase starting with `use` (e.g., `useAuth`, `useTheme`)
- **Interfaces**: PascalCase (e.g., `User`, `AuthContextType`)
- **Constants**: SCREAMING_SNAKE_CASE for configuration values

### Context Pattern

Follow the React Context pattern with custom hooks:

```typescript
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Context implementation
  return (
    <AuthContext.Provider value={{ /* values */ }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

### Error Handling

Use try-catch blocks with proper error logging:

```typescript
const signInWithProvider = async (provider: string) => {
  try {
    setIsLoading(true);
    // Async operations
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  } finally {
    setIsLoading(false);
  }
};
```

### React Hooks Rules

- Always include dependency arrays in `useEffect`
- Clean up subscriptions/timeouts in cleanup functions
- Use `useState` with proper typing: `const [user, setUser] = useState<User | null>(null);`

### Styling

The project uses Tailwind CSS with Chakra UI. Use utility classes for styling:

```tsx
<div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col transition-colors duration-200">
  <button className="bg-primary text-primary-foreground shadow hover:bg-primary/90">
```

For component variants, use class-variance-authority (already installed):

```typescript
import { cva, type VariantProps } from "class-variance-authority";
```

### ESLint Rules

The project enforces:
- React Hooks rules (exhaustive deps)
- React Refresh (warns on non-constant exports)
- TypeScript recommended rules

Run lint before committing:
```bash
npm run lint
```

### Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI components (Button, Loader, etc.)
│   ├── layout/       # Layout components (Navbar, Footer, etc.)
│   ├── auth/         # Auth-related components
│   ├── dashboard/   # Dashboard-specific components
│   └── analysis/    # Analysis/AI features
├── context/          # React Context providers
├── lib/              # Utilities (utils.ts, supabase.ts)
├── pages/            # Page components (Landing, Dashboard, etc.)
├── config/           # Configuration files
└── data/            # Static data and constants
```

### Vite Configuration

- Base path: `/rsft-ui/`
- Dev server port: 10000
- Proxy configured for `/rsftapi/` requests

### Important Notes

- The project uses Chakra UI v3 and should use its component patterns
- Supabase and Stripe are configured but use mock data in some places
- Routes are prefixed with `/rsft-ui/` (e.g., `/rsft-ui/dashboard`)
- Dark mode is supported via ThemeContext

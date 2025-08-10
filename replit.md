# replit.md

## Overview

This is a React-based mountain hiking treasure hunt application called "Môle Adventures." The app provides an immersive mobile experience for organizing treasure hunts during hikes on Môle Mountain (Haute-Savoie, France). Users progress through chapters containing puzzles with riddles, clues, and challenges while exploring mountain trails. The application features multilingual support (French/English), real-time progress tracking, and an interactive puzzle-solving system with hints and scoring.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React 18** with TypeScript for type safety and modern React features
- **Vite** as the build tool and development server for fast compilation and hot reloading
- **Wouter** for client-side routing instead of React Router, providing a lightweight navigation solution
- **TanStack Query** for server state management, caching, and data synchronization
- **Tailwind CSS** with custom CSS variables for responsive styling and theming
- **Shadcn/ui** component library built on Radix UI primitives for consistent, accessible UI components

### Component Structure
- Custom hooks for language management (`useLanguage`) and game state (`useGameState`)
- Context providers for global state management (language preferences, game progress)
- Reusable UI components with consistent styling patterns
- Modal system for hints, confirmations, and user interactions

### State Management Pattern
- React Context for global application state (language, game progress)
- Local component state for UI interactions and form handling
- Session storage for temporary game session data
- Local storage for persistent user preferences and game progress

### Backend Architecture
- **Express.js** server with TypeScript for API endpoints and middleware
- **Drizzle ORM** for database operations with PostgreSQL dialect
- In-memory storage implementation with fallback database integration
- RESTful API design with proper error handling and response formatting

### API Design
- `/api/missions` - Mission management and retrieval
- `/api/missions/validate-code` - Access code validation for unlocking content
- `/api/game-progress` - Progress tracking and persistence
- `/api/contact` - User feedback and communication

### Game Logic Architecture
- Chapter-based progression system with puzzle dependencies
- Score calculation based on completion time and hints used
- Hint system with limited usage tracking
- Puzzle validation with immediate feedback

### Styling System
- CSS custom properties for consistent theming across components
- Mountain-themed color palette with semantic color naming
- Responsive design patterns optimized for mobile devices
- Gradient backgrounds and visual effects for immersive experience

### Development Workflow
- Hot module replacement for rapid development iterations
- TypeScript strict mode for enhanced code quality
- Modular component architecture for maintainability
- Shared schema definitions between client and server

## External Dependencies

### Database
- **PostgreSQL** with Drizzle ORM for data persistence
- **@neondatabase/serverless** for cloud database connectivity
- Database schema includes missions, game progress, users, and contact messages

### UI and Styling
- **Radix UI** component primitives for accessible, unstyled components
- **Tailwind CSS** for utility-first styling approach
- **Lucide React** for consistent iconography
- **Class Variance Authority** for component variant management

### Development Tools
- **Vite** build tool with React plugin and development server
- **ESBuild** for production bundle optimization
- **TypeScript** for static type checking and enhanced developer experience
- **PostCSS** with Autoprefixer for CSS processing

### State and Data Management
- **TanStack React Query** for server state management and caching
- **React Hook Form** with Zod resolvers for form validation
- **Zod** for runtime type validation and schema definition

### Utility Libraries
- **date-fns** for date manipulation and formatting
- **clsx** and **tailwind-merge** for conditional CSS class management
- **nanoid** for unique identifier generation

### Development Environment
- **Replit** integration with cartographer plugin for development
- Runtime error overlay for enhanced debugging experience
- Custom Vite plugins for development workflow optimization
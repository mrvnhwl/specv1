# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (runs Next.js dev server on localhost:3000)
- **Build for production**: `npm run build`
- **Start production server**: `npm run start`
- **Lint code**: `npm run lint`
- **Install dependencies**: `npm install`

## Code Architecture & Structure

### Overall Project Structure
- **app/**: Contains all route definitions using Next.js 14 App Router
  - `(auth)/login/page.tsx`: Login page scaffold
  - `(dashboard)/`: Protected routes requiring authentication
    - `chat/page.tsx`: Upgrade assistant chat UI
    - `devices/page.tsx`: Device profile management
    - `recommendations/page.tsx`: Game recommendation engine
  - `app/api/`: Serverless functions for backend logic
    - `detect/route.ts`: Browser device scanning endpoint
    - `recommend/route.ts`: Game recommendation scoring
    - `chat/route.ts`: Chat assistant logic
- **components/**: Reusable UI components
  - `navbar.tsx`: Navigation bar used in layout
  - `device-scan-card.tsx`: Device specification display and confirmation
  - `genre-picker.tsx`: Genre selection with custom "Other" input
  - `game-card.tsx`: Individual game recommendation display
  - `game-carousel.tsx`: Horizontal scrolling game recommendations
  - `chat-panel.tsx`: Chat interface for upgrade assistant
- **lib/**: Utility functions and Supabase client configuration
- **data/**: Static data or mock data files
- **supabase/**: Database schema and migration files

### Key Technologies & Patterns
- **Next.js 14**: Using App Router with server components by default
- **TypeScript**: Strict typing throughout (.tsx files)
- **Tailwind CSS**: Utility-first styling (globals.css, tailwind.config.ts)
- **Supabase**: Backend-as-a-service for auth, database, and storage
  - Database schema defined in supabase/ migrations
  - Client configured in lib/supabase.ts (check for existence)
- **Device Detection**: Uses `@pmndrs/detect-gpu` for browser-based hardware scanning
- **AI Integration**: 
  - Google Generative AI (`@google/generative-ai`) for recommendation logic
  - OpenAI (`openai`) for chat assistant features

### Important Limitations & Considerations
- Browser-based device detection has limitations (see README.md): Cannot reliably read exact CPU/GPU/RAM/machine name on all devices
- Users must confirm or complete missing device specifications manually
- Authentication flow uses Supabase Auth (check app/(auth)/login/page.tsx)
- Game recommendations combine device specs with user genre preferences using scoring algorithm

### Environment Setup
- Copy `.env.example` to `.env.local` and fill in Supabase URL and anon key
- Required environment variables: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### File Conventions
- Components use PascalCase naming (e.g., GameCard.tsx)
- API routes follow Next.js App Router pattern (route.ts files)
- Styles use Tailwind utility classes in JSX
- TypeScript interfaces/types defined near usage or in dedicated files when shared
# GameWise

GameWise is a Next.js + Supabase starter app for recommending PC games based on a user's saved device profiles and favorite genres.

## Included MVP features

- Responsive gamer-themed UI
- Login page scaffold
- Browser-side device scan with manual confirmation support
- Multiple device profiles per user
- Genre preference picker with `Other` custom input
- Recommendation scoring based on specs + preferences
- Game cards ready for Steam metadata mapping
- Upgrade assistant chat UI with starter logic
- Supabase SQL schema for users, devices, preferences, games, and chat logs

## Important limitation

A browser cannot reliably read exact CPU model, GPU model, RAM total, and local machine name on every device. This project detects what is reasonably available in-browser and then lets the user confirm or complete missing specs.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase

## Run locally

```bash
npm install
npm run dev
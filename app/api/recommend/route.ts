import { NextResponse } from 'next/server';
import { scoreGames } from '@/lib/recommender';

export async function POST(request: Request) {
  const { device, preferences } = await request.json();
  const results = scoreGames(device, preferences);
  return NextResponse.json({ results });
}

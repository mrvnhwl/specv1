import { NextResponse } from 'next/server';
import { scoreGames } from '@/lib/recommender';

export async function POST(request: Request) {
  try {
    const { device = {}, preferences = {} } = await request.json();
    const normalizedPreferences = {
      genres: [],
      modes: [],
      freeToPlayOnly: false,
      lowStorageOnly: false,
      indieOnly: false,
      storyFocused: false,
      ...preferences
    };
    const results = await scoreGames(device, normalizedPreferences);
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Recommendation request failed:', error);
    return NextResponse.json(
      { error: 'Unable to generate recommendations right now.' },
      { status: 500 }
    );
  }
}
import { GameEntry } from '@/lib/types';

const RAWG_API_KEY = process.env.RAWG_API_KEY;
const RAWG_API_URL = 'https://api.rawg.io/api';

/**
 * Fetch game details from RAWG API
 */
export async function fetchRawgGameDetails(gameName: string): Promise<any> {
  if (!RAWG_API_KEY) {
    console.warn('RAWG API key not configured');
    return null;
  }

  try {
    const response = await fetch(
      `${RAWG_API_URL}/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(gameName)}&page_size=1`
    );

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      return data.results[0];
    }

    return null;
  } catch (error) {
    console.error(`Error fetching RAWG game details for ${gameName}:`, error);
    return null;
  }
}

/**
 * Enhance game entry with RAWG data
 */
export async function enhanceGameWithRawgData(game: GameEntry): Promise<GameEntry> {
  if (!game.title) {
    return game;
  }

  try {
    const rawgData = await fetchRawgGameDetails(game.title);

    if (!rawgData) {
      return game;
    }

    // Enhance the game with RAWG data
    return {
      ...game,
      rawgRating: Math.round((rawgData.rating ?? 0) * 20),
      // Use RAWG's description if available and better
      shortDescription: rawgData.description_raw || game.shortDescription,
      // Use RAWG's background image if available
      image: rawgData.background_image || game.image,
      // Add RAWG-specific fields
      rawgData: {
        ...rawgData,
        // RAWG rating (0-5 scale, convert to 0-100)
        rawgRating: Math.round((rawgData.rating ?? 0) * 20),
        // Ratings breakdown
        ratings: rawgData.ratings || [],
        // Added/updated dates
        added: rawgData.added,
        updated: rawgData.updated,
        // ESRB rating
        esrbRating: rawgData.esrb_rating?.name || null,
        // Platforms
        platforms: rawgData.platforms?.map((p: any) => p.platform.name) || [],
        // Genres from RAWG
        rawgGenres: rawgData.genres?.map((g: any) => g.name) || [],
        // Tags from RAWG
        rawgTags: rawgData.tags?.map((t: any) => t.name) || [],
      }
    };
  } catch (error) {
    console.error(`Error enhancing game ${game.title} with RAWG data:`, error);
    return game;
  }
}
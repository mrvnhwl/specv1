import { GameEntry } from '@/lib/types';

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_API_URL = 'https://api.steampowered.com';
const STEAM_STORE_URL = 'https://store.steampowered.com/api';

/**
 * Fetch game details from Steam Web API
 */
export async function fetchSteamGameDetails(appId: number): Promise<any> {
  if (!STEAM_API_KEY) {
    console.warn('Steam API key not configured');
    return null;
  }

  try {
    // Get basic app info
    const appInfoResponse = await fetch(
      `${STEAM_STORE_URL}/appdetails/?appids=${appId}&l=english`
    );

    const appInfoData = await appInfoResponse.json();

    if (!appInfoData[appId] || !appInfoData[appId].success) {
      return null;
    }

    const appData = appInfoData[appId].data;

    // Get additional details like news
    const newsResponse = await fetch(
      `${STEAM_API_URL}/ISteamNews/GetNewsForApp/v0002/?appid=${appId}&count=3&maxlength=300&format=json&key=${STEAM_API_KEY}`
    );

    const newsData = await newsResponse.json();

    return {
      ...appData,
      steamNews: newsData.appnews?.newsitems || [],
      steamAppId: appId
    };
  } catch (error) {
    console.error(`Error fetching Steam game details for appId ${appId}:`, error);
    return null;
  }
}

/**
 * Fetch multiple game details in batch
 */
export async function fetchSteamGamesDetails(appIds: number[]): Promise<Record<number, any>> {
  if (!STEAM_API_KEY || appIds.length === 0) {
    return {};
  }

  try {
    // Steam store API supports multiple app IDs
    const idsParam = appIds.join(',');
    const response = await fetch(
      `${STEAM_STORE_URL}/appdetails/?appids=${idsParam}&l=english`
    );

    const data = await response.json();

    // Filter successful responses
    const results: Record<number, any> = {};
    for (const appId of appIds) {
      if (data[appId] && data[appId].success) {
        results[appId] = {
          ...data[appId].data,
          steamAppId: appId
        };
      }
    }

    return results;
  } catch (error) {
    console.error('Error fetching Steam games details:', error);
    return {};
  }
}

/**
 * Get user's owned games (requires Steam OpenID login)
 * This would be implemented after adding Steam authentication
 */
export async function getUserOwnedGames(steamId: string): Promise<any[]> {
  if (!STEAM_API_KEY || !steamId) {
    return [];
  }

  try {
    const response = await fetch(
      `${STEAM_API_URL}/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${steamId}&format=json`
    );

    const data = await response.json();
    return data.response?.games || [];
  } catch (error) {
    console.error('Error fetching user owned games:', error);
    return [];
  }
}

/**
 * Enhance game entry with Steam data
 */
export async function enhanceGameWithSteamData(game: GameEntry): Promise<GameEntry> {
  if (!game.steamAppId || game.steamAppId === 0) {
    return game;
  }

  try {
    const steamData = await fetchSteamGameDetails(game.steamAppId);

    if (!steamData) {
      return game;
    }

    // Enhance the game with Steam data
    return {
      ...game,
      // Use Steam's official description if available and better
      shortDescription: steamData.about_the_game || game.shortDescription,
      // Use Steam's header image if available
      image: steamData.header_image || game.image,
      // Add Steam-specific fields
      steamData: {
        ...steamData,
        isFree: steamData.is_free ?? game.isFree,
        // Better rating from Steam (if available)
        steamRating: steamData.metacritic?.score ?? game.rating,
        // Genres from Steam
        steamGenres: steamData.genres?.map((g: any) => g.description) || [],
        // Categories/tags from Steam
        steamCategories: steamData.categories?.map((c: any) => c.description) || [],
      }
    };
  } catch (error) {
    console.error(`Error enhancing game ${game.title} with Steam data:`, error);
    return game;
  }
}
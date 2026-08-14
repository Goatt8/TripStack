import { db } from '../db.js';

export function getLocationCities(country: string) {
  return db.prepare(`
    SELECT
      country,
      city,
      fallback_map_image_url AS mapImageUrl,
      map_center_lat AS mapCenterLat,
      map_center_lon AS mapCenterLon
    FROM location_presets
    WHERE country = ?
    ORDER BY sort_order ASC, city ASC
  `).all(country);
}

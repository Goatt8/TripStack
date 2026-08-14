import { mysqlPool } from '../database/mysql.js';

export async function getLocationCities(country: string) {
  const [rows] = await mysqlPool.execute(`
    SELECT
      country,
      city,
      fallback_map_image_url AS mapImageUrl,
      map_center_lat AS mapCenterLat,
      map_center_lon AS mapCenterLon
    FROM location_presets
    WHERE country = ?
    ORDER BY sort_order ASC, city ASC
  `, [country]);

  return rows;
}

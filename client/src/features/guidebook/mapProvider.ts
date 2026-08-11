type GuidebookMapSource = {
  mapCenterLat?: number | null;
  mapCenterLon?: number | null;
  mapImageUrl: string;
};

const geoapifyApiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;

export function getGuidebookMapImageUrl(source: GuidebookMapSource) {
  if (
    !geoapifyApiKey
    || typeof source.mapCenterLat !== 'number'
    || typeof source.mapCenterLon !== 'number'
  ) {
    return source.mapImageUrl;
  }

  const params = new URLSearchParams({
    apiKey: geoapifyApiKey,
    center: `lonlat:${source.mapCenterLon},${source.mapCenterLat}`,
    height: '540',
    style: 'osm-bright',
    width: '900',
    zoom: '11',
  });

  params.set('marker', `lonlat:${source.mapCenterLon},${source.mapCenterLat};color:blue;size:medium`);

  return `https://maps.geoapify.com/v1/staticmap?${params.toString()}`;
}

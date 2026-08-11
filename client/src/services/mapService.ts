import { request } from '@/services/apiClient';

export type MapPreview = {
  country: string;
  mapCenterLat: number | null;
  mapCenterLon: number | null;
  mapImageUrl: string;
  provider: 'geoapify' | 'local';
  region: string;
};

export const mapService = {
  getMapPreview(params: {
    country: string;
    fallbackLat?: number | null;
    fallbackLon?: number | null;
    fallbackMapImageUrl: string;
    region: string;
  }) {
    const query = new URLSearchParams({
      country: params.country,
      fallbackMapImageUrl: params.fallbackMapImageUrl,
      region: params.region,
    });

    if (typeof params.fallbackLat === 'number') {
      query.set('fallbackLat', String(params.fallbackLat));
    }

    if (typeof params.fallbackLon === 'number') {
      query.set('fallbackLon', String(params.fallbackLon));
    }

    return request<MapPreview>(`/maps/preview?${query.toString()}`);
  },
};

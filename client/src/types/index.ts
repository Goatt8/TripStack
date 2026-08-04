export type Role = 'creator' | 'consumer';

export type User = {
  id: number;
  username: string;
  role: Role;
  bio: string;
  avatarUrl: string;
  followerCount: number;
  trustScore: number;
  createdAt: string;
};

export type Guidebook = {
  id: number;
  creatorId: number;
  creatorName: string;
  title: string;
  country: string;
  region: string;
  coverImageUrl: string;
  mapImageUrl: string;
  printCount: number;
  price: number;
  rankInRegion: number;
  followerCount: number;
  trustScore: number;
  blockCount: number;
  routePoints: GuidebookRoutePoint[];
};

export type GuidebookRoutePoint = {
  id: number;
  guidebookId?: number;
  pointOrder: number;
  title: string;
  x: number;
  y: number;
};

export type GuidebookBlock = {
  id: number;
  guidebookId: number;
  stepOrder: number;
  placeName: string;
  content: string;
  imageUrl: string;
};

export type OrderStatus = 'pending' | 'processing' | 'completed';

export type Order = {
  id: number;
  consumerId: number;
  consumerName: string;
  guidebookId: number;
  guidebookTitle: string;
  selectedLayoutType: string;
  status: OrderStatus;
  shippingMemo: string;
  createdAt: string;
};

export type PrintCartItem = {
  id: number;
  userId: number;
  guidebookId: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  creatorId: number;
  creatorName: string;
  title: string;
  country: string;
  region: string;
  coverImageUrl: string;
  printCount: number;
  price: number;
};

export type RegionOption = {
  id: string;
  label: string;
};

export type LayoutOption = {
  id: string;
  label: string;
  description: string;
};

export type LocationCityOption = {
  id: string;
  label: string;
  description: string;
};

export type LocationCountryOption = {
  id: string;
  label: string;
  cities: LocationCityOption[];
};

export type SearchKeywordOption = {
  id: string;
  label: string;
};

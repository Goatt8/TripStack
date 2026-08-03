import { currentAccount } from '@/features/account/currentAccount';

export const BASKET_GUIDEBOOK_EVENT_NAME = 'tripstack:basket-guidebooks-changed';

const BASKET_GUIDEBOOK_STORAGE_KEY = `tripstack.${currentAccount.role}.${currentAccount.creatorId}.basketGuidebookIds`;

function normalizeGuidebookIds(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is number => Number.isInteger(item));
}

export function readBasketGuidebookIds() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    return normalizeGuidebookIds(JSON.parse(window.localStorage.getItem(BASKET_GUIDEBOOK_STORAGE_KEY) ?? '[]'));
  } catch {
    return [];
  }
}

export function writeBasketGuidebookIds(guidebookIds: number[]) {
  if (typeof window === 'undefined') {
    return guidebookIds;
  }

  const uniqueGuidebookIds = [...new Set(guidebookIds)];
  window.localStorage.setItem(BASKET_GUIDEBOOK_STORAGE_KEY, JSON.stringify(uniqueGuidebookIds));
  window.dispatchEvent(new CustomEvent(BASKET_GUIDEBOOK_EVENT_NAME, { detail: uniqueGuidebookIds }));
  return uniqueGuidebookIds;
}

export function addBasketGuidebookId(guidebookId: number) {
  return writeBasketGuidebookIds([...readBasketGuidebookIds(), guidebookId]);
}

export function removeBasketGuidebookId(guidebookId: number) {
  return writeBasketGuidebookIds(readBasketGuidebookIds().filter((item) => item !== guidebookId));
}

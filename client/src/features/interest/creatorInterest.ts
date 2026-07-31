import { currentAccount } from '@/features/account/currentAccount';

export const INTERESTED_CREATOR_EVENT_NAME = 'tripstack:interested-creators-changed';

const INTERESTED_CREATOR_STORAGE_KEY = `tripstack.${currentAccount.role}.${currentAccount.creatorId}.interestedCreatorIds`;

function normalizeCreatorIds(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is number => Number.isInteger(item));
}

export function readInterestedCreatorIds() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    return normalizeCreatorIds(JSON.parse(window.localStorage.getItem(INTERESTED_CREATOR_STORAGE_KEY) ?? '[]'));
  } catch {
    return [];
  }
}

export function writeInterestedCreatorIds(creatorIds: number[]) {
  if (typeof window === 'undefined') {
    return creatorIds;
  }

  const uniqueCreatorIds = [...new Set(creatorIds)];
  window.localStorage.setItem(INTERESTED_CREATOR_STORAGE_KEY, JSON.stringify(uniqueCreatorIds));
  window.dispatchEvent(new CustomEvent(INTERESTED_CREATOR_EVENT_NAME, { detail: uniqueCreatorIds }));
  return uniqueCreatorIds;
}

export function addInterestedCreatorId(creatorId: number) {
  return writeInterestedCreatorIds([...readInterestedCreatorIds(), creatorId]);
}

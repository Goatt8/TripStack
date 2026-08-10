export const INTERESTED_CREATOR_EVENT_NAME = 'tripstack:interested-creators-changed';

function getInterestedCreatorStorageKey(userId: number) {
  return `tripstack.user.${userId}.interestedCreatorIds`;
}

function normalizeCreatorIds(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is number => Number.isInteger(item));
}

export function readInterestedCreatorIds(userId: number | null | undefined) {
  if (typeof window === 'undefined') {
    return [];
  }

  if (!userId) {
    return [];
  }

  try {
    return normalizeCreatorIds(JSON.parse(window.localStorage.getItem(getInterestedCreatorStorageKey(userId)) ?? '[]'));
  } catch {
    return [];
  }
}

export function writeInterestedCreatorIds(userId: number | null | undefined, creatorIds: number[]) {
  if (typeof window === 'undefined') {
    return creatorIds;
  }

  if (!userId) {
    return [];
  }

  const uniqueCreatorIds = [...new Set(creatorIds)];
  window.localStorage.setItem(getInterestedCreatorStorageKey(userId), JSON.stringify(uniqueCreatorIds));
  window.dispatchEvent(new CustomEvent(INTERESTED_CREATOR_EVENT_NAME, { detail: uniqueCreatorIds }));
  return uniqueCreatorIds;
}

export function addInterestedCreatorId(userId: number | null | undefined, creatorId: number) {
  return writeInterestedCreatorIds(userId, [...readInterestedCreatorIds(userId), creatorId]);
}

export function removeInterestedCreatorId(userId: number | null | undefined, creatorId: number) {
  return writeInterestedCreatorIds(userId, readInterestedCreatorIds(userId).filter((id) => id !== creatorId));
}

export function toggleInterestedCreatorId(userId: number | null | undefined, creatorId: number) {
  const creatorIds = readInterestedCreatorIds(userId);

  if (creatorIds.includes(creatorId)) {
    return writeInterestedCreatorIds(userId, creatorIds.filter((id) => id !== creatorId));
  }

  return writeInterestedCreatorIds(userId, [...creatorIds, creatorId]);
}

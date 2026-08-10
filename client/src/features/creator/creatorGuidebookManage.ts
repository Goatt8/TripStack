function getDeletedGuidebookStorageKey(userId: number) {
  return `tripstack.user.${userId}.deletedGuidebookIds`;
}

function normalizeGuidebookIds(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is number => Number.isInteger(item));
}

function readGuidebookIds(storageKey: string) {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    return normalizeGuidebookIds(JSON.parse(window.localStorage.getItem(storageKey) ?? '[]'));
  } catch {
    return [];
  }
}

function writeGuidebookIds(storageKey: string, guidebookIds: number[]) {
  if (typeof window === 'undefined') {
    return guidebookIds;
  }

  const uniqueGuidebookIds = [...new Set(guidebookIds)];
  window.localStorage.setItem(storageKey, JSON.stringify(uniqueGuidebookIds));
  return uniqueGuidebookIds;
}

export function readDeletedGuidebookIds(userId: number | null | undefined) {
  if (!userId) {
    return [];
  }

  return readGuidebookIds(getDeletedGuidebookStorageKey(userId));
}

export function addDeletedGuidebookId(userId: number | null | undefined, guidebookId: number) {
  if (!userId) {
    return [];
  }

  return writeGuidebookIds(getDeletedGuidebookStorageKey(userId), [...readDeletedGuidebookIds(userId), guidebookId]);
}

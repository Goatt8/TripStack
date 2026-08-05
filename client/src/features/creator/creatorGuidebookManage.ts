import { currentAccount } from '@/features/account/currentAccount';

const DELETED_GUIDEBOOK_STORAGE_KEY = `tripstack.${currentAccount.role}.${currentAccount.creatorId}.deletedGuidebookIds`;

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

export function readDeletedGuidebookIds() {
  return readGuidebookIds(DELETED_GUIDEBOOK_STORAGE_KEY);
}

export function addDeletedGuidebookId(guidebookId: number) {
  return writeGuidebookIds(DELETED_GUIDEBOOK_STORAGE_KEY, [...readDeletedGuidebookIds(), guidebookId]);
}

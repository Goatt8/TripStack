import { cartService } from '@/services/cartService';

export const BASKET_GUIDEBOOK_EVENT_NAME = 'tripstack:basket-guidebooks-changed';

export function emitBasketGuidebookIds(guidebookIds: number[]) {
  if (typeof window === 'undefined') {
    return guidebookIds;
  }

  const uniqueGuidebookIds = [...new Set(guidebookIds)];
  window.dispatchEvent(new CustomEvent(BASKET_GUIDEBOOK_EVENT_NAME, { detail: uniqueGuidebookIds }));
  return uniqueGuidebookIds;
}

export async function readBasketGuidebookIds() {
  const items = await cartService.getItems();
  return items.map((item) => item.guidebookId);
}

export async function addBasketGuidebookId(guidebookId: number) {
  await cartService.addItem(guidebookId);
  return emitBasketGuidebookIds(await readBasketGuidebookIds());
}

export async function removeBasketGuidebookId(guidebookId: number) {
  await cartService.removeItem(guidebookId);
  return emitBasketGuidebookIds(await readBasketGuidebookIds());
}

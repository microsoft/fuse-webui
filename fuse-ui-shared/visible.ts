/**
 * is element inside the current browser viewport
 */
export function visible(element: HTMLElement): boolean {
  if (element) {
    const scrollX = document.documentElement.scrollLeft;
    const scrollY = document.documentElement.scrollTop;
    const rect = shiftRect(
      element.getBoundingClientRect(),
      { x: scrollX, y: window.scrollY });
    const top = scrollY;
    const left = scrollX;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const windowRect: ClientRect = {
      top, left, width, height,
      right: left + width,
      bottom: top + height
    };

    return intersects(rect, windowRect);
  }

  return false;
}

function shiftRect(rect: ClientRect, distance: { x: number; y: number }): ClientRect {
  return {
    top: rect.top + distance.y,
    bottom: rect.bottom + distance.y,
    left: rect.left + distance.x,
    right: rect.right + distance.x,
    width: rect.width,
    height: rect.height
  };
}

function intersects(r1: ClientRect, r2: ClientRect): boolean {
  const disjoined = r1.bottom < r2.top || r1.top > r2.bottom ||
    r1.right < r2.left || r1.left > r2.right;

  return !disjoined;
}

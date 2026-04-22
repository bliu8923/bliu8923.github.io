import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// motion/framer-motion uses IntersectionObserver for whileInView
class IntersectionObserverMock implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  constructor(
    _cb: IntersectionObserverCallback,
    _options?: IntersectionObserverInit
  ) {}
  disconnect() {}
  observe() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve() {}
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock);

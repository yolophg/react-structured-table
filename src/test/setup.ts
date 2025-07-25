import '@testing-library/jest-dom';

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};

Object.defineProperty(global.performance, 'memory', {
  value: {
    usedJSHeapSize: 1024 * 1024 * 10,
  },
  writable: true,
});

Element.prototype.scrollTo = vi.fn(); 
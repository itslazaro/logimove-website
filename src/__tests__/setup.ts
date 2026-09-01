import "@testing-library/jest-dom/vitest";

// Polyfill IntersectionObserver for jsdom (used by framer-motion useInView)
class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = [];
  callback: IntersectionObserverCallback;
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    MockIntersectionObserver.instances.push(this);
  }
  observe() {
    // Simulate element being in view
    this.callback(
      [{ isIntersecting: true, ratio: 1 } as unknown as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
  unobserve() {}
  disconnect() {}
}

globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;

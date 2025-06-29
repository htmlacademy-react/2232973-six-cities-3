import '@testing-library/jest-dom/vitest';
import { expect } from 'vitest';

expect.extend({
  toBeWithinRange(received, min, max) {
    return {
      pass: received >= min && received <= max,
      message: () => `Expected ${received} to be within ${min}-${max}`,
    };
  },
});

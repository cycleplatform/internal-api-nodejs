export {};
declare global {
  namespace jest {
    interface Matchers<R, T> {
      // toBeTypeOrNull(a: any): R;
    }
  }
}

expect.extend({
  toBeTypeOrNull(received, argument) {
    const pass = this.equals(received, expect.any(argument));
    if (pass || received === null) {
      return {
        message: () => `Ok`,
        pass: true,
      };
    } else {
      return {
        message: () => `expected ${received} to be ${argument} type or null`,
        pass: false,
      };
    }
  },
});

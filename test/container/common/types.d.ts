declare global {
  namespace jest {
    interface Matchers<R, T> {
      // toBeTypeOrNull(a: any): R;
    }
  }
}

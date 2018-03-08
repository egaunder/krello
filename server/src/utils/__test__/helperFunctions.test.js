import { isEmpty } from '../helperFunctions';

describe('isEmpty', () => {
  test('returns a boolena', () => {
    const result = isEmpty();
    expect(typeof result).toBe('boolean');
  });

  test('should return true if given truty value', () => {
    const result = isEmpty(true);
    expect(result).toBe(true);
  });

  test('should return false if passed null', () => {
    const result = isEmpty(null);
    expect(result).toBe(false);
  });

  test('should return true if passed false', () => {
    const result = isEmpty(false);
    expect(result).toBe(true);
  });
});

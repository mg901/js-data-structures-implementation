import { beforeEach, describe, expect, it } from 'vitest';
import { LFUCache } from './index';

describe('LFUCache', () => {
  let cache: LFUCache<string, number>;

  // Arrange
  beforeEach(() => {
    cache = new LFUCache(3);
  });

  it('returns initial state correctly', () => {
    expect(cache.size).toBe(0);
    expect(cache.toArray()).toBe([]);
  });

  describe('put', () => {
    it('increases the size when adding item', () => {
      // Act
      cache.put('one', 1);

      // Assert
      expect(cache.toArray()).toEqual([1]);
      expect(cache.size).toBe(1);
    });

    it(`doesn't increase size on the cache overflow`, () => {
      // Arrange
      cache.put('one', 1);
      cache.put('two', 2);
      cache.put('three', 3);

      // Act
      cache.put('four', 4);

      // Assert
      expect(cache.size).toBe(3);
    });

    it('overwrites the value of the key', () => {
      // Arrange
      cache.put('value', 1);

      // Act
      cache.put('value', 2);

      // Arrange
      expect(cache.toArray()).toEqual([2]);
      expect(cache.size).toBe(1);
    });
  });
});

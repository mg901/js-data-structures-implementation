import { beforeEach, describe, expect, it } from 'vitest';
import { Queue } from './index';

describe('Queue', () => {
  let queue: Queue<number>;

  // Arrange
  beforeEach(() => {
    queue = new Queue();
  });

  it('returns the initial state of the queue correctly', () => {
    // Act and Assert
    expect(queue).toBeDefined();
    expect(queue.isEmpty).toBeTruthy();
    expect(queue.size).toBe(0);
  });

  describe('toStringTag', () => {
    it('returns correct string representation', () => {
      expect(Object.prototype.toString.call(new Queue())).toBe(
        '[object Queue]',
      );
    });
  });

  describe('enqueue', () => {
    it('adds an element to the queue', () => {
      // Act
      queue.enqueue(10);

      // Assert
      expect(queue.size).toBe(1);
    });

    it('add multiple elements to the queue with ', () => {
      // Act
      queue.enqueue(10).enqueue(20).enqueue(30);

      // Assert
      expect(queue.toString()).toBe('10,20,30');
      expect(queue.size).toBe(3);
    });
  });

  describe('Iterator', () => {
    it('iterates through the elements', () => {
      // Arrange
      queue.enqueue(1).enqueue(2).enqueue(3);

      // Act
      const received = Array.from(queue, (item) => item);

      // Assert
      expect(received).toEqual([1, 2, 3]);
    });

    it('handles an empty list', () => {
      // Act and Assert
      expect(Array.from(queue)).toEqual([]);
    });
  });

  describe('dequeue', () => {
    it('removes and returns the front element from the queue', () => {
      // Arrange
      queue.enqueue(10).enqueue(20).enqueue(30);

      // Act
      const removedElement = queue.dequeue();

      // Assert
      expect(removedElement).toBe(10);
      expect(queue.toString()).toBe('20,30');
      expect(queue.size).toBe(2);
    });

    it('returns undefined when deleting an element on the empty queue', () => {
      // Act
      const removedElement = queue.dequeue();

      // Assert
      expect(removedElement).toBeUndefined();
      expect(queue.size).toBe(0);
    });
  });

  describe('peek', () => {
    it('returns the front element without removing it', () => {
      // Arrange
      queue.enqueue(10).enqueue(15);

      // Act
      const frontElement = queue.peek();

      // Assert
      expect(frontElement).toBe(10);
      expect(queue.toString()).toBe('10,15');
      expect(queue.size).toBe(2);
    });

    it('returns undefined for the empty list', () => {
      // Act
      const frontElement = queue.peek();

      // Assert
      expect(frontElement).toBeUndefined();
    });
  });

  describe('clear', () => {
    it('removes all elements from the queue', () => {
      // Arrange
      queue.enqueue(7);
      queue.enqueue(14);

      // Act
      queue.clear();

      // Assert
      expect(queue.isEmpty).toBeTruthy();
      expect(queue.size).toBe(0);
    });
  });
});

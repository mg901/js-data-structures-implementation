import { describe, beforeEach, it, expect } from 'vitest';
import { LinkedList } from './linked-list';

describe('LinkedList', () => {
  // @ts-expect-error
  let linkedList: LinkedList<number> = null;

  // Arrange
  beforeEach(() => {
    linkedList = new LinkedList();
  });

  it('returns the initial state of the list correctly', () => {
    // Assert
    expect(linkedList.head).toBeNull();
    expect(linkedList.tail).toBeNull();
    expect(linkedList.length).toBe(0);
  });

  describe('isEmpty', () => {
    it('returns true for the empty list', () => {
      // Assert
      expect(linkedList.isEmpty).toBeTruthy();
    });

    it('return false for the non-empty list', () => {
      linkedList.append(1);

      expect(linkedList.isEmpty).toBeFalsy();
    });
  });

  describe('toArray', () => {
    it('returns an empty array for the empty list', () => {
      // Act and Assert
      expect(linkedList.toArray()).toEqual([]);
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();
      expect(linkedList.length).toBe(0);
    });
  });

  describe('toString', () => {
    it('returns an empty string for the empty list', () => {
      // Act and Assert
      expect(linkedList.toString()).toBe('');
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();
      expect(linkedList.length).toBe(0);
    });
  });

  describe('append', () => {
    it('appends node to the empty list', () => {
      // Arrange
      linkedList.append(1);

      // Act and Assert
      expect(linkedList.head?.toString()).toBe('1');
      expect(linkedList.tail?.toString()).toBe('1');
      expect(linkedList.length).toBe(1);
    });

    it('appends nodes to the non-empty list', () => {
      // Act
      linkedList.append(1);
      linkedList.append(2);

      // Assert
      expect(linkedList.head?.toString()).toBe('1');
      expect(linkedList.tail?.toString()).toBe('2');
      expect(linkedList.length).toBe(2);
      expect(linkedList.toString()).toBe('1,2');
      expect(linkedList.tail?.next).toBeNull();
    });

    it('can be used in a call chain', () => {
      // Act
      linkedList.append(1).append(2).append(3);

      expect(linkedList.toString()).toBe('1,2,3');
      expect(linkedList.length).toBe(3);
    });
  });

  describe('prepend', () => {
    it('prepends a new node to the beginning of the empty list', () => {
      // Act
      linkedList.prepend(1);

      // Assert
      expect(linkedList.toString()).toBe('1');
      expect(linkedList.head?.toString()).toBe('1');
      expect(linkedList.tail?.toString()).toBe('1');
      expect(linkedList.tail?.next).toBeNull();
      expect(linkedList.length).toBe(1);
    });

    it('prepends a new node to the beginning of a non-empty list', () => {
      // Arrange
      linkedList.append(2).append(3);

      // Act
      linkedList.prepend(1);

      // Assert
      expect(linkedList.toString()).toBe('1,2,3');
      expect(linkedList.head?.toString()).toBe('1');
      expect(linkedList.tail?.toString()).toBe('3');
      expect(linkedList.tail?.next).toBeNull();
      expect(linkedList.length).toBe(3);
    });

    it('can be used in a call chain', () => {
      // Act
      linkedList.append(1).prepend(2);

      // Assert
      expect(linkedList.length).toBe(2);
      expect(linkedList.head?.value).toBe(2);
      expect(linkedList.tail?.value).toBe(1);
      expect(linkedList.tail?.next).toBeNull();
    });
  });

  describe('delete', () => {
    it('returns node from the empty list', () => {
      // Act
      expect(linkedList.delete(5)).toBeNull();

      // Assert
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();
      expect(linkedList.length).toBe(0);
    });

    it('deletes the element outside the list', () => {
      // Arrange
      linkedList.append(1).append(2);

      // Act
      const deletedElement = linkedList.delete(3);

      // Assert
      expect(deletedElement).toBeNull();
      expect(linkedList.head?.toString()).toBe('1');
      expect(linkedList.tail?.toString()).toBe('2');
      expect(linkedList.toString()).toBe('1,2');
      expect(linkedList.length).toBe(2);
    });

    it('deletes the node from the singular node list', () => {
      // Arrange
      linkedList.append(1);

      // Act
      const deletedElement = linkedList.delete(1)!;

      // Assert
      expect(deletedElement.toString()).toBe('1');
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();
      expect(linkedList.length).toBe(0);
    });

    it('deletes the first node from the multi-node list', () => {
      // Arrange
      linkedList.append(1).append(2).append(3);
      expect(linkedList.length).toBe(3);

      // Act
      const deletedNode = linkedList.delete(1)!;

      // Assert
      expect(deletedNode.toString()).toBe('1');
      expect(linkedList.head?.toString()).toBe('2');
      expect(linkedList.tail?.toString()).toBe('3');
      expect(linkedList.toString()).toEqual('2,3');
      expect(linkedList.length).toBe(2);
    });

    it('deletes an element in the middle', () => {
      // Arrange
      linkedList.append(1).append(2).append(3).append(4);

      // Act
      const deletedElement = linkedList.delete(2)!;

      // Assert
      expect(deletedElement.toString()).toBe('2');
      expect(linkedList.head?.toString()).toBe('1');
      expect(linkedList.tail?.toString()).toBe('4');
      expect(linkedList.toString()).toBe('1,3,4');
      expect(linkedList.length).toBe(3);
    });

    it('deletes the last element', () => {
      // Arrange
      linkedList.append(1).append(2).append(3);

      // Act
      const deletedElement = linkedList.delete(3)!;

      // Assert
      expect(deletedElement.toString()).toBe('3');
      expect(linkedList.head?.toString()).toBe('1');
      expect(linkedList.tail?.toString()).toBe('2');
      expect(linkedList.toString()).toBe('1,2');
      expect(linkedList.length).toBe(2);
    });
  });

  describe('reverse', () => {
    it('reverses the empty list', () => {
      // Act
      linkedList.reverse();

      // Assert
      expect(linkedList.toString()).toBe('');
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();
      expect(linkedList.toString()).toBe('');
      expect(linkedList.length).toBe(0);
    });

    it('it reverses the head of the singular node list', () => {
      // Arrange
      linkedList.append(1);

      // Act
      linkedList.reverse();

      // Assert
      expect(linkedList.head?.toString()).toBe('1');
      expect(linkedList.tail?.toString()).toBe('1');
      expect(linkedList.toString()).toBe('1');
    });

    it('reverses the list', () => {
      // Arrange
      linkedList.append(1).append(2).append(3);

      // Act
      linkedList.reverse();

      // Assert
      expect(linkedList.head?.toString()).toBe('3');
      expect(linkedList.tail?.toString()).toBe('1');
      expect(linkedList.toString()).toEqual('3,2,1');
      expect(linkedList.length).toBe(3);
    });

    it('can be used in a call chain', () => {
      // Arrange
      linkedList.append(1).append(2).append(3);

      // Act
      linkedList.reverse().append(4);

      // Assert
      expect(linkedList.head?.toString()).toBe('3');
      expect(linkedList.tail?.toString()).toBe('4');
      expect(linkedList.toString()).toBe('3,2,1,4');
      expect(linkedList.length).toBe(4);
    });
  });

  describe('insertAt', () => {
    it('throws exception if index less than list length', () => {
      // Act
      const result = () => linkedList.insertAt(-1, 1);

      // Assert
      expect(result).toThrow(
        'Index should be greater than or equal to 0 and less than or equal to the list length.',
      );
    });

    it('throws exception if index greater than list length', () => {
      // Act
      const result = () => linkedList.insertAt(10, 1);

      // Assert
      expect(result).toThrow(
        'Index should be greater than or equal to 0 and less than or equal to the list length.',
      );
    });

    it('inserts at the beginning of the list', () => {
      // Arrange
      expect(linkedList.length).toBe(0);
      expect(linkedList.toString()).toBe('');

      // Act
      linkedList.append(1);

      // Assert
      expect(linkedList.toString()).toBe('1');
      expect(linkedList.length).toBe(1);

      // Act
      linkedList.insertAt(0, 0);

      // Assert
      expect(linkedList.head?.toString()).toBe('0');
      expect(linkedList.tail?.toString()).toBe('1');
      expect(linkedList.toString()).toBe('0,1');
      expect(linkedList.length).toBe(2);
    });

    it('inserts at the end of the list', () => {
      // Arrange
      expect(linkedList.length).toBe(0);
      expect(linkedList.toString()).toBe('');

      // Act
      linkedList.append(1);

      // Assert
      expect(linkedList.toString()).toBe('1');
      expect(linkedList.length).toBe(1);

      // Act
      linkedList.insertAt(1, 2);

      // Assert
      expect(linkedList.head?.toString()).toBe('1');
      expect(linkedList.tail?.toString()).toBe('2');
      expect(linkedList.toString()).toBe('1,2');
      expect(linkedList.length).toBe(2);
    });

    it('inserts in the middle of the list', () => {
      // Arrange
      linkedList.append(1).append(2);

      // Act
      linkedList.append(4);

      // Assert
      expect(linkedList.toString()).toBe('1,2,4');
      expect(linkedList.length).toBe(3);

      // Act
      linkedList.insertAt(2, 3);

      // Assert
      expect(linkedList.head?.toString()).toBe('1');
      expect(linkedList.tail?.toString()).toBe('4');
      expect(linkedList.toString()).toBe('1,2,3,4');
      expect(linkedList.length).toBe(4);
    });

    it('can be used in a call chain', () => {
      // Arrange
      expect(linkedList.length).toBe(0);
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();

      // Act
      linkedList.insertAt(0, 1).insertAt(1, 2);

      // Assert
      expect(linkedList.length).toBe(2);
      expect(linkedList.toString()).toBe('1,2');
      expect(linkedList.head?.toString()).toBe('1');
      expect(linkedList.tail?.toString()).toBe('2');
    });
  });

  describe('deleteHead', () => {
    it('deletes the head from an empty list', () => {
      // Act and Assert
      expect(linkedList.deleteHead()).toBeNull();
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();
      expect(linkedList.length).toBe(0);
    });

    it('deletes the head from the list with multiple nodes', () => {
      // Arrange
      linkedList.append(1).append(2).append(3);

      // Act
      const deletedHead = linkedList.deleteHead();

      expect(deletedHead?.toString()).toBe('1');
      expect(linkedList.head?.toString()).toBe('2');
      expect(linkedList.tail?.toString()).toBe('3');
      expect(linkedList.length).toBe(2);
    });
  });

  describe('deleteTail', () => {
    it('deletes the tail from an empty list', () => {
      // Act and Assert
      expect(linkedList.deleteTail()).toBeNull();
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();
      expect(linkedList.length).toBe(0);
    });

    it('deletes the tail form the list with a single node', () => {
      linkedList.append(1);

      const deletedTail = linkedList.deleteTail();

      expect(deletedTail?.toString()).toBe('1');
      expect(linkedList.head).toBeNull();
      expect(linkedList.tail).toBeNull();
      expect(linkedList.length).toBe(0);
    });

    it('deletes the tail from the list with multiple nodes', () => {
      // Arrange
      linkedList.append(1).append(2).append(3);

      // Act
      const deletedTail = linkedList.deleteTail();

      // Assert
      expect(deletedTail?.toString()).toBe('3');
      expect(linkedList.head?.toString()).toBe('1');
      expect(linkedList.tail?.toString()).toBe('2');
    });
  });

  describe('indexOf', () => {
    // Arrange
    beforeEach(() => {
      // Act
      linkedList.append(1).append(2).append(3);
    });

    it('returns 0 if the index is at the head of the list', () => {
      // Act and Assert
      expect(linkedList.indexOf(1)).toBe(0);
    });

    it('returns the index of the given element if it exists in the list', () => {
      // Act and Assert
      expect(linkedList.indexOf(2)).toBe(1);
    });

    it("returns `-1` if the given element doesn't exist in the list", () => {
      // Act and Assert
      expect(linkedList.indexOf(4)).toBe(-1);
    });

    it('returns the index of the first occurrence of the given element', () => {
      // Arrange
      linkedList.append(2);

      // Act and Assert
      expect(linkedList.indexOf(2)).toBe(1);
    });

    it('returns `0` if the index is at the head of the list', () => {
      // Act and Assert
      expect(linkedList.indexOf(1)).toBe(0);
    });

    it('returns the index of the last element if the element is at the tail of the list', () => {
      // Act and Assert
      expect(linkedList.indexOf(3)).toBe(2);
    });

    describe('on an empty list', () => {
      it('returns `-1` for any element', () => {
        // Arrange
        const emptyList = new LinkedList<number>();

        // Act and Assert
        expect(emptyList.indexOf(1)).toBe(-1);
        expect(emptyList.indexOf(2)).toBe(-1);
        expect(emptyList.indexOf(3)).toBe(-1);
      });
    });
  });

  describe('fromArray', () => {
    it('creates an empty list when an empty array is passed', () => {
      // Act
      linkedList.fromArray([]);

      // Act and Assert
      expect(linkedList.isEmpty).toBeTruthy();
    });

    it('creates a list with the same nodes as the input array', () => {
      // Act
      linkedList.fromArray([1, 2, 3, 4]);

      // Act and Assert
      expect(linkedList.toString()).toBe('1,2,3,4');
    });
  });

  describe('find', () => {
    it('returns null for an empty list', () => {
      // Act and Assert
      expect(linkedList.find({ value: 1 })).toBeNull();
    });

    it('finds a node by value', () => {
      // Arrange
      linkedList.append(1).append(2);
      const foundedNode = linkedList.find({ value: 2 });

      // Act and Assert
      expect(foundedNode?.toString()).toBe('2');
    });

    it('finds a node by predicate', () => {
      // Arrange
      linkedList.append(1).append(2).append(3);

      const foundedNode = linkedList.find({
        predicate: (value) => value > 2,
      });

      // Act and Assert
      expect(foundedNode?.toString()).toBe('3');
    });

    it('returns null if a node is not found by value or predicate', () => {
      // Act and Assert
      expect(linkedList.find({ value: 3 })).toBeNull();
    });

    it('prioritizes predicate over value', () => {
      // Arrange
      linkedList.append(1).append(2);

      const foundedNode = linkedList.find({
        predicate: (value) => value > 1,
      });

      // Act and Assert
      expect(foundedNode?.toString()).toBe('2');
    });

    it('returns the first node if multiple nodes match the predicate', () => {
      // Arrange
      linkedList.append(1).append(2).append(3).append(4);

      const foundedNode = linkedList.find({
        predicate: (value) => value > 1,
      });

      // Act and Assert
      expect(foundedNode?.toString()).toBe('2');
    });
  });
});
import { Comparator } from '../../utils/comparator';
import type { CompareFunction } from '../../utils/comparator';
import { LinkedListNode } from '../linked-list-node';
// import type { Callback } from '../linked-list-node';

type NullableLinkedListNode<T = any> = LinkedListNode<T> | null;

interface BasicMethods<T> {
  toArray(): T[];
  toString(): string;
  append(value: T): this;
  prepend(value: T): this;
  reverse(): this;
  delete(value: T): NullableLinkedListNode<T>;
  insertAt(index: number, value: T): this;
  deleteHead(): NullableLinkedListNode<T>;
  deleteTail(): NullableLinkedListNode<T>;
}

export interface LinkedListType<T> extends BasicMethods<T> {
  readonly head: NullableLinkedListNode<T>;
  readonly tail: NullableLinkedListNode<T>;
  readonly length: number;
  readonly isEmpty: boolean;
}

export class LinkedList<T = any> implements LinkedListType<T> {
  #head: NullableLinkedListNode<T>;

  #tail: NullableLinkedListNode<T>;

  #length: number;

  #compare;

  constructor(compareFunction?: CompareFunction<T>) {
    this.#head = null;
    this.#tail = null;
    this.#length = 0;
    this.#compare = new Comparator(compareFunction);
  }

  get isEmpty() {
    return this.#head === null;
  }

  get head() {
    return this.#head;
  }

  get tail() {
    return this.#tail;
  }

  get length(): number {
    return this.#length;
  }

  toArray() {
    const array = [];
    let currentNode = this.#head;

    while (currentNode) {
      array.push(currentNode.value);
      currentNode = currentNode.next;
    }

    return array;
  }

  toString() {
    return this.toArray().toString();
  }

  append(value: T) {
    const newNode = new LinkedListNode(value);

    if (this.#length === 0) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      this.#tail!.next = newNode;
      this.#tail = newNode;
    }

    this.#length += 1;

    return this;
  }

  prepend(value: T) {
    const newNode = new LinkedListNode(value);

    if (this.#length === 0) {
      this.#head = newNode;
      this.#tail = newNode;
    } else {
      newNode.next = this.#head;
      this.#head = newNode;
    }

    this.#length += 1;

    return this;
  }

  delete(value: T) {
    if (this.#head === null) return null;

    let deletedNode = null as NullableLinkedListNode;

    // Deleting from the beginning of the list
    if (this.#compare.equal(value, this.#head.value)) {
      deletedNode = this.#head;
      this.#head = deletedNode.next;

      if (this.#head === null) {
        this.#tail = null;
      }
    } else {
      let currentNode = this.#head;

      while (
        currentNode.next &&
        !this.#compare.equal(value, currentNode.next.value)
      ) {
        currentNode = currentNode.next;
      }

      // Deleting the node from the middle
      if (currentNode.next !== null) {
        deletedNode = currentNode.next;
        currentNode.next = deletedNode?.next;

        // Deleting the last element
        if (currentNode.next === null) {
          this.#tail = currentNode;
        }
      }
    }

    if (deletedNode) {
      this.#length -= 1;
    }

    return deletedNode;
  }

  // delete(target: T) {
  //   if (this.#head === null) return null;

  //   let deletedNode = null as NullableLinkedListNode;

  //   // At beginning
  //   if (this.#compare.equal(target, this.#head.value)) {
  //     deletedNode = this.#head;
  //     this.#head = deletedNode.next;

  //     // If empty list
  //     if (this.#head === null) {
  //       this.#tail = null;
  //     }
  //   } else {
  //     // At the middle
  //     let currentNode = this.#head;
  //     while (
  //       currentNode.next &&
  //       !this.#compare.equal(target, currentNode.next.value)
  //     ) {
  //       currentNode = currentNode.next;
  //     }

  //     if (currentNode.next !== null) {
  //       deletedNode = currentNode.next;
  //       currentNode.next = deletedNode.next;

  //       // Delete last element
  //       if (currentNode.next === null) {
  //         this.#tail = currentNode;
  //       }
  //     }
  //   }

  //   if (deletedNode) {
  //     this.#length -= 1;
  //   }

  //   return deletedNode;
  // }

  reverse() {
    if (this.#head === null || this.#head.next === null) return this;

    let currentNode = this.#head as NullableLinkedListNode;
    let prevNode = null;

    while (currentNode) {
      const nextNode = currentNode.next;
      [currentNode.next, prevNode] = [prevNode, currentNode];

      currentNode = nextNode;
    }

    this.#tail = this.#head;
    this.#head = prevNode;

    return this;
  }

  #findNodeByIndex(index: number): LinkedListNode<T> {
    let currentNode = this.#head!;

    for (let i = 0; i < index; i += 1) {
      currentNode = currentNode.next!;
    }

    return currentNode;
  }

  insertAt(index: number, value: T): this {
    if (index < 0 || index > this.#length) {
      throw new Error(
        'Index should be greater than or equal to 0 and less than or equal to the list length.',
      );
    }

    if (index === 0) {
      this.prepend(value);
    } else if (index === this.#length) {
      this.append(value);
    } else {
      // in the middle
      const prevNode = this.#findNodeByIndex(index - 1);
      const newNode = new LinkedListNode(value);

      newNode.next = prevNode.next;
      prevNode.next = newNode;

      this.#length += 1;
    }

    return this;
  }

  deleteHead() {
    if (this.#head === null) return null;

    const deletedNode = this.#head;

    if (this.#head?.next) {
      this.#head = this.#head.next;
    } else {
      this.#head = null;
      this.#tail = null;
    }

    this.#length -= 1;

    return deletedNode;
  }

  deleteTail() {
    if (this.#head === null) return null;

    const deletedTail = this.#tail;

    // where is a single node
    if (this.#head === this.#tail) {
      this.#head = null;
      this.#tail = null;

      this.#length -= 1;

      return deletedTail;
    }

    // where are multiple nodes
    let currentNode = this.#head;

    while (currentNode?.next) {
      if (currentNode.next.next === null) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.#tail = currentNode;

    return deletedTail;
  }
}

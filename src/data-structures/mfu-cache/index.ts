import { DoublyLinkedList } from '../linked-lists/doubly-linked-list';
import { DoublyLinkedListNode } from '../linked-lists/doubly-linked-list/node';

interface IMFUCache<Key, Value> {
  get size(): number;
  get(key: Key): Value | null;
  put(key: Key, value: Value): this;
}

type Payload<Key, Value> = {
  key: Key;
  value: Value;
};

export class MFUCache<Key extends string | number | symbol, Value>
  implements IMFUCache<Key, Value>
{
  #capacity: number;

  #keyNodeMap = {} as Record<Key, DoublyLinkedListNode<Payload<Key, Value>>>;

  #keyFrequencyMap = {} as Record<Key, number>;

  #buckets = {} as Record<
    number,
    DoublyLinkedList<Payload<Key, Value>> | undefined
  >;

  #maxFrequency = 1;

  #size = 0;

  constructor(capacity: number) {
    this.#capacity = capacity;
  }

  get size(): number {
    return this.#size;
  }

  get(key: Key): Value | null {
    const keyNodeMap = this.#keyNodeMap;
    const freqMap = this.#keyFrequencyMap;

    if (!keyNodeMap[key]) return null;

    const oldFreq = freqMap[key];

    this.#deleteFromBuckets(key, oldFreq);
    this.#updateFrequencyByKey(key, oldFreq);

    const currentFreq = freqMap[key];
    this.#updateMaxFrequency(currentFreq);

    const node = keyNodeMap[key];
    this.#addToBuckets(key, node.data.value, currentFreq);

    return node.data.value as Value;
  }

  put(key: Key, value: Value): this {
    const freqMap = this.#keyFrequencyMap;

    // Overwrite the value by the key
    if (this.#keyNodeMap[key]) {
      const oldFreq = freqMap[key];

      this.#deleteFromBuckets(key, oldFreq);
      this.#size -= 1;

      this.#updateFrequencyByKey(key, oldFreq);
    }

    if (this.#size === this.#capacity) {
      this.#evictLeastFrequentKey();
    }

    // Add item
    const INITIAL_FREQUENCY = 1;
    freqMap[key] = freqMap[key] ?? INITIAL_FREQUENCY;

    const currentFreq = freqMap[key];
    this.#addToBuckets(key, value, currentFreq);

    this.#size += 1;

    return this;
  }

  // eslint-disable-next-line class-methods-use-this
  get [Symbol.toStringTag]() {
    return 'MFUCache';
  }

  #addToBuckets(key: Key, value: Value, freq: number): void {
    // Get or update DLL
    const dll =
      this.#buckets[freq] ?? new DoublyLinkedList<Payload<Key, Value>>();

    // Add Item to DLL
    dll.append({ key, value });

    // Update DLL
    this.#buckets[freq] = dll;

    // Update reference
    this.#keyNodeMap[key] = dll.tail!;
  }

  #deleteFromBuckets(key: Key, oldFreq: number): void {
    const bucket = this.#buckets[oldFreq];
    const node = this.#keyNodeMap[key];

    bucket?.deleteByRef(node);

    if (this.#buckets[oldFreq]!.isEmpty) {
      delete this.#buckets[oldFreq];
    }
  }

  #updateFrequencyByKey(key: Key, oldFreq: number): void {
    this.#keyFrequencyMap[key] = oldFreq + 1;
  }

  #evictLeastFrequentKey(): void {
    // Get the most frequently bucket
    const bucket = this.#buckets[this.#maxFrequency];

    // Delete item
    const deletedNode = bucket?.deleteTail()!;

    if (bucket?.isEmpty) {
      delete this.#buckets[this.#maxFrequency];
    }

    // Remove least frequent key
    delete this.#keyFrequencyMap[deletedNode.data.key];

    // Remove reverence to the mfu item;
    delete this.#keyNodeMap[deletedNode.data.key];

    // Decrease max frequency
    this.#maxFrequency -= 1;
    this.#size -= 1;
  }

  #updateMaxFrequency(freq: number): void {
    this.#maxFrequency = Math.max(this.#maxFrequency, freq);
  }
}

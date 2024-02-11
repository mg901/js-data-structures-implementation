import { BaseLinkedListNode } from '@/shared/base-linked-list-node';

export class DoublyLinkedListNode<T = any> extends BaseLinkedListNode<T> {
  constructor(
    public data: T,
    public next: DoublyLinkedListNode<T> | null = null,
    public prev: DoublyLinkedListNode<T> | null = null,
  ) {
    super(data, next);
    this.prev = prev;
  }
}

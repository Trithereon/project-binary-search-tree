// LinkedList class module.

export default class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  // adds a new node containing key and value props to the end of the list
  append(key, value) {
    const newNode = new Node(key, value);
    if (this.head === null) {
      this.head = newNode;
      // The list is now: head -> null.
    } else {
      // Start at the head, then traverse sequentially.
      let current = this.head;
      while (current.next !== null) {
        // Update "current" value to next node,
        // and its final value will be "tail",
        // where the next node is null
        current = current.next;
      }
      // Replace null with the new node, which defaults to
      // newNode -> null
      current.next = newNode;
    }
    this.length++;
    return;
  }

  // adds a new node containing key and value to the start of the list
  prepend(key, value) {
    const newNode = new Node(key, value);
    if (this.head === null) {
      this.head = newNode;
    } else {
      // Update pointer.
      newNode.next = this.head;
      // Take head node's place in the list.
      this.head = newNode;
    }
    this.length++;
    return;
  }

  // returns the total number of nodes in the list
  getSize() {
    return this.length;
  }

  // returns the first node in the list
  getHead() {
    return this.head;
  }

  // returns the last node in the list
  getTail() {
    let tail = this.head;
    while (tail.next !== null) {
      tail = tail.next;
    }
    return tail;
  }

  //  returns the node at the given index
  at(index) {
    let node = this.head;
    if (index === 0) {
      return node;
    } else if (index > this.length - 1 || index < 0) {
      return null;
    } else if (index > 0) {
      for (let i = 1; i <= index; i++) {
        node = node.next;
      }
      return node;
    }
  }

  // removes the last node from the list
  pop() {
    // Get before-last node.
    // Assign null to its next pointer.
    let penultimateNode = this.at(this.length - 2);
    penultimateNode.next = null;
    this.length--;
    return;
  }

  // returns true if the passed in value is in the list and otherwise returns false
  contains(value) {
    let node = this.head;
    if (node.value === value) return true;
    while (node.next !== null) {
      if (node.next.value === value) return true;
      else node = node.next;
    }
    return false;
  }

  // Returns true if containing the specified key.
  containsKey(key) {
    let node = this.head;
    // Check head.
    if (node && node.key === key) return true;

    // Check all other nodes.
    while (node && node.next) {
      if (node.next.key === key) return true;
      else node = node.next;
    }
    // If the key is not found in any nodes, return false.
    return false;
  }

  // Returns the node with key, otherwise returns null
  getNode(key) {
    let node = this.head;
    // Check head.
    if (node && node.key === key) return node;

    // Check all other nodes.
    while (node && node.next) {
      if (node.next.key === key) return node.next;
      else node = node.next;
    }
    // If the key is not found in any nodes, return false.
    return null;
  }

  // Returns an array of all keys in the list.
  getKeys() {
    let node = this.head;
    const keys = [];
    if (node) {
      keys.push(node.key);
      while (node.next) {
        keys.push(node.next.key);
        node = node.next;
      }
    }

    return keys;
  }

  // Returns an array of all values in the list.
  getValues() {
    let node = this.head;
    const values = [];
    if (node) {
      values.push(node.value);
      while (node.next) {
        values.push(node.next.value);
        node = node.next;
      }
    }
    return values;
  }

  // returns the index of the node containing value, or null if not found.
  indexOf(nodeArg) {
    let node = this.head;
    let counter = 0;
    if (JSON.stringify(node) === JSON.stringify(nodeArg)) return counter;
    while (node.next) {
      counter++;
      if (JSON.stringify(node.next) === JSON.stringify(nodeArg)) return counter;
      else node = node.next;
    }
  }

  // represents your LinkedList objects as strings,
  // so you can print them out and preview them in the console.
  toString() {
    let node = this.head;
    let string = `( ${node.value} )`;
    while (node.next) {
      string += ` -> ( ${node.next.value} )`;
      node = node.next;
    }
    string += " -> null";
    return string;
  }

  // inserts a new node with the provided value at the given index.
  insertAt(value, index) {
    // Create node and assign value.
    const newNode = new Node(value);
    // Get node placed before insertion position.
    const prevNode = this.at(index - 1);
    // Get node currently at insertion position.
    const next = this.at(index);
    // Update pointers.
    newNode.next = next;
    prevNode.next = newNode;
    this.length++;
  }

  // removes the node at the given index.
  removeAt(index) {
    if (index === 0) {
      this.head = this.head.next;
    } else {
      // Make prevNode point to next, skipping over the target node.
      const prevNode = this.at(index - 1);
      const next = this.at(index + 1);
      prevNode.next = next;
    }
    this.length--;
  }
}

class Node {
  constructor(key = null, value = null) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

// HashMap class module.
import LinkedList from "./linkedlist.js";

export default class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.baseCapacity = capacity;
    this.buckets = [];
    // Fill buckets with null as a placeholder.
    for (let i = 0; i < capacity; i++) {
      this.buckets.push(new LinkedList());
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      // Add the modulo to prevent number exceeding int limit and becoming inaccurate.
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const hashCode = this.hash(key);
    if (hashCode < 0 || hashCode >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[hashCode];

    // If key already exists, update its value.
    if (bucket.containsKey(key)) {
      const node = bucket.getNode(key);
      node.value = value;
    } else {
      // Create key and assign value to it.
      bucket.append(key, value);
    }
    // Note: if hashCode collision occurs, the bucket (linked list) will store multiple values.

    // If length exceeds load factor, double capacity.
    if (this.length() > this.capacity * this.loadFactor) this.doubleCap();
  }

  doubleCap() {
    const newElementsCount = parseInt(this.capacity);
    this.capacity *= 2;

    // Build new buckets array with updated capacity.
    const newBuckets = [];
    for (let i = 0; i < this.capacity; i++) {
      newBuckets.push(new LinkedList());
    }
    // Redistribute all keys into new buckets array.
    // Loop through getting a key and value, running .hash(key), then bucket.append(key, value)
    const keys = this.keys();
    const values = this.values();
    for (let i = 0; i < keys.length; i++) {
      const hashCode = this.hash(keys[i]);
      if (hashCode < 0 || hashCode >= newBuckets.length) {
        throw new Error("Trying to access index out of bounds");
      }
      const bucket = newBuckets[hashCode];
      bucket.append(keys[i], values[i]);
    }
    // Update this.buckets with all new entries.
    this.buckets = newBuckets;
  }

  // Returns the value that is assigned to this key. If a key is not found, return null.
  get(key) {
    const hashCode = this.hash(key);
    if (hashCode < 0 || hashCode >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[hashCode];
    if (bucket.containsKey(key)) {
      const node = bucket.getNode(key);
      return node.value;
    } else return null;
  }

  // Returns true or false based on whether or not the key is in the hash map.
  has(key) {
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i].containsKey(key)) return true;
    }
    return false;
  }

  // If the given key is in the hash map,
  // this should remove the entry with that key and return true.
  // If the key isn’t in the hash map, this should return false.
  remove(key) {
    if (this.has(key)) {
      for (let i = 0; i < this.buckets.length; i++) {
        if (this.buckets[i].containsKey(key)) {
          const bucket = this.buckets[i];
          const node = bucket.getNode(key);
          const index = bucket.indexOf(node);
          bucket.removeAt(index);
          return true;
        }
      }
    } else return false;
  }

  // Returns the number of stored keys in the hash map.
  // This method sums the size of each linked list.
  length() {
    let counter = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      counter += this.buckets[i].getSize();
    }
    return counter;
  }

  // Removes all entries in the hash map.
  clear() {
    this.buckets = [];
    this.capacity = this.baseCapacity;
    for (let i = 0; i <= this.capacity - 1; i++) {
      this.buckets.push(new LinkedList());
    }
  }

  // Returns an array containing all the keys inside the hash map.
  keys() {
    let keys = [];
    for (let i = 0; i < this.buckets.length; i++) {
      keys.push(...this.buckets[i].getKeys());
    }
    return keys;
  }

  // Returns an array containing all the values.
  values() {
    let values = [];
    for (let i = 0; i < this.buckets.length; i++) {
      values.push(...this.buckets[i].getValues());
    }
    return values;
  }

  // Returns an array that contains each key, value pair.
  // Example: [[firstKey, firstValue], [secondKey, secondValue]]
  entries() {
    let entries = [];
    const keys = this.keys();
    const values = this.values();
    for (let i = 0; i < keys.length; i++) {
      const entry = [keys[i], values[i]];
      entries.push(entry);
    }
    return entries;
  }
}

# HashMap Implementation Project

A JavaScript implementation of a HashMap data structure with dynamic resizing and collision handling.

## Overview

Create a `HashMap` class or factory function that implements a hash table with the following specifications:

- **Load Factor**: 0.75
- **Initial Capacity**: 16
- Automatic resizing when load factor is exceeded

## Required Methods

### `hash(key)`

Generates a hash code from a given key.

**Implementation Note**: Use the modulo operator (`%`) on each iteration to prevent integer overflow for long keys:

```javascript
function hash(key) {
  let hashCode = 0;

  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = primeNumber * hashCode + key.charCodeAt(i);
  }

  return hashCode;
}
```

> **Important**: This implementation only handles keys of type `string`.

### `set(key, value)`

Assigns a value to a key. If the key exists, overwrites the old value.

- Handles collisions when different keys generate the same hash code
- Triggers bucket growth when the load factor (0.75) is reached
- Doubles capacity upon expansion

### `get(key)`

Returns the value assigned to the given key, or `null` if not found.

### `has(key)`

Returns `true` if the key exists in the hash map, `false` otherwise.

### `remove(key)`

Removes the entry with the given key.

- Returns `true` if the key was found and removed
- Returns `false` if the key doesn't exist

### `length()`

Returns the total number of stored keys in the hash map.

### `clear()`

Removes all entries from the hash map.

### `keys()`

Returns an array containing all keys in the hash map.

### `values()`

Returns an array containing all values in the hash map.

### `entries()`

Returns an array of `[key, value]` pairs.

**Example format**: `[[firstKey, firstValue], [secondKey, secondValue]]`

> **Note**: Hash maps do not preserve insertion order. Keys and values may appear in a different order than they were inserted.

## Testing Instructions

### 1. Initial Setup

```javascript
const test = new HashMap(); // or HashMap() if using a factory
```

### 2. Populate the Hash Map

Add entries until the load factor reaches 0.75 (full capacity):

```javascript
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
```

### 3. Test Overwriting

Overwrite existing nodes using `set(key, value)`. This should:

- Update existing values only
- Not change `length()`
- Not change capacity

### 4. Trigger Growth

Add one more entry to exceed the load factor:

```javascript
test.set("moon", "silver");
```

This should:

- Double the hash map's capacity
- Drop load levels below the load factor
- Redistribute entries evenly across expanded buckets

### 5. Verify Expanded Hash Map

- Test overwriting nodes again
- Verify all methods still work correctly: `get(key)`, `has(key)`, `remove(key)`, `length()`, `clear()`, `keys()`, `values()`, and `entries()`

## Extra Credit

Create a `HashSet` class or factory function that:

- Behaves like a `HashMap`
- Contains only `keys` (no `values`)

## Key Concepts

### Hash Codes vs Keys

- **Key**: Input to the hash function
- **Hash Code**: Output used to access buckets
- Never access buckets directly with keys; always use hash codes

### Collisions

Occur when two different keys generate the same hash code and map to the same bucket. Your implementation must handle these scenarios properly.

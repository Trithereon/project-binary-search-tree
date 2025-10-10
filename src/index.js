#!/usr/bin/env node

import HashMap from "./hashmap.js";

/* Tests */
const test = new HashMap(0.75, 16);

// Populate hash map.
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
// Update a key value.
test.set("lion", "wardrobe");

// Log values associated with each key.
// console.log(test.get("apple"));
// console.log(test.get("banana"));
// console.log(test.get("carrot"));
// console.log(test.get("dog"));
// console.log(test.get("elephant"));
// console.log(test.get("frog"));
// console.log(test.get("grape"));
// console.log(test.get("hat"));
// console.log(test.get("ice cream"));
// console.log(test.get("jacket"));
// console.log(test.get("kite"));
console.log(test.has("kite"));
console.log(test.get("lion"));
console.log(test.length());
console.log(test.capacity);

// Make load level exceed load factor.
test.set("cherry", "red");

console.log(test.length());
console.log(test.capacity);

// Remove a key.
test.remove("hat");
console.log(test.get("hat"));
console.log(test.length());
console.log(test.capacity);
test.set("hat", "black");

// Get keys.
console.log(test.keys());
// Get values.
console.log(test.values());
// Get entries.
console.log(test.entries());

// Tests after doubling capacity:
console.log("Capacity has been doubled");
// get(key), has(key), remove(key), length(), clear(), keys(), values(), and entries()
console.log(test.get("lion")); // wardrobe
console.log(test.has("kite")); // true
console.log(test.remove("kite")); // true
console.log(test.length()); // 12
console.log(test.keys()); // Get keys.
console.log(test.values()); // Get values.
console.log(test.entries()); // Get entries.
test.clear(); // Clear all entries.
console.log(test.length()); // 0
console.log(test.capacity); // 16

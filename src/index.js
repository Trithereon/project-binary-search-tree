#!/usr/bin/env node

import { Tree, prettyPrint } from "./tree.js";
// import "./test.js";

const arr = [50, 30, 70, 20, 40, 60, 80, 32, 65, 75, 85, 34, 36];

// Builds a balanced tree.
const tree = new Tree(arr);
console.log("Tree has been built from array");

// Check if tree is balanced.
if (tree.isBalanced()) {
  console.log("Tree is balanced!");
} else console.log("Uh oh! Tree is NOT balanced.");

// Print out all elements in level, pre, post, and in order.
let level = [];
tree.levelOrderForEach((node) => level.push(node.data));
console.log("Level order: " + level.toString() + ".");
let pre = [];
tree.preorderForEach((node) => pre.push(node.data));
console.log("Pre order: " + pre.toString() + ".");
let post = [];
tree.postorderForEach((node) => post.push(node.data));
console.log("Post order: " + post.toString() + ".");
let inOrder = [];
tree.inorderForEach((node) => inOrder.push(node.data));
console.log("In order: " + inOrder.toString() + ".");

// Unbalance the tree by adding nodes.
tree.insert(15);
tree.insert(42);
tree.insert(7);
tree.insert(28);
tree.insert(56);
tree.insert(3);
tree.insert(19);
console.log("Plenty of nodes have been added.");

// Check whether it is unbalanced.
if (!tree.isBalanced()) {
  console.log("Tree is now unbalanced!");
} else console.log("Uh oh! Tree is still balanced.");

// Rebalance the tree.
tree.rebalance();
console.log("Tree has been rebalanced.");

// Check if tree is balanced.
if (tree.isBalanced()) {
  console.log("Tree is balanced!");
} else console.log("Uh oh! Tree is NOT balanced.");

// Print out all elements in level, pre, post, and in order.
level = [];
tree.levelOrderForEach((node) => level.push(node.data));
console.log("Level order: " + level.toString() + ".");
pre = [];
tree.preorderForEach((node) => pre.push(node.data));
console.log("Pre order: " + pre.toString() + ".");
post = [];
tree.postorderForEach((node) => post.push(node.data));
console.log("Post order: " + post.toString() + ".");
inOrder = [];
tree.inorderForEach((node) => inOrder.push(node.data));
console.log("In order: " + inOrder.toString() + ".");

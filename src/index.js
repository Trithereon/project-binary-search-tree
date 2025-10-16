#!/usr/bin/env node

import { Tree, prettyPrint } from "./tree.js";

// Unordered array with duplicates.
const arr = [
  5, 12, 28, 5, 41, 12, 63, 28, 77, 41, 89, 63, 5, 77, 104, 89, 116, 104, 128,
  116, 140, 128, 152, 140, 164, 152, 176, 164, 188, 176, 200, 188, 212, 200,
  224, 212, 236, 224, 248, 236, 260, 248, 272, 260, 284, 272, 296, 284, 308,
  296, 320, 308, 332, 320, 344, 332, 356, 344, 368, 356, 380, 368, 392, 380,
];

const simpleArr = [0, 1, 2, 3, 4, 5, 6];

const otherArr = [50, 30, 70, 20, 40, 60, 80, 32, 65, 75, 85, 34, 36];

const tree = new Tree(otherArr);
tree.insert(33); // Should be inserted to the left of 34.
tree.insert(33); // Should throw error due to duplicate.
tree.insert(15);
tree.insert(42);
tree.insert(7);
tree.insert(28);
tree.insert(56);
tree.insert(3);
tree.insert(19);
tree.insert(35);
tree.insert(61);
tree.insert(11);
tree.insert(24);
tree.insert(47);
tree.insert(68);
tree.insert(5);
tree.insert(31);
tree.insert(52);
tree.insert(73);
tree.insert(9);
tree.insert(39);
tree.insert(64);

prettyPrint(tree.root);

tree.deleteItem2(50);

prettyPrint(tree.root);

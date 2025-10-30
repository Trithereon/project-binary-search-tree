// Tests module
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

// Builds a balanced tree.
const tree = new Tree(otherArr);

// Print balanced tree.
prettyPrint(tree.root);

// Test if tree balanced or not.
console.log(tree.isBalanced()); // True

// Insert nodes, unbalancing the tree.
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

// Print unbalanced tree.
prettyPrint(tree.root);

// Test if tree balanced or not.
console.log(tree.isBalanced()); // False

// Test rebalance()
tree.rebalance();
prettyPrint(tree.root);
console.log(tree.isBalanced());

// // Test depth.
// console.log(tree.depth(50)); // 0
// console.log(tree.depth(32)); // 1
// console.log(tree.depth(20)); // 2
// console.log(tree.depth(5)); // 6

// Print node data.
function logNodeData(node) {
  console.log(node.data);
}

// // Test height
// const height = tree.height(50);
// console.log(height);

// // Test forEach functions
// tree.levelOrderForEach(logNodeData);
// tree.inorderForEach(logNodeData);
// tree.preorderForEach(logNodeData);
// tree.postorderForEach(logNodeData);

// // Delete root node.
// tree.deleteItem(50); // root node should be replaced with 52. WORKS.
// prettyPrint(tree.root);

// // Delete leaf node.
// tree.deleteItem(5); // leaf node 5 should be deleted. WORKS.
// prettyPrint(tree.root);

// // Delete node with left child only.
// tree.deleteItem(28); // node 28 should be replaced by 24. WORKS.
// prettyPrint(tree.root);

// // Delete node with right child only.
// tree.deleteItem(42); // node 42 should be replaced by 47. WORKS.
// prettyPrint(tree.root);

// // Delete node with two children.
// tree.deleteItem(36); // node 36 should be replaced by node 39. WORKS.
// prettyPrint(tree.root);

// // Tests for isBalanced.
// // Test suite for Tree.isBalanced() method
// // Assumes Node class exists: class Node { constructor(data) { this.data = data; this.left = null; this.right = null; } }

// console.log("=== Testing Tree.isBalanced() ===\n");

// // Helper function to run tests
// function test(description, testFn) {
//   try {
//     testFn();
//     console.log(`✓ ${description}`);
//   } catch (error) {
//     console.error(`✗ ${description}`);
//     console.error(`  ${error.message}`);
//   }
// }

// function assertEquals(actual, expected, message = "") {
//   if (actual !== expected) {
//     throw new Error(`Expected ${expected} but got ${actual}. ${message}`);
//   }
// }

// function assertThrows(fn, expectedMessage) {
//   try {
//     fn();
//     throw new Error("Expected function to throw an error");
//   } catch (error) {
//     if (expectedMessage && !error.message.includes(expectedMessage)) {
//       throw new Error(
//         `Expected error message to include "${expectedMessage}" but got "${error.message}"`
//       );
//     }
//   }
// }

// // Test 1: Empty tree should throw error
// test("throws error when tree is empty", () => {
//   const treeTest = new Tree([]);
//   console.log(treeTest.isBalanced());
//   assertThrows(() => treeTest.isBalanced(), "Binary Search Tree is empty");
// });

// // Test 2: Single node treeTest
// test("returns true for single node treeTest", () => {
//   const treeTest = new Tree([10]);
//   assertEquals(treeTest.isBalanced(), true);
// });

// // Test 3: Perfectly balanced treeTest (3 nodes)
// test("returns true for perfectly balanced treeTest (3 nodes)", () => {
//   //       10
//   //      /  \
//   //     5    15
//   const treeTest = new Tree([5, 10, 15]);
//   assertEquals(treeTest.isBalanced(), true);
// });

// // Test 4: Balanced treeTest with height difference of 1
// test("returns true for balanced treeTest with height difference of 1", () => {
//   //       10
//   //      /  \
//   //     5    15
//   //    /
//   //   3
//   const treeTest = new Tree([10, 5, 15]);
//   treeTest.insert(3);
//   assertEquals(treeTest.isBalanced(), true);
// });

// // Test 5: Larger balanced treeTest (7 nodes)
// test("returns true for larger balanced treeTest", () => {
//   //         10
//   //       /    \
//   //      5      15
//   //     / \    /  \
//   //    3   7  12  20
//   const treeTest = new Tree([3, 5, 7, 10, 12, 15, 20]);
//   assertEquals(treeTest.isBalanced(), true);
// });

// // Test 6: Two node treeTest (right child only)
// test("returns true for treeTest with only right child", () => {
//   //  10
//   //    \
//   //     15
//   const treeTest = new Tree([10, 15]);
//   assertEquals(treeTest.isBalanced(), true);
// });

// // Test 7: Two node treeTest (left child only)
// test("returns true for treeTest with only left child", () => {
//   //    10
//   //   /
//   //  5
//   const treeTest = new Tree([5, 10]);
//   assertEquals(treeTest.isBalanced(), true);
// });

// // Test 8: Unbalanced treeTest - left heavy (3 levels deep on left)
// test("returns false for left-heavy unbalanced treeTest", () => {
//   //       15
//   //      /  \
//   //     10   20
//   //    /
//   //   5
//   //  /
//   // 3
//   const treeTest = new Tree([10, 15, 20]);
//   treeTest.insert(5);
//   treeTest.insert(3);
//   assertEquals(treeTest.isBalanced(), false);
// });

// // Test 9: Unbalanced treeTest - right heavy
// test("returns false for right-heavy unbalanced treeTest", () => {
//   //   5
//   //    \
//   //     10
//   //      \
//   //       15
//   //        \
//   //         20
//   const treeTest = new Tree([5]);
//   treeTest.insert(10);
//   treeTest.insert(15);
//   treeTest.insert(20);
//   assertEquals(treeTest.isBalanced(), false);
// });

// // Test 10: Linked list structure (all right children)
// test("returns false for treeTest as linked list (all right)", () => {
//   const treeTest = new Tree([10]);
//   treeTest.insert(20);
//   treeTest.insert(30);
//   treeTest.insert(40);
//   assertEquals(treeTest.isBalanced(), false);
// });

// // Test 11: Linked list structure (all left children)
// test("returns false for treeTest as linked list (all left)", () => {
//   const treeTest = new Tree([40]);
//   treeTest.insert(30);
//   treeTest.insert(20);
//   treeTest.insert(10);
//   assertEquals(treeTest.isBalanced(), false);
// });

// // Test 12: Balanced at root but unbalanced in subtreeTest
// test("returns false when subtreeTest is unbalanced", () => {
//   //         10
//   //       /    \
//   //      5      20
//   //     / \    /  \
//   //    3   7  15   25
//   //   /              \
//   //  1                30
//   //                     \
//   //                      35
//   const treeTest = new Tree([1, 3, 5, 7, 10, 15, 20, 25]);
//   treeTest.insert(30);
//   treeTest.insert(35);
//   assertEquals(treeTest.isBalanced(), false);
// });

// // Test 13: Complex balanced treeTest
// test("returns true for complex balanced treeTest", () => {
//   //           8
//   //       /       \
//   //      4         12
//   //     / \       /  \
//   //    2   6    10    14
//   //   / \ / \   / \   / \
//   //  1  3 5 7  9 11 13 15
//   const treeTest = new Tree([
//     1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
//   ]);
//   assertEquals(treeTest.isBalanced(), true);
// });

// // Test 14: Tree becomes unbalanced after insertions
// test("returns false after insertions make treeTest unbalanced", () => {
//   const treeTest = new Tree([5, 10, 15]); // Initially balanced
//   assertEquals(treeTest.isBalanced(), true);

//   treeTest.insert(20);
//   treeTest.insert(25);
//   treeTest.insert(30); // Now unbalanced
//   assertEquals(treeTest.isBalanced(), false);
// });

// // Test 15: Tree with only left subtreeTest populated
// test("returns false when only left subtreeTest is deep", () => {
//   //        50
//   //       /  \
//   //      25   75
//   //     /
//   //    12
//   //   /
//   //  6
//   const treeTest = new Tree([25, 50, 75]);
//   treeTest.insert(12);
//   treeTest.insert(6);
//   assertEquals(treeTest.isBalanced(), false);
// });

// console.log("\n=== All tests completed ===");

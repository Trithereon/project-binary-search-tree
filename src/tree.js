// Tree class module.

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    // Process array by sorting and removing dupes.
    const sortedArr = this.mergeSort(array);
    const arr = this.rmDupes(sortedArr);

    return this.sortedArrayToBST(arr);
  }

  // Sort array. (I could have used the built-in sort method, but this one is written by me)
  mergeSort(arr) {
    // On empty array, return empty array.
    if (arr.length <= 1) {
      return arr;
    } else {
      let leftHalf = arr.slice(0, arr.length / 2);
      let rightHalf = arr.slice(arr.length / 2);

      let left = this.mergeSort(leftHalf);
      let right = this.mergeSort(rightHalf);

      return this.merge(left, right);
    }
  }
  merge(left, right) {
    let i = 0;
    let j = 0;
    const merged = [];

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        merged.push(left[i]);
        i++;
      } else if (left[i] > right[j]) {
        merged.push(right[j]);
        j++;
      } else if (left[i] === right[j]) {
        merged.push(left[i], right[j]);
        i++;
        j++;
      }
    }
    if (left[i]) merged.push(...left.slice(i));
    else if (right[j]) merged.push(...right.slice(j));
    return merged;
  }

  // Return array with dupes removed from a sorted array.
  rmDupes(array) {
    return array.filter((element, index, array) => {
      if (array[index + 1] && element === array[index + 1]) return false;
      else return true;
    });
  }

  // Passes array onto the recursive binary search tree builder.
  sortedArrayToBST(arr) {
    return this.sortedArrayToBSTRecur(arr, 0, arr.length - 1);
  }

  // Recursively builds a binary search tree from an array.
  sortedArrayToBSTRecur(arr, start, end) {
    if (start > end) return null;

    // Find the middle element.
    let mid = start + Math.floor((end - start) / 2);

    // Create root node.
    let root = new Node(arr[mid]);

    // Create left subtree.
    root.left = this.sortedArrayToBSTRecur(arr, start, mid - 1);

    // Create right subtree.
    root.right = this.sortedArrayToBSTRecur(arr, mid + 1, end);
    return root;
  }

  // Insert the given value.
  insert(value) {
    // Traverse the tree and create a Node with value in the appropriate position.
    let current = this.root;
    while (current) {
      if (value < current.data) {
        if (current.left) current = current.left;
        else return (current.left = new Node(value));
      } else if (value > current.data) {
        if (current.right) current = current.right;
        else return (current.right = new Node(value));
      } else {
        current = false;
        console.error(
          `"${value}" already exists in the tree, so it was not added.`
        );
      }
    }
  }

  // Delete the given value.
  deleteItem(value) {
    const targetNode = this.find(value);
    if (!targetNode) return null; // Value not found.

    // Traverse from root to the target Node, keeping track of the parent.
    let target = this.root;
    let tParent = this.root;
    while (target.data !== value) {
      if (value > target.data && target.right) {
        tParent = target;
        target = target.right;
      } else if (value < target.data && target.left) {
        tParent = target;
        target = target.left;
      }
    }
    // At this point,
    // target = the target Node
    // tParent = the target Node's parent

    if (targetNode.left === null && targetNode.right === null) {
      deleteLeafNode();
    } else if (targetNode.left && targetNode.right) {
      deleteNodeWithTwoChildren();
    } else if (targetNode.left || targetNode.right) {
      deleteNodeWithOneChild();
    }

    // Unlink target node from its parent.
    function deleteLeafNode() {
      if (tParent.right === target) tParent.right = null;
      else if (tParent.left === target) tParent.left = null;
    }

    // Replace target with its inorder successor.
    function deleteNodeWithTwoChildren() {
      let successor = target.right;
      let sParent = target;

      while (successor.left) {
        sParent = successor;
        successor = successor.left; // Go left until the bottom of the tree.
      }
      // Now I have my successor. I will unlink child.
      if (successor.right) {
        sParent.left = successor.right;
      } else {
        sParent.left = null;
      }
      // Now I can replace the target value with successor value.
      target.data = successor.data;
    }

    // Replace target with its child.
    function deleteNodeWithOneChild() {
      if (tParent.right === target) {
        tParent.right = target.right || target.left; // Only the truthy one will be assigned.
      } else if (tParent.left === target) {
        tParent.left = target.right || target.left;
      }
    }
  }

  // Returns the Node with the given value.
  find(value) {
    let current = this.root;
    while (current) {
      if (value > current.data && current.right) {
        current = current.right;
      } else if (value < current.data && current.left) {
        current = current.left;
      } else if (value === current.data) {
        return current;
      } else return null; // Value not found.
    }
  }

  // Traverses the tree in breadth-first level order
  // and calls the callback on each node as it traverses,
  // passing the whole node as an argument
  levelOrderForEach(callback) {
    if (typeof callback !== "function")
      throw new Error("Argument of levelOrderForEach() must be a function");
    if (!this.root) throw new Error("Binary Search Tree is empty");

    // Start at the root node.
    const queue = [this.root];

    function callbackRecur() {
      // Base case: empty queue.
      if (queue.length === 0) return;

      // Dequeue first element of queue array and store in "node".
      const node = queue.shift();

      // Run callback on node.
      callback(node);

      // Enqueue children of node.
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);

      // Recursively call.
      callbackRecur();
    }
    // Initialize recursive function.
    callbackRecur();
  }

  // forEach node in-order (left -> root -> right)
  inorderForEach(callback) {
    function callbackRecur(node) {
      if (node === null) return;

      // Go left, if possible.
      if (node.left) callbackRecur(node.left);

      // Run callback on current node.
      callback(node);

      // Go right, if possible.
      if (node.right) callbackRecur(node.right);
    }
    // Initialize recursive function on root node.
    callbackRecur(this.root);
  }

  // forEach node pre-order (root -> left -> right)
  preorderForEach(callback) {
    function callbackRecur(node) {
      if (node === null) return;

      callback(node);
      if (node.left) callbackRecur(node.left);
      if (node.right) callbackRecur(node.right);
    }
    callbackRecur(this.root);
  }

  // forEach node post-order (left -> right -> root)
  postorderForEach(callback) {
    function callbackRecur(node) {
      if (node === null) return;

      if (node.left) callbackRecur(node.left);
      if (node.right) callbackRecur(node.right);
      callback(node);
    }
    callbackRecur(this.root);
  }

  // Returns the height of the node containing the given value.
  height(value) {
    const node = this.find(value);
    function heightRecur(node) {
      if (node === null) return 0;
      if (node.right || node.left)
        return 1 + Math.max(heightRecur(node.right), heightRecur(node.left));
      else return 0;
    }
    return heightRecur(node);
  }

  // Returns the depth of the node containing the given value.
  // Note: same as find(), with an added counter, and returns the counter.
  depth(value) {
    let counter = 0;
    let current = this.root;
    while (current) {
      if (value > current.data && current.right) {
        current = current.right;
        counter++;
      } else if (value < current.data && current.left) {
        current = current.left;
        counter++;
      } else if (value === current.data) {
        return counter;
      } else return null; // Value not found.
    }
  }

  // Check whether for every node in the tree,
  // the height difference between its left and right subtrees is no more than 1.
  isBalanced() {
    /* if left and right height diff > 1, return false.
     else return true */
    if (!this.root) throw new Error("Binary Search Tree is empty");
    const callback = (node) => {
      if (node.left || node.right) {
        // If only one child, callbackRecur() on that child.
        let left;
        let right;
        if (!node.left) left = -1; // null is -1 height.
        else left = this.height(node.left.data);
        if (!node.right) right = -1;
        else right = this.height(node.right.data);
        if (Math.abs(left - right) > 1) return false;
      }
    };
    // Start at the root node.
    const queue = [this.root];
    function callbackRecur() {
      // Base case: empty queue.
      if (queue.length === 0) return true;
      // Dequeue first element of queue array and store in "node".
      const node = queue.shift();
      // Run callback on node.
      if (callback(node) === false) return false;
      // Enqueue children of node.
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      // Recursively call.
      return callbackRecur();
    }
    // Initialize recursive function.
    return callbackRecur();
  }
}

// This function will expect to receive the root of your tree as the value for the node parameter.
export const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

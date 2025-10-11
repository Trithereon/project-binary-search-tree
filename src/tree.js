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
    if (arr.length === 1) {
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
  deleteItem(value) {}

  // Returns the Node with the given value.
  find(value) {}

  // Traverses the tree in breadth-first level order
  // and call the callback on each node as it traverses,
  // passing the whole node as an argument
  levelOrderForEach(callback) {}
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

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

  sortedArrayToBST(arr) {
    return this.sortedArrayToBSTRecur(arr, 0, arr.length - 1);
  }

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

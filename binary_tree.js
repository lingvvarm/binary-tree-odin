import Node from "./node.js";

export default class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    arr = arr.sort((a, b) => a - b);
    arr = Array.from(new Set(arr));
    if (arr.length === 0) return null;
    const mid = parseInt(arr.length / 2);
    let localRoot = new Node(arr[mid]);
    localRoot.left = this.buildTree(arr.slice(0, mid));
    localRoot.right = this.buildTree(arr.slice(mid + 1));
    return localRoot;
  }

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  insert(value, node = this.root) {
    if (node === null) return new Node(value);
    if (value < node.data) node.left = this.insert(value, node.left);
    if (value > node.data) node.right = this.insert(value, node.right);
    return node;
  }

  delete(value, node = this.root) {
    if (node === null) return node;
    if (value < node.data) {
      node.left = this.delete(value, node.left);
      return node;
    }
    if (value > node.data) {
      node.right = this.delete(value, node.right);
      return node;
    }

    if (node.left === null) {
      let tmp = node.right;
      node = undefined;
      return tmp;
    }
    else if (node.right === null) {
      let tmp = node.left;
      node = undefined;
      return tmp;
    }
    else {
      let succParrent = node;
      let succ = node.right;

      while (succ.left) {
        succParrent = succ;
        succ =  succ.left;
      }

      if (succParrent !== node) {
        succParrent.left = succ.right;
      } else {
        succParrent.right = succ.right;
      }

      node.data = succ.data;
      succ = undefined;
      return node;
    }
  }

  find(value, node = this.root) {
    if (value !== node.data) {
      if (value < node.data) node = this.find(value, node.left);
      if (value > node.data) node = this.find(value, node.right);
    }
    return node;
  }

  levelOrder(node, callback) {
    if (node === null) return;
    const queue = [];
    const res = [];
    queue.push(node);
    while (queue.length) {
      let current = queue.shift();
      if (callback) callback(current);
      res.push(current.data);
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    if (!callback) return res;
  }

  inorder(node, callback, res=[]) {
    if (node === null) return;
    if (node.left) this.inorder(node.left, callback, res);
    if (callback) callback(node.data);
    res.push(node.data);
    if (node.right) this.inorder(node.right, callback, res);
    return res;
  }

  preorder(node, callback) {
    if (node === null) return;
    const stack = [node];
    const res = [];
    while (stack.length) {
      node = stack.pop();
      if (node.right) stack.push(node.right);
      if (node.left) stack.push(node.left);
      if (callback) callback(node.data);
      res.push(node.data);
    }
    if (!callback) return res;
  }

  postorder(node, callback) {
    if (node === null) return;
    const stack = [node];
    const res = [];
    while (stack.length) {
      node = stack.pop();
      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
      if (callback) callback(node.data);
      res.push(node.data);
    }
    if (!callback) return res.reverse();
  }

  height(node) {
    if (node === null) return -1;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(node, root = this.root, path=0) {
    if (!node) return null;
    if (root === null) return 0;
    if (root.data === node.data) return path;
    let cnt = this.depth(node, root.left, path + 1);
    if (cnt !== 0) return cnt;
    return this.depth(node, root.right, path + 1);
  }

  isBalanced(node = this.root) {
    if (node === null) return true;
    let heightDelta = Math.abs(this.height(node.left) - this.height(node.right));
    return heightDelta <= 1 && this.isBalanced(node.left) && this.isBalanced(node.right);
  }

  rebalance() {
    if (this.root === null) return;
    this.root = this.buildTree(this.inorder(this.root));
  }
}

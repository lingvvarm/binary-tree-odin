import Tree from "./binary_tree.js";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const lst = [];

for (let i = 0; i < 20; i++) {
  lst.push(getRandomInt(1, 99));
}

let tree = new Tree(lst);

console.log(tree.prettyPrint());

console.log(tree.isBalanced());

console.log(tree.levelOrder(tree.root));
console.log(tree.inorder(tree.root));
console.log(tree.preorder(tree.root));
console.log(tree.postorder(tree.root));

tree.insert(121);
tree.insert(155);

console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());

tree.prettyPrint();

console.log(tree.levelOrder(tree.root));
console.log(tree.inorder(tree.root));
console.log(tree.preorder(tree.root));
console.log(tree.postorder(tree.root));

import { Question } from './question';

export class TreeNode {
  id: number;
  name: string;
  parent: string;
  treeNodes: TreeNode[];
  questions: Question[];
  expanded: boolean;
  checked: boolean;

  constructor({ id, name, parent }) {
    this.id = id;
    this.name = name;
    this.parent = parent;
    this.questions = [];
    this.treeNodes = [];
    this.expanded = true;
  }

  addQuestion(question: Question) {
    this.questions.push(question);
  }

  addTreeNode(treeNode: TreeNode) {
    this.treeNodes.push(treeNode);
  }

  toggle() {
    this.expanded = !this.expanded;
  }
}

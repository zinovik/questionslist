import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TreeNode } from '../tree-node';
import { Question } from '../question';

@Component({
  selector: 'app-questions-tree',
  templateUrl: './questions-tree.component.html',
  styleUrls: ['./questions-tree.component.css']
})
export class QuestionsTreeComponent implements OnInit {

  @Input() treeNodes: TreeNode[];
  @Output() actions: EventEmitter<string> = new EventEmitter();

  constructor(
  ) {
  }

  ngOnInit() {
  }

  action(actionJSON: string) {
    this.actions.emit(actionJSON);
  }

  editQuestion(question: Question) {
    this.actions.emit(JSON.stringify({
      type: 'editQuestion',
      data: question,
    }));
  }

  editCategory(treeNode: TreeNode) {
    this.actions.emit(JSON.stringify({
      type: 'editCategory',
      data: treeNode,
    }));
  }

  deleteQuestion(id) {
    this.actions.emit(JSON.stringify({
      type: 'deleteQuestion',
      data: id,
    }));
  }

  deleteCategory(id) {
    this.actions.emit(JSON.stringify({
      type: 'deleteCategory',
      data: id,
    }));
  }
}

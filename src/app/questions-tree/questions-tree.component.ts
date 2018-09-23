import { Component, OnInit, Input } from '@angular/core';

import { TreeNode } from '../tree-node';

@Component({
  selector: 'app-questions-tree',
  templateUrl: './questions-tree.component.html',
  styleUrls: ['./questions-tree.component.css']
})
export class QuestionsTreeComponent implements OnInit {

  @Input() treeNodes: TreeNode[];

  constructor() { }

  ngOnInit() {
  }

}

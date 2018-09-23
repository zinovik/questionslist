import { Component, OnInit } from '@angular/core';

import { QuestionslistApiService } from '../questionslist-api.service';

import { Question } from '../question';
import { Category } from '../category';
import { TreeNode } from '../tree-node';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  questions: Question[];
  categories: Category[];
  treeNodes: TreeNode[];

  newQuestion: Question = <Question>{};
  newCategory: Category = <Category>{};

  constructor(
    private questionslistApiService: QuestionslistApiService,
  ) {
  }

  ngOnInit() {
    this.questionslistApiService.getQuestions()
      .subscribe((questions: Question[]) => {
        this.questions = questions;
        this.createTree();
      });
    this.questionslistApiService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.createTree();
      });
  }

  createTree() {
    if (!this.questions || !this.categories) {
      return;
    }
    const listNodes = [];
    const mapNodes = {};

    this.categories.forEach(category => {
      const newNode = new TreeNode({
        id: category.id,
        name: category.name,
        parent: category.parent,
      });

      listNodes.push(newNode);

      mapNodes[category.id] = newNode;
    });

    this.questions.forEach(question => {
      if (mapNodes[question.category]) {
        mapNodes[question.category].addQuestion(question);
      }
    });

    this.treeNodes = [];
    listNodes.forEach(treeNode => {
      if (treeNode.parent !== null) {
        mapNodes[treeNode.parent].addTreeNode(treeNode);
      } else {
        this.treeNodes.push(treeNode);
      }
    });
  }

  createQuestion() {
    this.questionslistApiService.createQuestion(this.newQuestion)
      .subscribe((questions: Question[]) => {
        this.questions = questions;
        this.createTree();
      });
  }

  createCategory() {
    this.questionslistApiService.createCategory(this.newCategory)
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.createTree();
      });
  }

  updateQuestion() {
    console.log(this.newQuestion);
    this.createTree();
  }

  updateCategory() {
    console.log(this.newCategory);
    this.createTree();
  }

  deleteQuestion(id) {
    this.questionslistApiService.deleteQuestion(id)
      .subscribe((questions: Question[]) => {
        this.questions = questions;
        this.createTree();
      });
  }

  deleteCategory(id) {
    this.questionslistApiService.deleteCategory(id)
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.createTree();
      });
  }

}

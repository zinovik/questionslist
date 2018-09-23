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

  DIFFICULTIES = [1, 2, 3, 4, 5];

  questions: Question[];
  categories: Category[];
  treeNodes: TreeNode[];

  showNewQuestionForm = false;
  showNewCategoryForm = false;

  editQuestionMode = false;
  editCategoryMode = false;

  newQuestion: Question = <Question>{
    difficulty: 1,
  };
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
        this.setDefaultCategory();
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
        this.cancelWorkWithQuestion();
        this.createTree();
      });
  }

  createCategory() {
    this.questionslistApiService.createCategory(this.newCategory)
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.cancelWorkWithCategory();
        this.setDefaultCategory();
        this.createTree();
      });
  }

  cancelWorkWithQuestion() {
    this.showNewQuestionForm = false;
    this.editQuestionMode = false;
    this.newQuestion = <Question>{ difficulty: 1 };
    this.setDefaultCategory();
  }

  cancelWorkWithCategory() {
    this.showNewCategoryForm = false;
    this.editCategoryMode = false;
    this.newCategory = <Category>{};
    this.setDefaultCategory();
  }

  updateQuestion() {
    this.showNewQuestionForm = false;
    this.editQuestionMode = false;
    this.questionslistApiService.updateQuestion(this.newQuestion)
      .subscribe((questions: Question[]) => {
        this.questions = questions;
        this.cancelWorkWithQuestion();
        this.createTree();
      });
  }

  updateCategory() {
    this.showNewCategoryForm = false;
    this.editCategoryMode = false;
    this.questionslistApiService.updateCategory(this.newCategory)
      .subscribe((categories: Category[]) => {
        this.categories = categories;
        this.cancelWorkWithCategory();
        this.setDefaultCategory();
        this.createTree();
      });
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
        this.setDefaultCategory();
        this.createTree();
      });
  }

  action(actionJSON: string) {
    const action = JSON.parse(actionJSON);
    switch (action.type) {
      case 'editQuestion': {
        this.editQuestionMode = true;
        this.newQuestion = action.data;
        break;
      }
      case 'editCategory': {
        this.editCategoryMode = true;
        this.newCategory = action.data;
        break;
      }
      case 'deleteQuestion': {
        this.deleteQuestion(action.data);
        break;
      }
      case 'deleteCategory': {
        this.deleteCategory(action.data);
        break;
      }
    }
  }

  setDefaultCategory() {
    if (this.categories[0]) {
      this.newQuestion.category = this.categories[0].id;
      this.newCategory.parent = this.categories[0].id;
    }
  }
}

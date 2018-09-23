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

  filter: string;

  constructor(
    private questionslistApiService: QuestionslistApiService,
  ) {
  }

  ngOnInit() {
    this.questionslistApiService.getQuestions()
      .subscribe(({ error, data }) => {
        if (error) {
          console.log(error);
        }
        this.questions = data;
        this.createTree();
      });
    this.questionslistApiService.getCategories()
      .subscribe(({ error, data }) => {
        if (error) {
          console.log(error);
        }
        this.categories = data;
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
      if (this.filter) {
        const filter = this.filter.toLowerCase();
        if (question.name.toLowerCase().indexOf(filter) === -1
          && question.text.toLowerCase().indexOf(filter) === -1
          && question.answer.toLowerCase().indexOf(filter) === -1
          && question.tags.toLowerCase().indexOf(filter) === -1) {
          return;
        }
      }
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
      .subscribe(({ error, data }) => {
        if (error) {
          console.log(error);
        }
        this.questions = data;
        this.cancelWorkWithQuestion();
        this.createTree();
      });
  }

  createCategory() {
    this.questionslistApiService.createCategory(this.newCategory)
      .subscribe(({ error, data }) => {
        if (error) {
          console.log(error);
        }
        this.categories = data;
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
      .subscribe(({ error, data }) => {
        if (error) {
          console.log(error);
        }
        this.questions = data;
        this.cancelWorkWithQuestion();
        this.createTree();
      });
  }

  updateCategory() {
    this.showNewCategoryForm = false;
    this.editCategoryMode = false;
    this.questionslistApiService.updateCategory(this.newCategory)
      .subscribe(({ error, data }) => {
        if (error) {
          console.log(error);
        }
        this.categories = data;
        this.cancelWorkWithCategory();
        this.setDefaultCategory();
        this.createTree();
      });
  }

  deleteQuestion(id) {
    this.questionslistApiService.deleteQuestion(id)
      .subscribe(({ error, data }) => {
        if (error) {
          console.log(error);
        }
        this.questions = data;
        this.createTree();
      });
  }

  deleteCategory(id) {
    this.questionslistApiService.deleteCategory(id)
      .subscribe(({ error, data }) => {
        if (error) {
          console.log(error);
        }
        this.categories = data;
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

  filterChanged() {
    this.createTree();
  }

  setDefaultCategory() {
    if (this.categories[0]) {
      this.newQuestion.category = this.categories[0].id;
      this.newCategory.parent = this.categories[0].id;
    }
  }
}

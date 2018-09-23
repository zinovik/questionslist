import { Component, OnInit } from '@angular/core';

import { QuestionslistApiService } from '../questionslist-api.service';

import { Question } from '../question';
import { Category } from '../category';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  questions: Question[];
  categories: Category[];

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
      });
    this.questionslistApiService.getCategories()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  createQuestion() {
    this.questionslistApiService.createQuestion(this.newQuestion)
      .subscribe((questions: Question[]) => {
        this.questions = questions;
      });
  }

  createCategory() {
    this.questionslistApiService.createCategory(this.newCategory)
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  updateQuestion() {
    console.log(this.newQuestion);
  }

  updateCategory() {
    console.log(this.newCategory);
  }

  deleteQuestion(id) {
    this.questionslistApiService.deleteQuestion(id)
      .subscribe((questions: Question[]) => {
        this.questions = questions;
      });
  }

  deleteCategory(id) {
    this.questionslistApiService.deleteCategory(id)
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

}

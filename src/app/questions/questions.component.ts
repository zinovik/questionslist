import { Component, OnInit } from '@angular/core';

import { QuestionslistApiService } from '../questionslist-api.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  questions;

  constructor(
    private questionslistApiService: QuestionslistApiService,
  ) { }

  ngOnInit() {
    this.questionslistApiService.getQuestions()
      .subscribe(questions => {
        this.questions = questions;
      });
  }

}

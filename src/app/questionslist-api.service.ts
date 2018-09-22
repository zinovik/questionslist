import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

const questionslistApiUrl = 'https://questionslist-api.herokuapp.com/api/v1';

@Injectable({
  providedIn: 'root'
})
export class QuestionslistApiService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getQuestions() {
    return this.httpClient.get(`${questionslistApiUrl}/questions`);
  }
}

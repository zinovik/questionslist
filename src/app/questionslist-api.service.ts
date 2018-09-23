import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Question } from './question';
import { Category } from './category';
import { Observable } from 'rxjs';

const QUESTIONS_LIST_API_URL = 'https://questionslist-api.herokuapp.com/api/v1';
// const QUESTIONS_LIST_API_URL = 'http://localhost:3000/api/v1';
const QUESTIONS = 'questions';
const CATEGORIES = 'categories';
const LOGIN = 'authorization/login';

@Injectable({
  providedIn: 'root'
})
export class QuestionslistApiService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getQuestions(): Observable<{ error: string, data: Question[] }> {
    return this.httpClient.get<{ error: string, data: Question[] }>(`${QUESTIONS_LIST_API_URL}/${QUESTIONS}`);
  }

  getCategories(): Observable<{ error: string, data: Category[] }> {
    return this.httpClient.get<{ error: string, data: Category[] }>(`${QUESTIONS_LIST_API_URL}/${CATEGORIES}`);
  }

  createQuestion(question: Question): Observable<{ error: string, data: Question[] }> {
    return this.httpClient.post<{ error: string, data: Question[] }>(`${QUESTIONS_LIST_API_URL}/${QUESTIONS}`, question);
  }

  createCategory(category: Category): Observable<{ error: string, data: Category[] }> {
    return this.httpClient.post<{ error: string, data: Category[] }>(`${QUESTIONS_LIST_API_URL}/${CATEGORIES}`, category);
  }

  updateQuestion(question: Question): Observable<{ error: string, data: Question[] }> {
    return this.httpClient.put<{ error: string, data: Question[] }>(`${QUESTIONS_LIST_API_URL}/${QUESTIONS}`, question);
  }

  updateCategory(category: Category): Observable<{ error: string, data: Category[] }> {
    return this.httpClient.put<{ error: string, data: Category[] }>(`${QUESTIONS_LIST_API_URL}/${CATEGORIES}`, category);
  }

  deleteQuestion(id: string): Observable<{ error: string, data: Question[] }> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: { id },
    };
    return this.httpClient.delete<{ error: string, data: Question[] }>(`${QUESTIONS_LIST_API_URL}/${QUESTIONS}`, httpOptions);
  }

  deleteCategory(id: string): Observable<{ error: string, data: Category[] }> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: { id },
    };
    return this.httpClient.delete<{ error: string, data: Category[] }>(`${QUESTIONS_LIST_API_URL}/${CATEGORIES}`, httpOptions);
  }

  login(token: string): Observable<{ given_name: string }> {
    return this.httpClient.post<{ given_name: string }>(`${QUESTIONS_LIST_API_URL}/${LOGIN}`, { token });
  }
}

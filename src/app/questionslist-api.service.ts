import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Question } from './question';
import { Category } from './category';
import { Observable } from 'rxjs';

const QUESTIONS_LIST_API_URL = 'https://questionslist-api.herokuapp.com/api/v1';
const QUESTIONS = 'questions';
const CATEGORIES = 'categories';

@Injectable({
  providedIn: 'root'
})
export class QuestionslistApiService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getQuestions(): Observable<Question[]> {
    return this.httpClient.get<Question[]>(`${QUESTIONS_LIST_API_URL}/${QUESTIONS}`);
  }

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${QUESTIONS_LIST_API_URL}/${CATEGORIES}`);
  }

  createQuestion(question: Question): Observable<Question[]> {
    return this.httpClient.post<Question[]>(`${QUESTIONS_LIST_API_URL}/${QUESTIONS}`, question);
  }

  createCategory(category: Category): Observable<Category[]> {
    return this.httpClient.post<Category[]>(`${QUESTIONS_LIST_API_URL}/${CATEGORIES}`, category);
  }

  updateQuestion(question: Question): Observable<Question[]> {
    return this.httpClient.put<Question[]>(`${QUESTIONS_LIST_API_URL}/${QUESTIONS}`, question);
  }

  updateCategory(category: Category): Observable<Category[]> {
    return this.httpClient.put<Category[]>(`${QUESTIONS_LIST_API_URL}/${CATEGORIES}`, category);
  }

  deleteQuestion(id: string): Observable<Question[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: { id },
    };
    return this.httpClient.delete<Question[]>(`${QUESTIONS_LIST_API_URL}/${QUESTIONS}`, httpOptions);
  }

  deleteCategory(id: string): Observable<Category[]> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: { id },
    };
    return this.httpClient.delete<Category[]>(`${QUESTIONS_LIST_API_URL}/${CATEGORIES}`, httpOptions);
  }
}

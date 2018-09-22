import { TestBed } from '@angular/core/testing';

import { QuestionslistApiService } from './questionslist-api.service';

describe('QuestionslistApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuestionslistApiService = TestBed.get(QuestionslistApiService);
    expect(service).toBeTruthy();
  });
});

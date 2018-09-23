import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsTreeComponent } from './questions-tree.component';

describe('QuestionsTreeComponent', () => {
  let component: QuestionsTreeComponent;
  let fixture: ComponentFixture<QuestionsTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

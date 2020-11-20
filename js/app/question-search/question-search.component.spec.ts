import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSearchComponent } from './question-search.component';

describe('QuestionSearchComponent', () => {
  let component: QuestionSearchComponent;
  let fixture: ComponentFixture<QuestionSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

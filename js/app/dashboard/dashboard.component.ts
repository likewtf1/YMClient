import { Component, OnInit } from '@angular/core';
import { Question } from '../questions';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  questiones: Question[] = [];

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.getQuestions();
  }

  getQuestions(): void {
    this.questionService.getQuestions()
      .subscribe(questiones => this.questiones = questiones.slice(1, 5));
  }
}
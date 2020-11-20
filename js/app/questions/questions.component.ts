import { Component, OnInit,Input } from '@angular/core';
import {Question} from '../questions';

import {QuestionService} from "../question.service";
import { MessageService } from '../message.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  questions : Question[];

  constructor(
    private questionService:QuestionService,
    private messageService:MessageService,
    public userService:UserService
  ) { }

  ngOnInit(): void {
    this.getQuestions();
  }

  

  getQuestions():void{
    this.questionService.getQuestions()
        .subscribe(questions=>this.questions=questions);
  }

  add(name:string,context:string): void {
    name = name.trim();
    if(!name){return ;}
    this.questionService.addQuestion({ 'title':name, 'context':context } as Question)
      .subscribe(question => {
          this.questions.push(question);
      });
  }

  delete(question:Question): void {
    this.questions=this.questions.filter(h=>h!=question);
    this.questionService.deleteQuestion(question).subscribe();

  }
}

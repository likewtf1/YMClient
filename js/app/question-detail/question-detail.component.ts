import { Component, OnInit,Input } from '@angular/core';
import {Question} from '../questions'

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { QuestionService } from '../question.service';
import { UserService } from '../user.service';
import { Answer } from '../answer';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {
  @Input() question:Question;
  answers:Answer[];

  
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private location: Location,
    public userService: UserService
  ) { } 

  ngOnInit(): void {
    this.getQuestion();
    this.getAnswerlist();
  }

  getAnswerlist():void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.questionService.getAnswerlist(id)
      .subscribe(answers=>this.answers=answers);
  }

  getQuestion():void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.questionService.getQuestion(id)
      .subscribe(question=>this.question=question);
  }

  goBack():void {
    this.location.back();
  }

  save():void {
    this.questionService.updateQuestion(this.question)
      .subscribe(()=>this.goBack);
  }

  postanswer(context:string):void{
    this.questionService.postAnswer({'u_name':this.userService.getusername(), 'context':context, 'qid':this.question.pk} as Answer)
      .subscribe(answer=>this.answers.push(answer));
  }

  delete(answer:Answer):void {
    this.answers=this.answers.filter(h=>h!=answer);
    this.questionService.deleteAnswer(answer)
      .subscribe(

      )
  }
}

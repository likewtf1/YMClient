import { Injectable, ɵɵresolveBody } from '@angular/core';
import { Question } from './questions';
import { MessageService } from './message.service';

import { HttpClient, HttpHeaders, HttpParams, HTTP_INTERCEPTORS } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { UserService } from './user.service';
import { Answer } from './answer';



@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  

  constructor(
    private messageService:MessageService,
    private http:HttpClient,
    private userService:UserService) { }


  private questionsUrl = 'http://167.179.105.202:8000/';  // URL to web api

  private log(message: string)
  {
    this.messageService.add(`${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  httpOptions = {
    headers: new HttpHeaders({  'Content-Type': 'application/json' })
  };

  getQuestions():Observable<Question[]> {
    this.messageService.add('Fetched questions');
    const url=`${this.questionsUrl}question/`;
    return this.http.get<Question[]>(url)
        .pipe(
          tap(_ => this.log('fetched questions')),
          catchError(this.handleError<Question[]>('getQuestions',[]))
        );
  }

  getQuestion(id:number): Observable<Question> {
    const url = `${this.questionsUrl}question/${id}/`;
    return this.http.get<Question>(url).pipe(
      tap(_ => this.log(`fetched question id = ${id}`)),
      catchError(this.handleError<Question>(`getQuestion id = ${id}`))
    );

  }

  getAnswerlist(id:number): Observable<Answer[]> {
    const url =`${this.questionsUrl}answerset/${id}/`;
    return this.http.get<Answer[]>(url)
      .pipe(
        catchError(this.handleError<Answer[]>('getAnswerlist',[]))
      );
  }

  updateQuestion(question:Question) :Observable<any> {
    
    const url = `${this.questionsUrl}question/${question.pk}/`;
    const newquestion={
      'pk':question.pk,
      'token':this.userService.gettoken(),
      'title':question.title,
      'context':question.context,
      'u_name':question.u_name,
    }
    return this.http.put(url,newquestion,this.httpOptions).pipe(
      tap( _ => this.log(`update question id = ${question.pk}`)),
      catchError(this.handleError<any>('updateQuestion'))
    );
  }

  addQuestion(question: Question): Observable<Question> {
    const url = `${this.questionsUrl}question/`;
    const newquestion={
      'token':this.userService.gettoken(),
      'title':question.title,
      'context':question.context,
      'u_name':this.userService.getusername(),
    }
    return this.http.post<Question>(url,newquestion,this.httpOptions).pipe(
      tap((newQuestion:Question)=>this.log(`added question w/ id = ${newQuestion.pk}`)),
      catchError(this.handleError<Question>('addQuestion'))
    );
  }

  deleteQuestion(question : Question | number): Observable<Question>  {
    const id = typeof question === 'number' ? question : question.pk;
    const url = `${this.questionsUrl}question/${id}/`;
    const newhttpOptions={
      'token': this.userService.gettoken(),
      headers: new HttpHeaders({  'Content-Type': 'application/json' })
    };
  
    return this.http.delete<Question>(url , newhttpOptions).pipe(
      tap(_ => this.log(`delete question id = ${id}`)),
      catchError(this.handleError<Question>('deleteQuestion'))
    );
  }

  searchQuestions(term : string):Observable<Question[]> {
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Question[]>(`${this.questionsUrl}question/?search=${term}`).pipe(
      tap(x=> x.length ?
        this.log(`found questions matching "${term}"`) :
        this.log(`no questions matching "${term}"`)),
        catchError(this.handleError<Question[]>('searchQuestion', []))
    );
  }

  postAnswer(answer: Answer):Observable<Answer>{
    const url = `${this.questionsUrl}answer/`;
    const newanswer={
      'token':this.userService.gettoken(),
      'qid':answer.qid,
      'context':answer.context,
      'u_name':this.userService.getusername(),
    }
    return this.http.post<Answer>(url,newanswer,this.httpOptions).pipe(

    );
  }
  deleteAnswer(answer : Answer | number): Observable<Question>  {
    const id = typeof answer === 'number' ? answer : answer.pk;
    const url = `${this.questionsUrl}answer/${id}/`;
  
    return this.http.delete<Question>(url , this.httpOptions).pipe(
      tap(_ => this.log(`delete question id = ${id}`)),
      catchError(this.handleError<Question>('deleteQuestion'))
    );
  }
}


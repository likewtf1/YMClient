import { Injectable } from '@angular/core';
import { UserService} from './user.service';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {
    constructor(private userService:UserService){}
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
        const authToken = this.userService.gettoken();
        const newReq=req.clone({
            headers:req.headers.set('token',authToken)});

        return next.handle(newReq);
  }
}
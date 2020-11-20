import { Component, OnInit ,Input } from '@angular/core';
import { UrlSegment } from '@angular/router';
import { User } from '../user';
import { UserService} from '../user.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user:User;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }
  login(username:string, password:string ):void {
    this.userService.login(username,password).subscribe(user=> user.token?(this.user=user,this.userService.user.name=username):window.alert("login error"));
  }
  register(username:string, password:string ):void {
    this.userService.register(username,password).subscribe(user=> user.token?(this.user=user,this.userService.user.name=username):window.alert("register error"));
  }
}

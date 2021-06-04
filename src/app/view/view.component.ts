import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ServiceService } from '../service.service';
import { filter, takeUntil } from 'rxjs/operators';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  id: any;
  login: any;

  subscribe: Subject<any> = new Subject<any>();
  navigationSubscription: any;
  img: any;
  details: any;
  constructor(private activateroute:ActivatedRoute,private service:ServiceService,) {
    this.activateroute.params.subscribe((params: Params) => this.login = params['login']);
    console.log(this.login);
   }

  ngOnInit(): void {
    this.getProfileById();
  }
getProfileById(){
  this.service.getRequestById(this.login).pipe(takeUntil(this.subscribe)).subscribe((res:any)=>{
    console.log(res)
    this.details=res;
    this.img=res.avatar_url;
  },error=>{
    console.log(error);
    
  })
};
}

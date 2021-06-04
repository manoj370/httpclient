import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { ServiceService } from '../service.service';
import { filter, takeUntil } from 'rxjs/operators';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [
    ServiceService // added class in the providers
  ]
})
export class DashboardComponent implements OnInit,OnDestroy  {
  names: any;
  searchForm: FormGroup;
  value: any;
  public filterdata!: string;
  selectedname: any;
  subscribe: Subject<any> = new Subject<any>();
  navigationSubscription: any;
  msg: any;
  rowId = 0;
  pageId = 10;
  pageCount: any;
  totalcount: any;
  constructor(private service:ServiceService,private fb:FormBuilder,private router:Router) {
    this.searchForm=this.fb.group({
      search:['']
    })
   }
 

  ngOnInit(): void {
    this.getCall();
    // this.msg ="Please search anything for the data.Ex:ericallam"
  }
  search(value:any){
    console.log(value)
// this.value=JSON.stringify(this.searchForm.value);
console.log(this.searchForm.value.search.length);
if(this.searchForm.value.search.length>0) {
this.service.sendGetRequest(this.searchForm.value.search).pipe(takeUntil(this.subscribe)).subscribe((res:any)=>{
  console.log(res.items);
  this.totalcount =res.total_count;
  this.names =res.items;
},error=>{
  console.log(error);
})}else if(this.searchForm.value.search.length===0){
  // this.msg ="Please search anything for the data.Ex:ericallam"
  this.getCall();
  this.names=[];
}

  }
 
  SelectedName(login:any){
    console.log(login);
    this.router.navigate(['/view', { login: login }]);
  }
  chart(login:any){
    console.log(login);
    this.router.navigate(['/chart', { login: login }]);
  }
 getCall(){
  this.service.sendGetRequest('erica').pipe(takeUntil(this.subscribe)).subscribe((res:any)=>{
    console.log(res.items);
    this.names =res.items;
  },error=>{
    console.log(error);
  })
 }

  ngOnDestroy(): void {
    this.subscribe.next();
    this.subscribe.complete();
    if (this.navigationSubscription) {  
      this.navigationSubscription.unsubscribe();
   }

  }
}

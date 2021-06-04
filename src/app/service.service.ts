import { Injectable } from '@angular/core';
import { HttpServiceService } from './httpservice';
import { urlServices } from './serviceUrls';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(public urlservices:urlServices,private http:HttpServiceService) { 

  }
   sendGetRequest(x:any){
    return this.http.get(this.urlservices.getCall+'?q='+x);
  }
  getRequestById(x:any){
    return this.http.get(this.urlservices.getCallById +x);
  }

}

import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Subscriber } from 'rxjs';


export interface RequestQueueItem{
  eventObserver: Subscriber<HttpEvent<any>>;
  request: HttpRequest<any>;
  handler: HttpHandler
}

@Injectable({
  providedIn: 'root'
})
export class StuckedRequestsService {
  public requestQueue : RequestQueueItem[]=[] ;
  constructor() { }

  public resendStuckedRequestes(token:string){
    let requestPackage;
    while((requestPackage=this.requestQueue.pop()) !== null && requestPackage!= undefined ){ 
      
      let newHeaders = new HttpHeaders({
        ['Authorization']:'Bearer ' + token,
        ['Content-Type']:'application/json'
      });
      
      let newRequest = requestPackage.request.clone({
        headers: newHeaders
      });
     
      this.processRequest(requestPackage.eventObserver, newRequest, requestPackage.handler);
    }
  }


  private processRequest(eventObserver, request, handler) {

    handler.handle(request).subscribe(
        (event: HttpEvent<any>) => { eventObserver.next(event); },
        (err: any) => {
          console.log(err);
        },
        () => { eventObserver.complete(); }
    );
  }
}

import { Injectable } from '@angular/core';
import { Http, Jsonp, URLSearchParams, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import { serialize } from "serializer.ts/Serializer";
import { RootObject } from '../models/root-model';


@Injectable()
export class RestapiService {

    baseUrl = "http://hetalia.wikia.com/api/v1/Articles/";
    finalResponse1 = new Observable<RootObject[]>();
    item:any;
    constructor(public http: Http) {
    
    }

    fetchSingleItem(title){
            var url = this.baseUrl + "Details&titles=" + title;
           
            let headers = new Headers({ 'Content-Type': 'application/json' , 'Api-User-Agent': 'lamiajoyee/1.0', 'origin':'https://www.mediawiki.org'});
            let options = new RequestOptions({ headers: headers });
            
            var finalResponse = this.http.post(url , options).map((res: Response) => {
               this.item = res.json();
               return this.item;
            })
            return finalResponse;     
    }
        
    fetchSingleItemDetails(title, paramType){
        if(paramType=="id"){
            var urlWithId='http://hetalia.wikia.com/api/v1/Articles/AsSimpleJson&id=' + title;
            let headers = new Headers({ 'Content-Type': 'application/json' , 'Api-User-Agent': 'lamiajoyee/1.0', 'origin':'https://www.mediawiki.org'});
            let options = new RequestOptions({ headers: headers });
            var finalResponse = this.http.post(urlWithId , options).map((res => res.json()));
            return finalResponse;
        }
        else{
            var url1 = this.baseUrl + "Details&titles=" + title;
            
            let headers = new Headers({ 'Content-Type': 'application/json' , 'Api-User-Agent': 'lamiajoyee/1.0', 'origin':'https://www.mediawiki.org'});
            let options = new RequestOptions({ headers: headers });
            
            var url2='http://hetalia.wikia.com/api/v1/Articles/AsSimpleJson&id=';
        
            this.finalResponse1= this.http.post(url1 , options).map((res: Response) => {
                this.item = this.returnSingleObj(res.json());
                return this.item;
                })
                .flatMap((item) => this.http.get(url2 + item.id)).map((res => res.json())).map(res => serialize<RootObject[]>(res));
             
            return this.finalResponse1;
            
        }
    }
 
    returnSingleObj(fullObject){
        for(var id in fullObject.items){
             return fullObject.items[id];     
       }
    }
}



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

        getAllCharacters(title:string): Observable<RootObject[]>{
            let characters = this.http
            .post(this.baseUrl+"Details&titles="+title, {headers: this.getHeaders()})
            .map(mapCharacters);
            return characters;
        }

        getCharacterDetails(id:number): Observable<RootObject[]>{
            let characters = this.http
            .get(this.baseUrl+"AsSimpleJson&id="+id)
            .map(mapCharacterDetails);
            return characters;
        }
    
        private getHeaders(){
            let headers = new Headers({ 'Content-Type': 'application/json' , 'Api-User-Agent': 'lamiajoyee/1.0', 'origin':'https://www.mediawiki.org'});
            let options = new RequestOptions({ headers: headers });
            return options;
        }
    }

    function mapCharacterDetails(response:Response): RootObject[]{
        return toCharacterDetails(response.json().sections);
    }

    function toCharacterDetails(r:RootObject[]): RootObject[]{
        var characters:RootObject[]=[];
        for(var i in r){
            let character = <RootObject>({
                title: r[i].title,
                level: r[i].level,
                thumbnail: r[i].thumbnail,
                id: r[i].id,
                content:r[i].content,
                images:r[i].images,
                sections:r[i].sections
            });
            characters.push(character);
        }
        console.log('Parsed person2:', characters);
        return characters;
    }

    function mapCharacters(response:Response): RootObject[]{
        return toCharacters(response.json().items);
    }

    function toCharacters(r:RootObject[]): RootObject[]{
        var characters:RootObject[]=[];
        for(var i in r){
            let character = <RootObject>({
                title: r[i].title,
                level: r[i].level,
                thumbnail: r[i].thumbnail,
                id: r[i].id,
                content:r[i].content,
                images:r[i].images,
                sections:r[i].sections
            });
            characters.push(character);
        }
        console.log('Parsed person:', characters);
        return characters;
    }

    /*function mapPerson(response:Response): RootObject{
        return toPerson(response.json());
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
    }*/



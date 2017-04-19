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
            .map(function(x) { return mapCharacter(x, "items"); });
            return characters;
        }

        getCharacterDetails(id:number): Observable<RootObject[]>{
            let characters = this.http
            .get(this.baseUrl+"AsSimpleJson&id="+id)
            .map(function(x) { return mapCharacter(x, "sections"); });
            return characters;
        }
    
        getAnyPropertyFromTitle(title:string, propertyName:string): Observable<string>{
            let characters = this.http
            .post(this.baseUrl+"Details&titles="+title, {headers: this.getHeaders()})
            .map(function(x) { return mapProperty(x, propertyName); });
            return characters;
        }

        private getHeaders(){
            let headers = new Headers({ 'Content-Type': 'application/json' , 'Api-User-Agent': 'lamiajoyee/1.0', 'origin':'https://www.mediawiki.org'});
            let options = new RequestOptions({ headers: headers });
            return options;
        }
    }

    function mapCharacter(response:Response, key:string): RootObject[]{
        // list
        if(key=="sections"){
            return returnCharacter(response.json().sections);
        }
        // details
        else if(key=="items"){
            return returnCharacter(response.json().items);
        }
    }

    function mapProperty(response:Response, key:string): string{
            return returnProperty(response.json().items, key);
    }

    function returnCharacter(r:RootObject[]): RootObject[]{
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
        console.log('Parsed personinfinnity:', characters);
        return characters;
    }

    function returnProperty(r:RootObject, s:string): string{
        //var r=response.json();
        for(var i in r){
            console.log("sdsssdsdds", r[i][s]);
           return r[i][s];
        }
    }
   
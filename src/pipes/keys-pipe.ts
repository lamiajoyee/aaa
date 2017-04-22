import { PipeTransform, Pipe } from '@angular/core';
import { Storage } from '@ionic/storage';
import { RestapiService } from '../providers/restapi-service';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
    
    constructor(public storage: Storage, public restapiService:RestapiService) {
        
    }

    charactersListArray : Array<string> = ["Italy", "Germany", "Japan", "America", "England", "England/UK/Britain", "France", "China", "Russia"];

    transform(value:any) : any {
            if(value==""){
                return "lol";
            }
            else{
                return value;
            } 

  }
}
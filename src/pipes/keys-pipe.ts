import { PipeTransform, Pipe } from '@angular/core';
import { Storage } from '@ionic/storage';
import { RestapiService } from '../providers/restapi-service';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
    
    constructor(public storage: Storage, public restapiService:RestapiService) {
        
    }

    charactersListArray : Array<string> = ["Italy", "Germany", "Japan", "America", "England", "England/UK/Britain", "France", "China", "Russia"];

    transform(value:any) : any {
            this.charactersListArray.forEach((a)=>{
                if(a==value){
                   return this.restapiService.getAnyPropertyFromTitle(a, "thumbnail");
                }
            })

  }
}
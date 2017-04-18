import { PipeTransform, Pipe } from '@angular/core';
import { Storage } from '@ionic/storage';

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
    
    constructor(public storage: Storage) {
        
    }


    transform(value) : any {
        this.storage.ready().then(() => {
            var fullKey = value+"-thumb";
            return this.storage.get(fullKey).then((val) => {
                console.log('Your age is', val);
                
            })
        });
    
  }
}
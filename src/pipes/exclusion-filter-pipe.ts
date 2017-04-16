import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name: 'exclusionfilter',
    pure: false
})

@Injectable()
export class ExclusionFilterPipe implements PipeTransform {
    transform(value: any) {
        if((value!=null)&& (value.toLowerCase().indexOf("main article") != -1)){
            return '';
        }
        if((value!=null)&& (value.toLowerCase().indexOf("north italy") != -1)){
            return '';
        }
        else return value;
  }
}
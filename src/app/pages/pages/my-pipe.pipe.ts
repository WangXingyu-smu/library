import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mypipe'
})
export class MyPipePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value === 0){
      return '新书'
    }else if (value ===1){
      return '旧书'
    }else{
      return '已丢失'
    }
    ;
  }

}

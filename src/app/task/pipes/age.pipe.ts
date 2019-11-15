import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: string, now: number): string {
    const valueDate = Date.parse(value);
    const offsetInMinutes = (new Date()).getTimezoneOffset();

    return  (Math.floor((now-valueDate) / 1000 / 60) + offsetInMinutes).toString();
  }

}

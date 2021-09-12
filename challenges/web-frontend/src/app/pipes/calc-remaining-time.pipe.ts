import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calcRemainingTime'
})
export class CalcRemainingTimePipe implements PipeTransform {

  transform(value: any, remSeconds: any): string {
    let totalSeconds = remSeconds;
    let hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    totalSeconds %= 3600;
    let minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");;
    let seconds = String(totalSeconds % 60).padStart(2, "0");

    return hours + "h:" + minutes + "m:" + seconds + "s";
  }

}

import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Logger {

  warn(message: string): void {
    console.warn(message);
  }

  error(message: string): void {
    console.error(message);
  }

  info(message: string): void {
    console.info(message);
  }

}

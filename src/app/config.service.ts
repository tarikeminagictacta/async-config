import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  config: any;

  constructor(private http: HttpClient) {}
  initialize(): Promise<boolean> {
    console.log('config init');
    return new Promise((resolve, reject) => {
      this.http
        .get('./assets/config/config.json')
        .pipe(
          tap(data => {
            console.log('config resolve');
            this.config = data;
            resolve(true);
          }),
          catchError(() => {
            resolve(false);
            return of();
          })
        )
        .subscribe();
    });
  }
}

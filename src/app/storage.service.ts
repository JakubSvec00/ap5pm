import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  /**
   * Save data to key
   *
   * @param key
   * @param data
   */
  async saveData(key: string, data: any) {
    await Preferences.set({
      key,
      value: JSON.stringify(data),
    });
  }

  /**
   * Get data from key
   *
   * @param key
   */
  getData(key: string): Observable<any> {
    return new Observable((observer) => {
      Preferences.get({ key }).then(({ value }) => {
        if (value) {
          observer.next(JSON.parse(value));
        } else {
          this.saveData(key, [])
          observer.next(null);
        }
        observer.complete();
      });
    });
  }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<string>('');
  public data$: Observable<string> = this.dataSubject.asObservable();
  constructor() {}

  isAuthenticated() {
    if (typeof window !== 'undefined' && window.localStorage) {

    return (localStorage.getItem('token'))
  }else
return 0}
  updateData(newData: {}): void {
    this.dataSubject.next(newData);
  }
  login(body: any) {

    const url = `/api/example`;
    if (body.email === 'email@admin.com'){
      return '0'
    }
    // replace with api is provided 
    // return this.http.post<any>(url, body); 
  else {
    return '1'
  }
   }

 

  


}

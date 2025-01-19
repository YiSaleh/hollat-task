import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<string>('');
  public data$: Observable<string> = this.dataSubject.asObservable();
  constructor(private http: HttpClient) {}

  isAuthenticated() {
    return !!localStorage.getItem('token');
  }
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

 

  signUp(body: any) {
    const url = `/api/merchant/auth/register`;
    return this.http.post<any>(url, body);
  }


}

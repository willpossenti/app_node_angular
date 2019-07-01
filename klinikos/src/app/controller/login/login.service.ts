import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Return } from '../../model/Return';
import { User } from '../../model/User';


@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private baseUrl: string;
  private cadecoUrl: string;


  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })

  };


  constructor(private http: HttpClient) {
        this.baseUrl = 'https://localhost:44307/api/';
        //this.baseUrl = 'https://apinew.ecosistemas.com.br/api/';
        this.cadecoUrl = 'https://integrador.ecosistemas.com.br/auth-rest/api/auth/login';
  }


  Authenticate(user: User) { return this.http.post<Return>(`${this.baseUrl}authenticate`, user, this.httpOptions); }
  AuthenticateCadeco(user: any) { return this.http.post<any>(`${this.cadecoUrl}`, user, this.httpOptions); }




}

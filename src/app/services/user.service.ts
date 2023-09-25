import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly api = 'https://controle-horas-delta.vercel.app'

  constructor(
    private HttpClient: HttpClient
  ) { }

  login(user: User): Observable<User>{
    const url =  `${this.api}/login`
    return this.HttpClient.post<User>(url, user);
  } 
}

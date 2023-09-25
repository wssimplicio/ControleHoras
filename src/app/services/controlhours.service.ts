import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ControlHours } from '../interfaces/controlhours';

@Injectable({
  providedIn: 'root'
})
export class ControlhoursService {

  private readonly api = 'https://controle-horas-delta.vercel.app/apontar'

  constructor(
    private HttpClient: HttpClient
  ) { }

  showCheckPoints(id: number): Observable<ControlHours[]>{
    const url = `${this.api}/${id}`
    return this.HttpClient.get<ControlHours[]>(url)
  }

  saveCheckPoint(checkPoint: ControlHours): Observable<ControlHours>{
    return this.HttpClient.post<ControlHours>(this.api, checkPoint)
  }

  deleteCheckPoint(id: number): Observable<ControlHours>{
    const url = `${this.api}/${id}`
    return this.HttpClient.delete<ControlHours>(url)
  }
}

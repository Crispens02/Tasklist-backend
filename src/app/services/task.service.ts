

import { environment } from 'src/environments/environment';
import { Task } from 'src/app/Model/Task';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import {Observable, of} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class taskService {


  URL = 'http://localhost:8080/tasks/'
  

  constructor(private httpClient : HttpClient) { }

    public lista(): Observable<Task[]>{
      return this.httpClient.get<Task[]>(this.URL + 'lista');
    }

  public detail(id: number): Observable<Task>{
    return this.httpClient.get<Task>(this.URL + `detail/${id}`);
  }

  public save(task: Task): Observable<any>{
    return this.httpClient.post<any>(this.URL + 'create', task);
  }

  public update(id: number, task: Task): Observable<any>{
    return this.httpClient.put<any>(this.URL + `update/${id}`, task);
  }

  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.URL + `delete/${id}`);
  }


}


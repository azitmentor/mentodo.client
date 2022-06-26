import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  APIURL = "http://todoapi.azitmentor.hu/todo";
  constructor(private http: HttpClient) { }

  getList(): Observable<any> {
    return this.http.get(this.APIURL);
  }

  saveItem(item: any): Observable<any> {
    return this.http.post(this.APIURL + "/save", item);
  }

  deleteItem(id: number): Observable<any> {
    return this.http.delete(this.APIURL + "/" + id);
  }

}

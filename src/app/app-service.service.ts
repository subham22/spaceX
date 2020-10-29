import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, tap} from 'rxjs/operators'
import { isBoolean } from 'util';
@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  
  constructor(public http : HttpClient) { }
  API_URL = "https://api.spaceXdata.com/v3/launches?limit=100"
  getData(params?){
    return this.http.get(this.API_URL + params  )
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Environment} from './environment';

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  environment: Environment;

  constructor(private http: HttpClient) {
    this.environment = new Environment();
  }

  getUnassignedBikes() {
    return this.http.get(this.environment.urlBike + '/unassigned');
  }
}

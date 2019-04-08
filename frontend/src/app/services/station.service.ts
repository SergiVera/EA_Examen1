import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from './environment';
import {Station} from '../models/station';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  environment: Environment;

  constructor(private http: HttpClient) {
    this.environment = new Environment();
  }

  getStations() {
    return this.http.get(this.environment.urlStation);
  }

  getStationDetail(id: string) {
    return this.http.get(this.environment.urlStation + `/${id}`);
  }

  getStationBikeDetail(id: string) {
    return this.http.get(this.environment.urlStation + `/${id}` + '/bikedetail');
  }

  postStation(station: Station) {
    return this.http.post(this.environment.urlStation, station);
  }

  postBikeStation(ids: object) {
    return this.http.post(this.environment.urlStation + '/addbike', ids);
  }

  deleteBikeStation(stationId: string, bikeId: string) {
    return this.http.delete(this.environment.urlStation + `/${stationId}` + '/deletebike' + `/${bikeId}`);
  }

  deleteStation(id: string) {
    return this.http.delete(this.environment.urlStation + `/${id}`);
  }
}

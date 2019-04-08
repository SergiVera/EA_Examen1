import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from './environment';

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

  getStationBikeDetail(id: string) {
    return this.http.get(this.environment.urlStation + `/${id}` + '/bikedetail');
  }

  postBikeStation(ids: object) {
    return this.http.post(this.environment.urlStation + '/addbike', ids);
  }

  deleteBikeStation(stationId: string, bikeId: string) {
    return this.http.delete(this.environment.urlStation + `/${stationId}` + '/deletebike' + `/${bikeId}`);
  }
}

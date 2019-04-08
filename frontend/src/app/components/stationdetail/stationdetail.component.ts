import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StationService} from '../../services/station.service';
import {Station} from '../../models/station';
import {BikeService} from "../../services/bike.service";
import {Bike} from "../../models/bike";

@Component({
  selector: 'app-stationdetail',
  templateUrl: './stationdetail.component.html',
  styleUrls: ['./stationdetail.component.css']
})
export class StationdetailComponent implements OnInit {

  stationBikeDetail: Station;
  unassignedBikes: Bike[];
  body: object;

  constructor(private activatedRouter: ActivatedRoute, private stationService: StationService, private bikeService: BikeService) {
   this.stationBikeDetail = new Station();
   this.unassignedBikes = [];
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      if (typeof params.id !== 'undefined') {
        this.stationBikeDetail._id = params.id;
      } else {
        this.stationBikeDetail._id = '';
      }
    });
    this.getBikeDetail(this.stationBikeDetail._id);
    this.getUnassignedBikes();
  }

  async getUnassignedBikes() {
    await this.bikeService.getUnassignedBikes()
      .subscribe(res => {
        console.log(res);
        this.unassignedBikes = res as Bike[];
      });
    console.log(this.unassignedBikes);
  }

  async getBikeDetail(id: string) {
    await this.stationService.getStationBikeDetail(id)
      .subscribe(res => {
        console.log(res);
        this.stationBikeDetail = res as Station;
      });
    console.log(this.stationBikeDetail);
  }

  async deleteBikeStation(id: string, i: number) {
    if (confirm('Are yo sure you want to delete it?')) {
      await this.stationService.deleteBikeStation(this.stationBikeDetail._id, id)
        .subscribe(res => {
            console.log(res);
            this.stationBikeDetail.bikes.splice(i, 1);
            this.getUnassignedBikes();
          },
          err => {
            console.log(err);
          });
      }
    }

  async addBikeStation(id: string, i: number) {
    this.body = {
      stationId: this.stationBikeDetail._id,
      bikeId: id
    };
    await this.stationService.postBikeStation(this.body)
      .subscribe(res => {
          console.log(res);
          this.unassignedBikes.splice(i, 1);
          this.getBikeDetail(this.stationBikeDetail._id);
        },
        err => {
          console.log(err);
        });
  }
}

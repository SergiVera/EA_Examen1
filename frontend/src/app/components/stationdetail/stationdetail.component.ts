import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StationService} from '../../services/station.service';
import {Station} from '../../models/station';

@Component({
  selector: 'app-stationdetail',
  templateUrl: './stationdetail.component.html',
  styleUrls: ['./stationdetail.component.css']
})
export class StationdetailComponent implements OnInit {

  stationBikeDetail: Station;

  constructor(private activatedRouter: ActivatedRoute, private stationService: StationService) {
   this.stationBikeDetail = new Station();
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
  }

  async getBikeDetail(id: string) {
    await this.stationService.getStationBikeDetail(id)
      .subscribe(res => {
        console.log(res);
        this.stationBikeDetail = res as Station;
      });
    console.log(this.stationBikeDetail);
  }

  deleteStudentSubject(id: string, i: number) {
    if (confirm('Are yo sure you want to delete it?')) {
      this.stationService.deleteBikeStation(this.stationBikeDetail._id, id)
        .subscribe(res => {
            console.log(res);
            this.stationBikeDetail.bikes.splice(i, 1);
          },
          err => {
            console.log(err);
          });
      }
    }
}

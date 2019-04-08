import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BikeService} from '../../services/bike.service';
import {Station} from '../../models/station';
import {Router} from '@angular/router';
import {StationService} from '../../services/station.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [StationService]
})
export class DashboardComponent implements OnInit {

  stations: Station[];

  constructor(private bikeService: BikeService, private router: Router,
              private stationService: StationService) {
  }

  ngOnInit() {
    this.getStations();
  }

  getStations() {
    this.stationService.getStations()
      .subscribe(res => {
        console.log(res);
        this.stations = res as Station[];
      });
  }

  bikeStationDetail(id: string) {
    this.stationService.getStationBikeDetail(id)
      .subscribe( res => {
          this.router.navigate(['/bikesdetail', id]);
        },
        err => {
          console.log(err);
          this.handleError(err);
        });
  }

  private handleError(err: HttpErrorResponse) {
    if ( err.status === 500 ) {
      alert(err.message);
    }
  }
}

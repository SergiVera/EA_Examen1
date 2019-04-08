import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SubjectService} from '../../services/subject.service';
import {Subject} from '../../models/subject';

@Component({
  selector: 'app-stationdetail',
  templateUrl: './stationdetail.component.html',
  styleUrls: ['./stationdetail.component.css']
})
export class StationdetailComponent implements OnInit {

  subjectStudentDetail: Subject;
  body: object;

  constructor(private activatedRouter: ActivatedRoute, private subjectService: SubjectService) {
    this.subjectStudentDetail = new Subject();
  }

  ngOnInit() {
    this.activatedRouter.params.subscribe(params => {
      if (typeof params.id !== 'undefined') {
        this.subjectStudentDetail._id = params.id;
      } else {
        this.subjectStudentDetail._id = '';
      }
    });
    this.getStudentDetail(this.subjectStudentDetail._id);
  }

  async getStudentDetail(id: string) {
    await this.subjectService.getStudentSubjectDetail(id)
      .subscribe(res => {
        console.log(res);
        this.subjectStudentDetail = res as Subject;
      });
    console.log(this.subjectStudentDetail);
  }

  deleteStudentSubject(id: string, i: number) {
    this.body = {
      subjectId: this.subjectStudentDetail._id,
      studentId: id
    };
    if (confirm('Are yo sure you want to delete it?')) {
      this.subjectService.deleteStudentSubject(this.body)
        .subscribe(res => {
            this.subjectStudentDetail.students.splice(i, 1);
          },
          err => {
            console.log(err);
          });
      }
    }
}

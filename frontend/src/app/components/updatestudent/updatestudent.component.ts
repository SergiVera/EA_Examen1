import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Phone} from '../../models/phone';
import {StudentService} from '../../services/student.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Student} from '../../models/student';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-updatestudent',
  templateUrl: './updatestudent.component.html',
  styleUrls: ['./updatestudent.component.css']
})

export class UpdatestudentComponent implements OnInit {

  studentForm: FormGroup;

  validation_messages: any;

  student: Student;

  phones: Phone[];

  constructor(private studentService: StudentService, private router: Router,
              private formBuilder: FormBuilder, private activatedRouter: ActivatedRoute) {

    this.student = new Student();
    this.phones = [];

    this.studentForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/[A-Z][a-zA-Z][^#&<>"~;$^%{}?]{1,20}$/)])),

      address: new FormControl('', Validators.compose([
        Validators.required])),

      phoneHome: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/\(?([0-9]{2})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)])),

      phoneWork: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern(/\(?([0-9]{2})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/)]))
    });
  }

  ngOnInit() {
    this.validation_messages = {
      name: [
        { type: 'required', message: 'Name is required' },
        { type: 'pattern', message: 'Name must be valid. Cannnot contain any number' }
      ],
      address: [
        { type: 'required', message: 'Address is required' }
      ],
      phoneHome: [
        { type: 'required', message: 'Phone Home is required' },
        { type: 'pattern', message: 'Number must be valid' },
        { type: 'error', message: 'Internal Server Error' }
      ],
      phoneWork: [
        { type: 'required', message: 'Phone Work is required' },
        { type: 'pattern', message: 'Number must be valid' },
      ]
    };

    this.activatedRouter.params.subscribe(params => {
      if (typeof params.id !== 'undefined') {
        this.student._id = params.id;
      } else {
        this.student._id = '';
      }
    });
    this.getStudent(this.student._id);
  }

  getStudent(id: string) {
    this.studentService.getSingleStudent(id)
      .subscribe(res => {
        console.log(res);
        this.student = res as Student;
      });
    console.log(this.student);
  }

  updateStudent() {
    this.studentService.putStudent(this.student)
      .subscribe(res => {
        console.log(res);
        this.router.navigateByUrl('/dashboard');
      }, err => {
        this.handleError(err);
      });
  }

  private handleError(err: HttpErrorResponse) {
    if ( err.status === 500 ) {
      this.studentForm.get('phoneHome').setErrors({error: true});
    }
  }
}

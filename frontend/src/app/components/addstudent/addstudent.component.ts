import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {StudentService} from "../../services/student.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Student} from "../../models/student";
import {Phone} from "../../models/phone";

@Component({
  selector: 'app-addstudent',
  templateUrl: './addstudent.component.html',
  styleUrls: ['./addstudent.component.css']
})
export class AddstudentComponent implements OnInit {

  studentForm: FormGroup;

  validation_messages: any;

  phones: Phone[];

  constructor(private studentService: StudentService, private router: Router, private formBuilder: FormBuilder) {

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
  }

  addStudent() {
    const student = new Student();
    this.phones.push({
      key: 'work',
      value: this.studentForm.value.phoneWork
    });
    this.phones.push({
      key: 'home',
      value: this.studentForm.value.phoneHome
    })
    student.name = this.studentForm.value.name;
    student.address = this.studentForm.value.address;
    student.phones = this.phones;
    console.log(this.phones);
    console.log(student);
    this.studentService.postStudent(student)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigateByUrl('/dashboard');
        },
        err => {
          console.log(err);
          this.handleError(err);
        });
  }

  private handleError(err: HttpErrorResponse) {
    if ( err.status === 500 ) {
      this.studentForm.get('phoneWork').setErrors({error: true});
    }
  }

}

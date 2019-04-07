import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Environment} from './environment';
import {Student} from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  environment: Environment;

  constructor(private http: HttpClient) {
    this.environment = new Environment();
  }

  getStudents() {
    return this.http.get(this.environment.urlStudent);
  }

  getSingleStudent(id: string) {
    return this.http.get(this.environment.urlStudent + `/${id}`);
  }

  postStudent(student: Student) {
    return this.http.post(this.environment.urlStudent, student);
  }

  putStudent(student: Student) {
    return this.http.put(this.environment.urlStudent + `/${student._id}`, student);
  }

  deleteStudent(id: string) {
    return this.http.delete(this.environment.urlStudent + `/${id}`);
  }
}

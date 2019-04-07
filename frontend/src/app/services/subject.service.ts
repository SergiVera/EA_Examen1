import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student';
import { Environment } from './environment';
import {Subject} from '../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  environment: Environment;

  constructor(private http: HttpClient) {
    this.environment = new Environment();
  }

  getSubjects() {
    return this.http.get(this.environment.urlSubject);
  }

  getSubjectDetail(id: string) {
    return this.http.get(this.environment.urlSubject + `/${id}`);
  }

  getStudentSubjectDetail(id: string) {
    return this.http.get(this.environment.urlSubject + `/${id}` + '/studentdetail');
  }

  postSubject(name: object) {
    return this.http.post(this.environment.urlSubject, name);
  }

  postStudentSubject(ids: object) {
    return this.http.post(this.environment.urlSubject + '/addstudent', ids);
  }

  deleteStudentSubject(ids: object) {
    return this.http.put(this.environment.urlSubject + '/deletestudent', ids);
  }

  deleteSubject(id: string) {
    return this.http.delete(this.environment.urlSubject + `/${id}`);
  }
}

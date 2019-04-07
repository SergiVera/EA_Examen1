import {Student} from './student';

export class Subject {
  _id: string;
  name: string;
  students: Student[];

  constructor(_id = '', name = '', students = null ) {
    this._id = _id;
    this.name = name;
    this.students = students;
  }
}

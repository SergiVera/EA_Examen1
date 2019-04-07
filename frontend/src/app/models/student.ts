import {Phone} from "./phone";

export class Student {
  _id: string;
  name: string;
  address: string;
  phones: Phone[];

  constructor(_id = '', name = '', address = '', phones = null) {
    this._id = _id;
    this.name = name;
    this.address = address;
    this.phones = phones;
  }
}

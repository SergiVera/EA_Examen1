# Minimo1

Students and Subjects CRUD using MEAN stack.

---

### Table of Contents

- [Models](#models)
- [How To Use](#how-to-use)
- [License](#license)
- [Author Info](#author-info)

## Models

##### StudentService schema

```javascript
const StudentSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phones: [{
        key: String,
        value: String
    }]
});
```

##### SubjectService schema

```javascript
const SubjectSchema = new Schema ({
    name: { type: String, required: true, unique: true },
    students: [{ type: Schema.ObjectId, ref: 'StudentService', unique: false }]
});
```

##### Routes

| Model | Type | Routes | Description |
| :---:| :---: | --- | --- |
| SUBJECT | GET | /subjects | Get all Subjects |
|  | GET | /subjects/**:subjectId** | Get the detail of a subject |
|  | GET | /subjects/**:subjectId**/studentdetail | Get the student detail of a subject |
|  | POST | /subjects/adduser | Add StudentService into a subject |
|  | POST | /subjects | Add a new subject |
|  | DELETE | /subjects/**:subjectId** | Delete SubjectService |
| STUDENT | GET | /students | Get all Students |
|  | POST | /students | Add a new student |
|  | DELETE | /students/**:studentId** | Delete StudentService |
|  | PUT | /students/**:studentId** | Update StudentService

##### Swagger

![Captura de pantalla 2019-04-05 a las 12 29 23](https://user-images.githubusercontent.com/43316590/55621663-71f76a00-579e-11e9-9153-77ed8ecf39f7.png)

#### Technologies

- node.js
- express
- mongoose
- angular

## How To Use

#### Installation

Libraries:

```
npm i
```

Run node project:

```
nodemon index.js
```
>(1) Keep it running on a separate cmd while you are working on your project in order to see the changes   

Install angular:

```
npm install -g @angular/cli
npm install --save-dev @angular-devkit/build-angular
```

>The second command is used in order to avoid future errors

Run mongoDB:

```
mongod
```

>(2) Keep it running on a separate cmd while you are working on your project in order to see the changes  

Run the project on local server:

```
ng serve --open
```
>CAUTION!: You have to be on .\frontend folder in order to run this line 

>(3) Keep it running on a separate cmd while you are working on your project in order to see the changes   

## License

MIT License

Copyright (c) [2017] [James Q Quick]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## Author Info

Sergi Vera

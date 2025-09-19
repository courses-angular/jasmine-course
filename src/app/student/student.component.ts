import { Component, inject } from '@angular/core';
import { StudentService } from './student.service';
import {FormsModule} from '@angular/forms';
import {NgClass, NgStyle} from '@angular/common';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    NgStyle
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent {
  tital = 'AngularUnitTestApp';
  sum = 0;
  result: any;
  studentCalcResult: string = '';
  countNumber = 0;
  private studentName = ''
  studentService = inject(StudentService);
  studentAge = 25;
  studentAddress = 'Hyderabad, India';
  studentPhone = 9876543210;
  type: string = 'number';
  placeholder: string = 'Enter Age';
  redColor = 'red';
  blueColor = 'blue';
  numberValueForClass = 15;

   pageHeader:string = 'Student information';
  FirstName: string = 'DotNet';
  LastName:string='Office';
  Branch:string='IT';
  Mobile:number=1234567890;
  Gender:string='Male';
  Age:number=25;
  ColumnSpan =2;
  arialable = "NewAriaLable"
  label: string = "Dotnet";

  studentName2:string = '';

  constructor() {
  }

  calculate(num1: number, num2: number) {
    this.sum = num1 + num2;
    return this.sum;
  }
  private calculate_private(num1: number, num2: number) {
    this.sum = num1 + num2;
    return this.sum;
  }

  saveData() {
    let info = {
      sumVal: this.calculate(5, 5),
      name: 'Dot Net Office',
    };
    this.SaveDataIntoConsole(info);
    this.studentService.SaveDetails(info).subscribe((response) => {
      this.result = response;
    });
  }

  studentResult() {
    if (this.calculate(10, 20) >= 40) {
      this.studentCalcResult = 'Pass';
      return this.studentCalcResult;
    } else {
      this.studentCalcResult = 'Fail';
      return this.studentCalcResult;
    }
  }

  private showMessage(msg: string): string {
    return msg;
  }

  SaveDataIntoConsole(info: any) {
    console.log(info);
  }
  increaseNumber() {
    this.countNumber = this.countNumber + 1;
  }

  decreaseNumber() {
    this.countNumber = this.countNumber - 1;
  }
  private showStudentName(): string{
     this.studentName ='Student Name';
     return this.studentName;
  }

  button1Click() {
    this.label = "DotNet office";
  }

  button2Click() {
    this.label = "label value change on button2";
  }

  onChangeInput() {
    this.label = "onChangeInput label value change";
  }

  onChangeLabelInput(event: Event) {
    this.label = (event.target as HTMLInputElement).value;
  }
  setName() {
    this.studentName2 = 'Test Name';
  }
}

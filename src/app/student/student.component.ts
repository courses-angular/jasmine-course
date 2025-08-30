import { Component, inject } from '@angular/core';
import { StudentService } from './student.service';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [],
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
}

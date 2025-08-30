import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StudentComponent } from './student.component';
import { StudentService } from './student.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;
  let h1: HTMLElement;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentComponent, HttpClientTestingModule],
      providers: [StudentService],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    h1 = fixture.nativeElement.querySelector('[data-testid="result"]');
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Spy on method for calculate ', () => {
    spyOn(component, 'calculate');
    component.saveData();
    expect(component.calculate).toHaveBeenCalled();
  });

  it('Spy method with params', () => {
    spyOn(component, 'calculate').and.returnValues(10, 20); // Spy on calculate method that mocks return values
    let result = component.studentResult();
    expect(result).toEqual('Fail');
  });

  it('Spy on service method with callFake', () => {
    let service = TestBed.inject(StudentService);
    spyOn(service, 'SaveDetails').and.callFake(() => {
      return of({ success: true });

    });
    spyOn(component, 'SaveDataIntoConsole').and.stub(); // Spy on SaveDataIntoConsole method with stub that does nothing
    component.saveData();
    expect(component.result).toEqual({ success: true });
  });

  it('verify h1 value with ChangeDetection', () => {
    component.studentResult()
    fixture.detectChanges(); // On every change the data we must use fixture.detectChanges()
    expect(h1.textContent).toBe(component.studentCalcResult);
  });

  it('verify btn with DebugElement', () => {
    const increaseBtn = debugElement.query(By.css('[data-testid="btnincreaseNumber"]'));
    const decreaseBtn = debugElement.query(By.css('[data-testid="btndecreaseNumber"]'));

    expect(increaseBtn).toBeTruthy();
    expect(decreaseBtn).toBeTruthy();
  });

  it('increase count click',()=> {
    const count = debugElement.query(By.css('[data-testid="count"]'));
    const increaseBtn = debugElement.query(By.css('[data-testid="btnincreaseNumber"]'));
    increaseBtn.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.countNumber).toEqual(+count.nativeElement.innerText);
  });

  it('decrease count click', () => {
    const count = debugElement.query(By.css('[data-testid="count"]'));
    const decreaseBtn = debugElement.query(By.css('[data-testid="btndecreaseNumber"]'));
    decreaseBtn.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.countNumber).toEqual(+count.nativeElement.innerText);
  });

  it('should test private method/variable', () => {
    let spyStudentName = spyOn<any>(component,'showStudentName')
    component['showStudentName'](); // Accessing private method using bracket notation
    expect(component['studentName']).toEqual('Student Name');
  });

  it('should test private calculate_private', () => {
    component['calculate_private'](10, 20); // Accessing private method using bracket notation
    expect(component.sum).toEqual(30);
  });


  it('should spyOn private method/variable', () => {
    let spyShowStudentName = spyOn<any>(component,'showStudentName')
    component['showStudentName'](); // Accessing private method using bracket notation
    expect(spyShowStudentName).toHaveBeenCalled();
  });

});

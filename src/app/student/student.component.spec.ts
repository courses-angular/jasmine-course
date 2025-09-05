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
  let studentAge: DebugElement;
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
    studentAge = debugElement.query(By.css('[data-testid="studentAge"]'));
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
    let spyStudentName = spyOn<any>(component, 'showStudentName').and.callThrough();
    component['showStudentName'](); // Accessing private method using bracket notation
    expect(spyStudentName).toHaveBeenCalled();
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

  it('should test string interpolation', () => {
     expect(+studentAge.nativeElement.innerText).toEqual(component.studentAge);

     // Change the age and verify again
     component.studentAge = 30;
     fixture.detectChanges();
     expect(+studentAge.nativeElement.innerText).toEqual(component.studentAge);
  });

  it('should test property binding for type and placeholder', () => {
    const inputElement = debugElement.query(By.css('[data-testid="inputAge"]'));
    expect(inputElement.attributes['type']).toBe(component.type);
    expect(inputElement.attributes['placeholder']).toBe(component.placeholder);

    // Change the type and placeholder and verify again
    component.type = 'text';
    component.placeholder = 'Enter Name';
    fixture.detectChanges();
    expect(inputElement.attributes['type']).toBe(component.type);
    expect(inputElement.attributes['placeholder']).toBe(component.placeholder);
  });

  it('should test property binding - ngClass/ngStyle', () => {
    const studentPortal = debugElement.query(By.css('[data-testid="student-portal"]'));
    const isNumber = debugElement.query(By.css('[data-testid="is-number"]'));
    expect(studentPortal.attributes['class']).toContain('red');
    expect(studentPortal.attributes['style']).toContain('font-weight: bold');
    expect(isNumber.attributes['class']).toContain('blue');

    // Change the numberValueForClass and verify again
    component.numberValueForClass = 5;
    fixture.detectChanges();
    expect(studentPortal.attributes['class']).toContain('red');
    expect(isNumber.attributes['class']).toContain('red');
    expect(studentPortal.attributes['style']).toContain('font-weight: normal');
  });

  it('should test attribute binding', () => {
    const colSpanElement = debugElement.query(By.css('[data-testid="col-span"]'));
    expect(+colSpanElement.attributes['colspan']!).toBe(component.ColumnSpan);

    const btnSave = debugElement.query(By.css('[data-testid="save-button"]'));
    console.log(btnSave.attributes);
    expect(btnSave.attributes['aria-label']).toEqual(component.arialable);
  })

});

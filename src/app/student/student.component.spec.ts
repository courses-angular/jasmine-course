import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {StudentComponent} from './student.component';
import {StudentService} from './student.service';
import {of} from 'rxjs';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;
  let h1: HTMLElement;
  let studentAge: DebugElement;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentComponent, HttpClientTestingModule, FormsModule],
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
      return of({success: true});
    });
    spyOn(component, 'SaveDataIntoConsole').and.stub(); // Spy on SaveDataIntoConsole method with stub that does nothing
    component.saveData();
    expect(component.result).toEqual({success: true});
  });

  it('verify h1 value with ChangeDetection', () => {
    component.studentResult();
    fixture.detectChanges(); // On every change the data we must use fixture.detectChanges()
    expect(h1.textContent).toBe(component.studentCalcResult);
  });

  it('verify btn with DebugElement', () => {
    const increaseBtn = debugElement.query(
      By.css('[data-testid="btnincreaseNumber"]')
    );
    const decreaseBtn = debugElement.query(
      By.css('[data-testid="btndecreaseNumber"]')
    );

    expect(increaseBtn).toBeTruthy();
    expect(decreaseBtn).toBeTruthy();
  });

  it('increase count click', () => {
    const count = debugElement.query(By.css('[data-testid="count"]'));
    const increaseBtn = debugElement.query(
      By.css('[data-testid="btnincreaseNumber"]')
    );
    increaseBtn.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.countNumber).toEqual(+count.nativeElement.innerText);
  });

  it('decrease count click', () => {
    const count = debugElement.query(By.css('[data-testid="count"]'));
    const decreaseBtn = debugElement.query(
      By.css('[data-testid="btndecreaseNumber"]')
    );
    decreaseBtn.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.countNumber).toEqual(+count.nativeElement.innerText);
  });

  it('should test private method/variable', () => {
    let spyStudentName = spyOn<any>(
      component,
      'showStudentName'
    ).and.callThrough();
    component['showStudentName'](); // Accessing private method using bracket notation
    expect(spyStudentName).toHaveBeenCalled();
    expect(component['studentName']).toEqual('Student Name');
  });

  it('should test private calculate_private', () => {
    component['calculate_private'](10, 20); // Accessing private method using bracket notation
    expect(component.sum).toEqual(30);
  });

  it('should spyOn private method/variable', () => {
    let spyShowStudentName = spyOn<any>(component, 'showStudentName');
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
    const studentPortal = debugElement.query(
      By.css('[data-testid="student-portal"]')
    );
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
    const colSpanElement = debugElement.query(
      By.css('[data-testid="col-span"]')
    );
    expect(+colSpanElement.attributes['colspan']!).toBe(component.ColumnSpan);

    const btnSave = debugElement.query(By.css('[data-testid="save-button"]'));
    console.log(btnSave.attributes);
    expect(btnSave.attributes['aria-label']).toEqual(component.arialable);
  });

  it('should test event binding - Button 1', () => {
    const button_1 = debugElement.query(By.css('[data-testid="button1"]'));

    expect(component.label).toBe('Dotnet');
    button_1.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.label).toBe('DotNet office');
  });

  it('should test event binding - Button 2', () => {
    const button_1 = debugElement.query(By.css('[data-testid="button2"]'));
    expect(component.label).toBe('Dotnet');

    button_1.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.label).toBe('label value change on button2');
  });

  it('should test event binding - Textbox 1', () => {
    const textbox1 = debugElement.query(By.css('[data-testid="textbox1"]'));
    expect(component.label).toBe('Dotnet');

    textbox1.triggerEventHandler('input', null);
    fixture.detectChanges();
    expect(component.label).toBe('onChangeInput label value change');
  });

  it('should test event binding - Textbox 2', () => {
    const textbox2 = debugElement.query(By.css('[data-testid="textbox2"]'));
    expect(component.label).toBe('Dotnet');

    // Create a spy on the onChangeLabelInput method
    spyOn(component, 'onChangeLabelInput').and.callThrough();

    // Create a mock event object with target value
    const mockEvent = {
      target: {
        value: 'Test Input Value Updated',
      },
    } as any;

    // Set the input value and trigger the event with the mock event
    textbox2.nativeElement.value = 'Test Input Value Updated';
    textbox2.triggerEventHandler('input', mockEvent);
    fixture.detectChanges();

    // Verify the spy was called and the label was updated
    expect(component.onChangeLabelInput).toHaveBeenCalledWith(mockEvent);
    expect(component.label).toBe(textbox2.nativeElement.value);
  });

  it('should test two way binding', (done) => {
    component.studentName2 = 'Updated student name';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const inputStudentName = debugElement.query(
        By.css('[data-testid="inputStudentName"]')
      );
      expect(inputStudentName.nativeElement.value).toBe('Updated student name');
      done();
    });
  });

  it('should reflect changes from textbox to component variable', (done) => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const inputStudentName = debugElement.query(
        By.css('[data-testid="inputStudentName"]')
      );
      inputStudentName.nativeElement.value = 'Updated student name';
      inputStudentName.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(inputStudentName.nativeElement.value).toEqual(
        component.studentName2
      );
      done();
    });
  });

  it('should test setName method', (done) => {
    fixture.detectChanges();
    const setNameBtn = debugElement.query(
      By.css('[data-testid="set-name-button"]')
    );
    fixture.whenStable().then(() => {
    });
    setNameBtn.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.studentName2).toBe('Test Name');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const inputStudentName = debugElement.query(
        By.css('[data-testid="inputStudentName"]')
      );
      expect(inputStudentName.nativeElement.value).toBe('Test Name');
      done();
    });
  });

  it('should test two way binding with async ', async () => {
    component.studentName2 = 'Updated student name';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const inputStudentName = debugElement.query(
        By.css('[data-testid="inputStudentName"]')
      );
      expect(inputStudentName.nativeElement.value).toBe('Updated student name');
    });
  });

  it('should test two way binding with fakeAsync ', fakeAsync(() => {
    component.studentName2 = 'Updated student name';
    fixture.detectChanges();
    tick();
    const inputStudentName = debugElement.query(
      By.css('[data-testid="inputStudentName"]')
    );
    expect(inputStudentName.nativeElement.value).toBe('Updated student name');

  }));
});

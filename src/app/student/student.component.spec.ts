import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StudentComponent } from './student.component';
import { StudentService } from './student.service';
import { of } from 'rxjs';

describe('StudentComponent', () => {
  let component: StudentComponent;
  let fixture: ComponentFixture<StudentComponent>;
  let h1: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentComponent, HttpClientTestingModule],
      providers: [StudentService],
    }).compileComponents();

    fixture = TestBed.createComponent(StudentComponent);
    component = fixture.componentInstance;
    h1 = fixture.nativeElement.querySelector('[data-testid="result"]');
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
});

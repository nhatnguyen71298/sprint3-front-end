import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpInstructorComponent } from './sign-up-instructor.component';

describe('SignUpInstructorComponent', () => {
  let component: SignUpInstructorComponent;
  let fixture: ComponentFixture<SignUpInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

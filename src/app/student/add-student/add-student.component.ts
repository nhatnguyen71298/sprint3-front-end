import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Student} from '../list-student/model/Student';
import {StudentService} from '../../service/student.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  public formAddNew: FormGroup;
  public student: Student;
  public list1;
  public list2;
  constructor(
    private studentService: StudentService,
    protected formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.studentService.getAllTeacherService().subscribe(data => {
      this.list1 = data;
    });
    this.studentService.getAllThesisService().subscribe(data => {
      this.list2 = data;
    });
    this.formAddNew = this.formBuilder.group({
      studentCode: ['', [Validators.required]],
      fullName: ['',
        [Validators.required]],
      topic: ['', [Validators.required]],
      teacher: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }
  createEmployee(): void {
    // if (this.formAddNew.invalid) {
    //   const tempControl = this.el.nativeElement.querySelector('form');
    //   tempControl.querySelector('.ng-invalid').focus();
    // }
    this.formAddNew.markAllAsTouched();
    if (this.formAddNew.valid) {
      this.studentService.addNewStudentService(this.formAddNew.value).subscribe(data2 => {
        // console.log(data2);
        if (data2 == null) {
          // console.log(data2);
          this.dialogRef.close();
        }
      }, error => {
        console.log(error);
      });
    } else {
      console.log('loi');
      console.log(this.formAddNew.value);
    }
  }

}

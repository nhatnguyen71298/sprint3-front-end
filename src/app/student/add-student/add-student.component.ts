import {Component, ElementRef, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Student} from '../list-student/model/Student';
import {StudentService} from '../../service/student.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MessageStudentComponent} from '../message-student/message-student.component';

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
  public idMessage = 1;
  constructor(
    private studentService: StudentService,
    protected formBuilder: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.studentService.getAllThesisService().subscribe(data => {
      this.list2 = data;
    });
    this.studentService.getAllTeacherService().subscribe(data => {
      this.list1 = data;
    });
    this.formAddNew = this.formBuilder.group({
      // tslint:disable-next-line:max-line-length
      studentCode: ['', [Validators.required,Validators.pattern('^SV-\\d{4}$'), this.studentService.validateWhitespace]],
      // tslint:disable-next-line:max-line-length
      fullName: ['', [Validators.required, this.studentService.validateSpecialCharacter, this.studentService.validateWhitespace, Validators.maxLength(50), Validators.minLength(5)]],
      topic: ['', [Validators.required]],
      teacher: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      phone: ['', [Validators.required, this.studentService.validPhoneNumber]],
    });
  }
  createEmployee(): void {
    if (this.formAddNew.invalid) {
      const tempControl = this.el.nativeElement.querySelector('form');
      tempControl.querySelector('.ng-invalid').focus();
    }
    this.formAddNew.markAllAsTouched();
    if (this.formAddNew.valid) {
      this.studentService.addNewStudentService(this.formAddNew.value).subscribe(data2 => {
        if (data2 == null) {
          this.dialogRef.close();
          this.openDialogMessage();
        }
      }, error => {
        console.log(error);
      });
    } else {
      console.log('loi');
      console.log(this.formAddNew.value);
    }
  }
  openDialogMessage() {
    const timeout = 1500;
    const dialogRef = this.dialog.open(MessageStudentComponent, {
      width: '500px',
      height: '300px',
      data: {dataMessage: this.idMessage},
      disableClose: true
    });
    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        dialogRef.close();
      }, timeout);
    });
  }

}

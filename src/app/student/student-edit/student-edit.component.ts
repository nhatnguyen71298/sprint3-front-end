import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {StudentService} from '../../service/student.service';
import {StudentMessageComponent} from '../student-message/student-message.component';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  public formEditStudent: FormGroup;
  public studentOfId;
  public idMessage = 2;
  public list1;
  public list2;
  constructor(
    private dialogRef: MatDialogRef<StudentEditComponent>,
    private studentService: StudentService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  ngOnInit() {
    // form thông tin khách hàng.
    this.studentService.getAllTeacherService().subscribe(data => { 
      this.list1 = data;
      // console.log(this.list1);
    });
    this.studentService.getAllThesisService().subscribe(data => {
      this.list2 = data;
    });
    this.formEditStudent = this.formBuilder.group({
      fullName: ['', [Validators.required, this.studentService.validateSpecialCharacter, Validators.minLength(3),
        Validators.maxLength(45), this.studentService.validateWhitespace]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      phone: ['', [Validators.required, this.studentService.validPhoneNumber]],
      studentCode: ['', [Validators.required,Validators.pattern('^SV-\\d{4}$'), this.studentService.validateWhitespace]],
      topic: ['', [Validators.required]],
      teacher: ['', [Validators.required]],
    });
    // Lấy dữ liệu đưa vào Dialog.
    this.studentOfId = this.data.data1.id;
    console.log(this.studentOfId);
    this.studentService.getStudentById(this.studentOfId).subscribe(getData => {
      console.log(getData);
      this.formEditStudent.patchValue(getData);
    });
  }// Chỉnh sửa thông tin khách hàng .
  editStudent() {
    this.formEditStudent.markAllAsTouched();
    console.log(this.formEditStudent.value);
    if (this.formEditStudent.valid) {
      this.studentService.editStudent(this.formEditStudent.value, this.studentOfId).subscribe(data => {
        if (data == null) {
          this.dialogRef.close();
          this.openDialogMessage();
        }
      });
    }
  }

  // Dialog thông báo chỉnh sửa thông tin sinh viên thành công.
  openDialogMessage() {
    const timeout = 2000;
    const dialogRef = this.dialog.open(StudentMessageComponent, {
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

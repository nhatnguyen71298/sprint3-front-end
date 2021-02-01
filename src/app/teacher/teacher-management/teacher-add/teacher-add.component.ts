import {Component, ElementRef, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import {TeacherManagementService} from '../../../service/teacher-management.service';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {SuccessComponent} from '../success/success.component';

@Component({
  selector: 'app-teacher-add',
  templateUrl: './teacher-add.component.html',
  styleUrls: ['./teacher-add.component.css']
})
export class TeacherAddComponent implements OnInit {
  public formAddNew: FormGroup;
  // private el: any;

  constructor(
    public formBuilder: FormBuilder,
    public teacherManagementService: TeacherManagementService,
    public dialog: MatDialog,
    private el: ElementRef,
    public router: Router) { }
  ngOnInit() {
    this.formAddNew = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.pattern('^\\D{3,45}$'),
        Validators.minLength(3), Validators.maxLength(45),
        this.teacherManagementService.validateWhitespace, this.teacherManagementService.validateSpecialCharacter]],
      teacherCode: ['', [Validators.required, Validators.pattern('^GV-\\d{4}$'),Validators.minLength(3),
        // tslint:disable-next-line:max-line-length
        Validators.maxLength(45), this.teacherManagementService.validateWhitespace, this.teacherManagementService.validateSpecialCharacter]],
      identityNumber: ['', [Validators.required, Validators.pattern('^\\d{9}|\\d{12}$'), Validators.minLength(9),
        Validators.maxLength(12), this.teacherManagementService.validateSpecialCharacter]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10), this.teacherManagementService.validPhoneNumber]],
      // tslint:disable-next-line:max-line-length
      numberStudent: ['',[Validators.required, Validators.pattern('^\\d{1,2}$'),  Validators.maxLength(2),this.teacherManagementService.validateSpecialCharacter]]
    });
  }

  addNewTeacher() {
    console.log(this.formAddNew.value);
    this.teacherManagementService.addNew(this.formAddNew.value).subscribe(data => {
      const dialogRef = this.dialog.open(SuccessComponent, {
        width: '450px',
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        // @ts-ignore
        this.router.navigateByUrl('teacher/teacher-list');
      });
    })
  }
}

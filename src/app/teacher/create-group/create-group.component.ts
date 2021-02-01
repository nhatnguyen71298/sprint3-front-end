import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuocService} from '../../service/quocservice/quoc.service';
import {SelectionModel} from '@angular/cdk/collections';
import {Toast, ToastrService} from 'ngx-toastr';
import {ActivatedRoute, Router} from '@angular/router';
import {ListStudentNoGroupComponent} from '../list-student-no-group/list-student-no-group.component';
import {MatCheckbox} from '@angular/material/checkbox';


@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  @ViewChild(ListStudentNoGroupComponent, {static: false}) childC: ListStudentNoGroupComponent;
  formCreate: FormGroup;
  private student: any;
  private idTeacherLogin = 1;
  private checkRemoveSt;
  private studentArr: FormArray;
  private isDisabled: any;
  private selected: number;
  private element: any;

  constructor(private fb: FormBuilder,
              private quocService: QuocService,
              private el: ElementRef, private route: ActivatedRoute,
              private toast: ToastrService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.formCreate = this.fb.group({
      groupName: ['', Validators.required],
      leaderGroupId: [null, Validators.required],
      students: this.fb.array([])
    });
    this.studentArr = this.formCreate.get('students') as FormArray;
  }
  addStudent(id: number) {
    let check = false;
    if (this.studentArr.length !== 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.studentArr.value.length; i++) {
        if (this.studentArr.value[i].id === id) {
          check = true;
        }
      }
      if (check === true) {
        this.toast.error('Sinh Viên Đã Tồn Tại Trong Danh Sách ', 'Thông Báo')
      } else {
        this.quocService.findById(id).subscribe(value => {
          this.student = value;
          // @ts-ignore
          this.studentArr.push(this.fb.control(this.student));
        })
      }
    } else {
      this.quocService.findById(id).subscribe(value => {
        this.student = value;
        // @ts-ignore
        this.studentArr.push(this.fb.control(this.student));
      })
    }
  }
  removeStudent(stIndex: number) {
    this.checkRemoveSt = (this.studentArr.value[stIndex]);
    this.studentArr.removeAt(stIndex);
  }
  callApi() {
    if (this.studentArr.length === 0) {
      this.toast.error('Danh Sách Thành Viên Nhóm Đang Trống !', 'Thao Tác Thất Bại.')
    } else if (this.formCreate.get('leaderGroupId').value === null) {
      this.toast.error('Vui Lòng Tạo Leader Cho Nhóm', 'Thao Tác Thất Bại.');
    } else {
      console.log(this.formCreate.get('leaderGroupId').value);
      this.formCreate.markAllAsTouched()
      if (this.formCreate.valid) {
        console.log(this.studentArr.length);
        if (this.studentArr.length > 6) {
          this.toast.error('Danh Sách Thành Viên Nhóm Từ 1-6 Sinh Viên', 'Thao Tác Thất Bại.')
        } else {
          console.log('value form');
          console.log(this.formCreate.value);
          this.quocService.createNew(this.idTeacherLogin, this.formCreate.value).subscribe(value => {
            console.log(this.formCreate.value);
            if (value === 1) {
              this.router.navigate(['teacher/feed-back'], {});
              this.toast.success('Thao Tác Thành Công', 'Thông Báo')
            } else {
              this.toast.error('Thao Tác Thất Bại', 'Thông Báo')
            }
          });
        }
      } else {
        for (const KEY of Object.keys(this.formCreate.controls)) {
          if (this.formCreate.controls[KEY].invalid) {
            const INVALID_CONTROL = this.el.nativeElement.querySelector('[formControlName="' + KEY + '"]');
            INVALID_CONTROL?.focus();
            break;
          }
        }
      }
    }
  }
  keyDownFunction(event) {
    if (event.keyCode === 13) {
      // @ts-ignore
      this.callApi();
    }
  }
  onReset() {
    this.formCreate.reset();
    this.studentArr.clear();
    this.childC.cancelFormCreate();
  }
  getRecord(checkbox: MatCheckbox, element: any) {
    console.log(checkbox.checked);
    if (checkbox.checked === true) {
      this.formCreate.get('leaderGroupId').setValue(null);
    } else {
      console.log(this.formCreate.get('leaderGroupId').value);
      this.formCreate.get('leaderGroupId').setValue(checkbox.id);
    }
  }
}

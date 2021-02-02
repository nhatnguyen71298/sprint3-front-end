import {Component, ElementRef, OnInit} from '@angular/core';
import {ThesisDetailService} from '../../service/thesis-detail.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-thesis-detail-list',
  templateUrl: './thesis-detail-list.component.html',
  styleUrls: ['./thesis-detail-list.component.css']
})
export class ThesisDetailListComponent implements OnInit {

  formComment: FormGroup;
  thesisDetailList;
  thesisDetailId = 0;
  studentList = [];
  thesisDetailName;
  isSecondComment = false;

  constructor(private thesisDetailService: ThesisDetailService,
              private el: ElementRef,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    $('.upload-comment__done').hide();
    this.getListThesisDetail();
    this.setFormComment();
    this.studentList = [];
  }

  getListThesisDetail() {
    this.thesisDetailService.getThesisDetailList().subscribe((data) => {
      console.log(data);
      this.thesisDetailList = data;
    })
  }

  setFormComment() {
    this.formComment = this.formBuilder.group({
      id: '',
      firstComment: ['',[ Validators.maxLength(250), Validators.required]],
      secondComment: ['']
    })
  }

  commentThesis(thesisDetail) {
    this.formComment.patchValue({firstComment: thesisDetail.firstComment, secondComment: thesisDetail.secondComment})
    this.thesisDetailService.getStudentList(thesisDetail.id).subscribe((data) => {
      this.thesisDetailId = thesisDetail.id;
      this.studentList = data;
      this.thesisDetailName = thesisDetail.thesisName;
    })
    if (thesisDetail.secondFileUrl != null) {
      this.isSecondComment = true;
    } else {
      this.isSecondComment = false;
    }
  }

  uploadComment() {
    if (this.formComment.invalid) {
      const tempControl = this.el.nativeElement.querySelector('form');
      tempControl.querySelector('.ng-invalid').focus();
    }
    this.formComment.markAllAsTouched();
    if (this.formComment.valid){
      this.formComment.value.id = this.thesisDetailId;
      if (this.formComment.value.firstComment != null) {
        this.formComment.value.firstComment = this.formComment.value.firstComment.trim();
      }
      if (this.formComment.value.secondComment != null) {
        this.formComment.value.secondComment = this.formComment.value.secondComment.trim();
      }
      this.thesisDetailService.uploadComment(this.formComment.value.id, this.formComment.value).subscribe((data) => {
        $(document).ready(() => {
          if (data.message === 'upload success') {
            $('.upload-comment__done').show();
            setTimeout(() => {
              $('.upload-comment__done').hide();
            }, 2000);
          }
        })
        this.ngOnInit();
      })
    }

  }
}

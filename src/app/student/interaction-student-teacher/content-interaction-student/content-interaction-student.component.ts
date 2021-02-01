// @ts-ignore
import {Component, ElementRef, Input, OnChanges, OnInit} from '@angular/core';
import {DinServiceService} from '../../../service/din-service.service';
import {DinInteractionService} from '../../../service/din-interaction.service';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {LoginService} from '../../../services/login.service';

// @ts-ignore
@Component({
  selector: 'app-content-interaction-student',
  templateUrl: './content-interaction-student.component.html',
  styleUrls: ['./content-interaction-student.component.css']
})
export class ContentInteractionStudentComponent implements OnInit, OnChanges {
  @Input()
  interaction;
  record = {
    name: '',
    content: ''
  };
  length = 5;
  records;
  contentInteraction;
  open = false;

  constructor(private dinServiceService: DinServiceService,
              private dinInteractionService: DinInteractionService,
              private loginService:LoginService) {
  }

  // @ts-ignore
  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    this.length = 5;
    this.takeRecords(this.length);
  }

  ngOnInit(): void {
    this.contentInteraction = new FormControl('');
    this.takeRecords(5);
  }

  takeRecords(length) {
    this.dinInteractionService.getAllInteraction(this.interaction.id.toString()).subscribe(data => {
      console.log(data);
      if (length >= data.length) {
        length = data.length;
      }
      // console.log(data.slice(0, 3).map(e => console.log(e.payload.doc.data())));
      this.records = data.slice(data.length - length, data.length).map(e => {
        return {
          name: e.payload.doc.data()['name'],
          content: e.payload.doc.data()['content'],
        }
      })
    });
  }

  sentFireBase(event) {
    this.record.name = this.interaction.student.fullName;
    this.record.content = this.contentInteraction.value;
    this.contentInteraction.reset();
    this.dinServiceService.createNotification(this.interaction.id, this.loginService.currentUserValue.id).subscribe(()=> {
      this.dinInteractionService.createInteraction(this.interaction.id.toString(), this.record).then(res => {
        this.record.name = '';
        this.record.content = '';
        this.takeRecords(this.length);
      }).catch(error => console.log(error));
      event.preventDefault();
    });
  }

  lengthIncrease() {
    this.length +=5;
    this.takeRecords(this.length);
  }

  addEmoji(event: any) {
    this.contentInteraction.setValue(this.contentInteraction.value+=event.emoji.native) ;
    // this.contentInteraction.patchValue(this.contentInteraction.value);
  }
}

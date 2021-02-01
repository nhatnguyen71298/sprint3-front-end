// @ts-ignore
import {Component, OnInit} from '@angular/core';
// @ts-ignore
import {FormBuilder} from '@angular/forms';
import {DinServiceService} from '../../../service/din-service.service';
import {LoginService} from '../../../services/login.service';

// @ts-ignore
@Component({
  selector: 'app-interaction-student',
  templateUrl: './interaction-student.component.html',
  styleUrls: ['./interaction-student.component.css']
})
export class InteractionStudentComponent implements OnInit {
  formInteraction;

  constructor(private fb: FormBuilder,
              private dinServiceService: DinServiceService,
              private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.formInteraction = this.fb.group({
      content: [''],
      title: ['']
    });
  }

  createInteraction(historyComponent,event) {
    this.dinServiceService.createInteraction(this.formInteraction.get('content').value,
      this.formInteraction.get('title').value, this.loginService.currentUserValue.id).subscribe(() => {
      // tslint:disable-next-line:no-unused-expression
      // @ts-ignore
      this.dinServiceService.getAllInteraction(this.loginService.currentUserValue.id,
        historyComponent.listHistoryInteraction.pageable.pageNumber).subscribe(data => {
        this.formInteraction.reset();
        historyComponent.listHistoryInteraction = data;
      })
    });
    event.preventDefault();
  }


}

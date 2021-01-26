import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ThesisDetailSendComponent} from './thesis-detail-send/thesis-detail-send.component';
import {ReactiveFormsModule} from '@angular/forms';


export const routes: Routes = [
  {
    path: 'student',
    children: [
      // {path: 'test', component: TestStudentComponent},
      {path: 'send-thesis-detail', component: ThesisDetailSendComponent}
    ]
  },
];

@NgModule({
  declarations: [ThesisDetailSendComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AppRoutingStudentModule {
}

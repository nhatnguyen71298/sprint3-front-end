import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NavBarComponent} from './nav-bar/nav-bar/nav-bar.component';
import {LoginComponent} from './login/login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {SideBarComponent} from './side-bar/side-bar/side-bar.component';
import {ChangePassswordComponent} from './Admin/change-passsword/change-passsword.component';
import { AaaComponent } from './Admin/aaa/aaa.component';


const routes: Routes = [{path:'bb',component: AaaComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule,
    ReactiveFormsModule, MatDialogModule, CommonModule],
  exports: [RouterModule, NavBarComponent, SideBarComponent],
  declarations: [NavBarComponent, LoginComponent, SideBarComponent, ChangePassswordComponent, AaaComponent]
})
export class AppRoutingModule {
}

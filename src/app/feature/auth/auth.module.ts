import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import { SignupComponent } from './signup/signup.component';
import {DashboardComponent} from '../dashboard/dashboard/dashboard.component';
import { ProfileComponent } from './Profile/profile/profile.component';
import {AvatarModule} from 'primeng/avatar';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {CoursesComponent} from '../Courses/courses/courses.component';
import { TableModule } from 'primeng/table';
import {ActivitiesComponent} from '../Courses/activities/activities.component';
import {BooklabsComponent} from '../labs/booklabs/booklabs.component';
import { CalendarModule } from 'primeng/calendar';
import {MembershipComponent} from '../Membership/membership/membership.component';
import {CourseDetailsDialogComponent} from '../Courses/course-details-dialog/course-details-dialog.component';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent,
      }, {
        path: 'signup',
        component: SignupComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'courses',
        component: CoursesComponent,
      },{
        path: 'booklabs',
        component: BooklabsComponent,
      },
      {
        path: 'Membership',
        component: MembershipComponent,
      },
      { path: 'activities/:courseId',
        component: ActivitiesComponent
      },
      { path: 'detail/:courseId',
        component: CourseDetailsDialogComponent
      },
    ]
  }
];

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    InputTextModule,
    AvatarModule,
    FormsModule,
    ButtonModule,
      TableModule,
      CalendarModule
  ]
})
export class AuthModule { }

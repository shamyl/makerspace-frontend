import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './feature/auth/login/login.component';
import {Routes} from '@angular/router';
import {AuthComponent} from './feature/auth/auth.component';
import {InputTextModule} from 'primeng/inputtext';
import { DashboardComponent } from './feature/dashboard/dashboard/dashboard.component';
import { CoursesComponent } from './feature/Courses/courses/courses.component';
import {TableModule} from 'primeng/table';
import { CourseDetailsDialogComponent } from './feature/Courses/course-details-dialog/course-details-dialog.component';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivitiesComponent } from './feature/Courses/activities/activities.component';
import { BooklabsComponent } from './feature/labs/booklabs/booklabs.component';
import {CalendarModule} from 'primeng/calendar';
import {SelectButtonModule} from 'primeng/selectbutton';
import {FormsModule} from '@angular/forms';
import { AddEditCoursesComponent } from './feature/Courses/AddEditCourse/add-edit-courses/add-edit-courses.component';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import { MembershipComponent } from './feature/Membership/membership/membership.component';
import {CardModule} from 'primeng/card';
import {CoursesService} from 'src/app/feature/Courses/courses.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CheckboxModule} from 'primeng/checkbox';
import {MatLegacySelectModule as MatSelectModule} from '@angular/material/legacy-select';
import {MatLegacyOptionModule as MatOptionModule} from '@angular/material/legacy-core';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import {IntercepterService} from './core/common/intercepter.service';
import {ToastrModule} from 'ngx-toastr';
import { SidebarComponent } from './includes/sidebar/sidebar.component';
import {SidebarModule} from 'primeng/sidebar';
import {RippleModule} from 'primeng/ripple';
import {StyleClassModule} from 'primeng/styleclass';
import {FullCalendarModule} from '@fullcalendar/angular';
import {AddEditEventComponent} from './feature/labs/booklabs/AddEditEvent/add-edit-event.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMatDatetimePickerModule, NgxMatTimepickerModule} from '@angular-material-components/datetime-picker';
import {NgxMatMomentModule} from '@angular-material-components/moment-adapter';
import {DatePipe} from '@angular/common';
import { CourseMainComponent } from './feature/Courses/course-main/course-main.component';
import {MatLegacyTabsModule as MatTabsModule} from "@angular/material/legacy-tabs";
import { ProjectsComponent } from './feature/projects/projects/projects.component';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CoursesComponent,
    CourseDetailsDialogComponent,
    ActivitiesComponent,
    BooklabsComponent,
    AddEditCoursesComponent,
    MembershipComponent,
    SidebarComponent,
    AddEditEventComponent,
    CourseMainComponent,
    ProjectsComponent

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        InputTextModule,
        TableModule,
        MatDialogModule,
        MatButtonModule,
        BrowserAnimationsModule,
        CalendarModule,
        SelectButtonModule,
        FormsModule,
        ToastrModule.forRoot({
            timeOut: 5000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
            progressBar: true,
            closeButton: true
        }),
        MatInputModule,
        CardModule,
        HttpClientModule,
        CheckboxModule,
        MatSelectModule,
        MatOptionModule,
        MatFormFieldModule,
        SidebarModule,
        RippleModule,
        StyleClassModule,
        FullCalendarModule,
        MatDatepickerModule,
        NgxMatDatetimePickerModule,
        NgxMatTimepickerModule,
        NgxMatMomentModule,
        MatTabsModule,
        MatIconModule,

    ],
  providers: [CoursesService, {  provide: HTTP_INTERCEPTORS,  useClass: IntercepterService,  multi: true},
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

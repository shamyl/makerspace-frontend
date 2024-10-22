import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router, RouterLink} from "@angular/router";
import {CoursesService} from "../../Courses/courses.service";
import {ButtonDirective} from "primeng/button";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";

@Component({
  selector: 'app-user-lisitng',
  standalone: true,
  imports: [
    ButtonDirective,
    DatePipe,
    NgForOf,
    NgIf,
    PrimeTemplate,
    ReactiveFormsModule,
    TableModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './user-lisitng.component.html',
  styleUrl: './user-lisitng.component.scss'
})
export class UserLisitngComponent {
   headersTable: any;
   userLists: any;
 filteredCourseList: any;
  searchTerm = '';
constructor(private dialog: MatDialog,
            private router: Router,
            private courseService: CoursesService) {
}

  ngOnInit(): void {
  this.getUser();

    this.headersTable = [
      { field: 'action', header: 'Action' },
      { field: 'firstName', header: 'First Name' },
      { field: 'lastName', header: 'Last Name' },
      { field: 'userName', header: 'User Name' },
      { field: 'userType', header: 'User Type' },
    ];
  }
  filterCourses(): void {
    if (this.searchTerm) {
      this.filteredCourseList = this.userLists.filter((course: any) =>
        course.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCourseList = [...this.userLists]; // Reset filtered list
    }
  }
  getUser(): void {
    this.courseService.getUser().subscribe(courses => {
      this.userLists = courses;
      this.filteredCourseList = courses; // Initialize filtered list
    });
  }

}

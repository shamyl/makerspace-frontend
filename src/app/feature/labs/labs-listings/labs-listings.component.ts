import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Router, RouterLink} from "@angular/router";
import {CoursesService} from "../../Courses/courses.service";
import {ButtonDirective} from "primeng/button";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {PrimeTemplate} from "primeng/api";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {AddEditCoursesComponent} from "../../Courses/AddEditCourse/add-edit-courses/add-edit-courses.component";
import {AddEditLabsComponent} from "../add-edit-labs/add-edit-labs.component";

@Component({
  selector: 'app-labs-listings',
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
  templateUrl: './labs-listings.component.html',
  styleUrl: './labs-listings.component.scss'
})
export class LabsListingsComponent {
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
      { field: 'name', header: 'Name' },
      { field: 'startDateTime', header: 'Start date' },
      { field: 'endDateTime', header: 'End Date' },
      { field: 'timePeriod', header: 'Time Period' },
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
    this.courseService.getAllLabs().subscribe(courses => {
      this.userLists = courses;
      this.filteredCourseList = courses; // Initialize filtered list
    });
  }
  addEditCourses(rowData?: any): void {
    const dialogRef = this.dialog.open(AddEditLabsComponent, {
      panelClass: 'tt-dialog',
      autoFocus: false,
      width: '1000px', // Specify dialog width
      height: 'auto', // Specify dialog height
      data: rowData,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getUser(); // Refresh course list after dialog closes
    });
  }
  deleteUserbyid(id: any): void {
    this.courseService.deleteLabs(id).subscribe(() => {
      this.getUser(); // Refresh course list after deletion
    });
  }
}

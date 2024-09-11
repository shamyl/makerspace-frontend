import { Component, OnInit } from '@angular/core';
import { CourseDetailsDialogComponent } from '../course-details-dialog/course-details-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddEditCoursesComponent } from '../AddEditCourse/add-edit-courses/add-edit-courses.component';
import { CoursesService } from '../courses.service';

interface Course {
  id: number;
  name: string;
  description: string;
  duration: number;
  status: string;
}

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  courseList: Course[] = [];
  filteredCourseList: Course[] = [];
  headersTable: any;
  searchTerm = '';

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private courseService: CoursesService
  ) {}

  ngOnInit(): void {
    this.getCourses();
    this.headersTable = [
      { field: 'action', header: 'Action' },
      { field: 'courseVenue', header: 'Course Venue' },
      { field: 'createdDate', header: 'Created Date' },
      { field: 'description', header: 'Description' },
      { field: 'endDateTime', header: 'End Date' },
      { field: 'isActive', header: 'Is Active' },
      { field: 'name', header: 'Name' },
      { field: 'startDateTime', header: 'Start Date' },
      { field: 'status', header: 'Status' },
      { field: 'timePeriod', header: 'Time Period' }
    ];
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courseList = courses;
      this.filteredCourseList = courses; // Initialize filtered list
      console.log(this.courseList);
    });
  }

  filterCourses(): void {
    if (this.searchTerm) {
      this.filteredCourseList = this.courseList.filter(course =>
        course.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCourseList = [...this.courseList]; // Reset filtered list
    }
  }

  showDetail(course: any): void {
    this.dialog.open(CourseDetailsDialogComponent, {
      data: { course }
    });
  }

  goToActivities(courseId: number): void {
    this.router.navigate(['/activities', courseId]);
  }

  deleteUserbyid(id: any): void {
    this.courseService.deleteUser(id).subscribe(() => {
      this.getCourses(); // Refresh course list after deletion
    });
  }

  getCoursebyUserId(id: any): void {
    this.router.navigate([`detail/${id}`]);
  }

  addEditCourses(rowData?: any): void {
    const dialogRef = this.dialog.open(AddEditCoursesComponent, {
      panelClass: 'tt-dialog',
      autoFocus: false,
      width: '1000px', // Specify dialog width
      height: 'auto', // Specify dialog height
      data: rowData,
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getCourses(); // Refresh course list after dialog closes
    });
  }
}

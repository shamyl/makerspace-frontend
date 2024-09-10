import {Component, OnInit} from '@angular/core';
import {CourseDetailsDialogComponent} from '../course-details-dialog/course-details-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {AddEditCoursesComponent} from '../AddEditCourse/add-edit-courses/add-edit-courses.component';
import {CoursesService} from '../courses.service';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

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
    courseList: any;
    headersTable: any;

    constructor(private dialog: MatDialog, private router: Router, private courseService: CoursesService) {
    }

    ngOnInit(): void {
        this.getCourses();
        this.headersTable = [
            {field: 'action', header: 'Action'}, {field: 'courseVenue', header: 'Course Venue'},
            {field: 'createdDate', header: 'Created Date'},
            {field: 'description', header: 'Description'},
            {field: 'endDateTime', header: 'End Date'},
            {field: 'isActive', header: 'Is Active'},
            {field: 'name', header: 'Name'},
            {field: 'startDateTime', header: 'Start Date'},
            {field: 'status', header: 'Status'},
            {field: 'timePeriod', header: 'Time Period'}
        ];
    }

    getCourses(): void {
        this.courseService.getCourses().subscribe(obj => {
            this.courseList = obj;
            console.log(this.courseList);
        });
    }

    showDetail(course: any): void {
        this.dialog.open(CourseDetailsDialogComponent, {
            data: {
                course
            }
        });
    }

    goToActivities(courseId: number): void {
        this.router.navigate(['/activities', courseId]);
    }

    deleteUserbyid(id: any): void {
      this.courseService.deleteUser(id).subscribe(obj => {
          if(obj) {
              this.courseList = [...this.courseList];
          }
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
        });

    }
}

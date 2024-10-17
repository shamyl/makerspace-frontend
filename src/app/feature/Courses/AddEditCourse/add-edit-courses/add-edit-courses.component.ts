import { Component, Inject, OnInit } from '@angular/core';
import { CoursesService } from '../../courses.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-add-edit-courses',
    templateUrl: './add-edit-courses.component.html',
    styleUrls: ['./add-edit-courses.component.scss']
})
export class AddEditCoursesComponent implements OnInit {
    course: any = {};
    timePeriodList: any;
    status: any;

    constructor(
        public dialogRef: MatDialogRef<AddEditCoursesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private courseService: CoursesService
    ) {
        if (data) {
            this.course = { ...data }; // If editing, populate the course data
        }
    }

    ngOnInit(): void {
        this.getTimeList();
        this.getstatus();
    }

    getTimeList(): void {
        this.courseService.getTimePeriod().subscribe(res => {
            this.timePeriodList = res;
        });
    }
    getstatus(): void {
        this.courseService.getStatus().subscribe(res => {
            this.status = res;
        });
    }

    save(): void {
        this.course.startDateTime = this.formatDate(this.course.startDateTime);
        this.course.endDateTime = this.formatDate(this.course.endDateTime);
        if (this.course.id) {
            // If course ID exists, update the course
            this.courseService.update(this.course).subscribe(res => {
                this.dialogRef.close(res); // Close dialog and return the response to the calling component
            });
        } else {
            // If no course ID, create a new course
            this.courseService.addCourse(this.course).subscribe(res => {
                this.dialogRef.close(res); // Close dialog and return the response
            });
        }
    }

    formatDate(date: string | Date): string {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = ('0' + (d.getMonth() + 1)).slice(-2); // Add leading zero
        const day = ('0' + d.getDate()).slice(-2); // Add leading zero
        const hours = ('0' + d.getHours()).slice(-2); // Add leading zero
        const minutes = ('0' + d.getMinutes()).slice(-2); // Add leading zero
        const seconds = ('0' + d.getSeconds()).slice(-2); // Add leading zero
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    resetForm(): void {
        this.course = {}; // Reset form data
    }
}

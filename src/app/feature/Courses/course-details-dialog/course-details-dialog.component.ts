import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {CoursesService} from '../courses.service';

@Component({
    selector: 'app-course-details-dialog',
    templateUrl: './course-details-dialog.component.html',
    styleUrls: ['./course-details-dialog.component.scss']
})
export class CourseDetailsDialogComponent implements OnInit {
    courseId: any;
    courseDetails: any;

    constructor(private route: ActivatedRoute,
                private courseService: CoursesService) {
    }

    ngOnInit(): void {
        this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));

        // Fetch the course details
        this.getCourseDetails(this.courseId);
    }

    getCourseDetails(id: number): void {
        this.courseService.getCoursebyId(id).subscribe(
            (data) => {
                this.courseDetails = data;
                console.log(this.courseDetails);
            },
            (error) => {
                console.error('Error fetching course details', error);
            }
        );
    }
}

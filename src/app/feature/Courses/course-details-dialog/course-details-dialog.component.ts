import {Component, Inject, OnInit} from '@angular/core';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA} from '@angular/material/legacy-dialog';
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
  assesmentDetail = {
    name: 'Introduction to Angular',
    description: 'Learn the basics of Angular framework.',
    duration: '40 hours',
    status: 'Open',
    videos: [
      { title: 'Introduction to Angular', url: '' },
      { title: 'Angular Components', url: '' },
    ],
    activities: [
      { title: 'Activity 1: Build a Component', toolUrl: '', description: 'Build a basic Angular component.' },
      { title: 'Activity 2: Create a Service', toolUrl: '', description: 'Create an Angular service and use it in your application.' },
    ],
    assessments: [
      { title: 'Quiz 1: Angular Basics', description: 'Test your knowledge on Angular basics.' },
      { title: 'Assignment: Build a ToDo App', description: 'Create a ToDo application using Angular.' },
    ]
  };

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

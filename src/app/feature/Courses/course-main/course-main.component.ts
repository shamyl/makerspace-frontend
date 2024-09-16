import { Component, OnInit } from '@angular/core';
import {CoursesService} from "../courses.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-course-main',
  templateUrl: './course-main.component.html',
  styleUrls: ['./course-main.component.scss']
})
export class CourseMainComponent implements OnInit {
   courseList: any;
  constructor(private courseService: CoursesService, private router: Router) { }

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courseList = courses;
      console.log(this.courseList);
    });
  }

  getCourseDetail(id: any){
    this.router.navigate([`detail/${id}`]);
  }
}

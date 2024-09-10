import { Component, OnInit } from '@angular/core';
import {CoursesService} from '../../Courses/courses.service';
interface Booking {
  lab: string;
  date: Date;
  duration: number;
}
@Component({
  selector: 'app-booklabs',
  templateUrl: './booklabs.component.html',
  styleUrls: ['./booklabs.component.scss']
})

export class BooklabsComponent implements OnInit {
  selectedDate: Date | null = null;
  selectedLab!: any;
  labs: any;
  bookings: Booking[] = [];
  constructor( private courseService: CoursesService) { }

  ngOnInit(): void {
    this.getAllLabs();
  }

  bookLab(): void {
    if (!this.selectedDate || !this.selectedLab) {
      alert('Please select a date and a lab.');
      return;
    }

    const duration = this.getDuration();
    if (duration < 30 || duration > 120) {
      alert('The duration must be between 30 minutes and 2 hours.');
      return;
    }

    this.bookings.push({
      lab: this.selectedLab,
      date: this.selectedDate,
      duration
    });

   // Reset form
    this.selectedDate = null;
    this.selectedLab = null;
  }

  // tslint:disable-next-line:typedef
  getDuration() {
    // Calculate the duration based on the selected date/time
    // This is a placeholder and should be replaced with actual duration calculation
    return 60; // Example: 60 minutes
  }
  getAllLabs(): void{
    this.courseService.getAllCourses().subscribe(res => {
this.labs = res;
    });
  }
}

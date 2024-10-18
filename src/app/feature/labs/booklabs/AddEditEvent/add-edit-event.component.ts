import {Component, Inject, OnInit, ViewChild} from '@angular/core';

import * as moment from 'moment';
import {ThemePalette} from '@angular/material/core';
import {DatePipe} from '@angular/common';
import {LabServiceService} from '../../lab-service.service';
import {CoursesService} from '../../../Courses/courses.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
@Component({
    selector: 'app-add-edit-event',
    templateUrl: './add-edit-event.component.html',
    styleUrls: ['./add-edit-event.component.scss']
})
export class AddEditEventComponent implements OnInit {
    course: any = {};
    timePeriodList: any;
    status: any;
  public date: moment.Moment | undefined;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';
   labList: any;
  startTime: any;
  endTime: any;
  minEndTime: any;
  maxEndTime: any;


    constructor(
      private datePipe: DatePipe,
      public dialogRef: MatDialogRef<AddEditEventComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private labService: LabServiceService,
      private courseService: CoursesService) {
      {
        try {
          // Check if data is passed correctly and format it
          if (data) {
            this.course = {...data};

            // Ensure start and end times are in correct moment format
            if (this.course.start) {
              this.startTime = moment(this.course.start).format('HH:mm');
            }

            if (this.course.end) {
              this.endTime = moment(this.course.end).format('HH:mm');
            }
          }
        } catch (error) {
          console.error('Error initializing event data:', error);
          this.course = {}; // Fallback to empty object if parsing fails
        }
      }
    }

    ngOnInit(): void {
      this.getTimeList();
      this.getAllLabs();
    }
  onStartTimeSet(time: string): void {
    this.startTime = time;

    // Parse the start time into hours and minutes
    const [startHours, startMinutes] = time.split(':').map(Number);

    // Calculate the max end time (6 hours after the start time)
    const maxEnd = this.addTime(startHours, startMinutes, 6, 0); // +6 hours

    // Format the max end time to HH:mm
    this.maxEndTime = this.formatTime(maxEnd.hours, maxEnd.minutes);
  }

  // Helper function to add hours and minutes to a given time
  addTime(hours: number, minutes: number, addHours: number, addMinutes: number) {
    let newHours = hours + addHours;
    let newMinutes = minutes + addMinutes;

    if (newMinutes >= 60) {
      newMinutes -= 60;
      newHours += 1;
    }

    newHours = newHours % 24; // Ensure hours stay within 24-hour format

    return { hours: newHours, minutes: newMinutes };
  }

  formatTime(hours: number, minutes: number): string {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
  getTimeList(): void {
    this.courseService.getTimePeriod().subscribe(res => {
      this.timePeriodList = res;
    });
  }
  getAllLabs(): void {
    this.labService.getAllLabs().subscribe(res => {
      this.labList = res;
    });
  }

  save() {
    const userData = localStorage.getItem('userInfo');
    // @ts-ignore
    const parsedData = JSON.parse(userData);

    // Combine date and startTime into a full timestamp
    const startDateTime = moment(this.course.start)
      .set({
        hour: parseInt(this.startTime.split(':')[0], 10),
        minute: parseInt(this.startTime.split(':')[1], 10),
      })
      .format('yyyy-MM-DD HH:mm:ss');

    // Combine date and endTime into a full timestamp
    const endDateTime = moment(this.course.start)
      .set({
        hour: parseInt(this.endTime.split(':')[0], 10),
        minute: parseInt(this.endTime.split(':')[1], 10),
      })
      .format('yyyy-MM-DD HH:mm:ss');

    const d = {
      id: this.course.id,
      userId: parsedData.id,
      labId: this.course.labId,
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      allDay: !this.endTime, // Assume allDay if endTime is not provided
      isActive: true,
    };

    this.labService.bookLab(d).subscribe(res => {
      this.labList = res;
      this.dialogRef.close(this.labList);
    });
  }

}

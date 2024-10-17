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

    constructor(
      private datePipe: DatePipe,
      public dialogRef: MatDialogRef<AddEditEventComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private labService: LabServiceService,
      private courseService: CoursesService) {
        if (data) {
            this.course = { ...data };
        }
    }

    ngOnInit(): void {
      this.getTimeList();
      this.getAllLabs();
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
    const d = {
        id: this.course.id,
        userId: parsedData.id,
        labId: this.course.labId,
        startDateTime: this.datePipe.transform(this.course.start, 'yyyy-MM-dd hh:mm:ss'),
        endDateTime: this.datePipe.transform(this.course.end, 'yyyy-MM-dd hh:mm:ss'),
        allDay: !this.course.end,
        isActive: true
      };
    this.labService.bookLab(d).subscribe(res => {
  this.labList = res;
  });
    this.dialogRef.close(this.labList);
  }
}

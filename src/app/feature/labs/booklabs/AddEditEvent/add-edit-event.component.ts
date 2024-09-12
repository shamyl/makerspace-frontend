import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import * as moment from 'moment';
import {ThemePalette} from '@angular/material/core';
import {DatePipe} from '@angular/common';
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

    constructor(
      private datePipe: DatePipe,
      public dialogRef: MatDialogRef<AddEditEventComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ) {
        if (data) {
            this.course = { ...data };
        }
    }

    ngOnInit(): void {
    }

  save() {
      const d = {
        id: this.course.id,
        title: this.course.title,
        start: this.datePipe.transform(this.course.start, 'yyyy-MM-dd hh:mm'),
        end: this.datePipe.transform(this.course.end, 'yyyy-MM-dd hh:mm'),
        allDay: !this.course.end
      };
      this.dialogRef.close(d);
  }
}

import {Component, Inject} from '@angular/core';
import {MatOption, ThemePalette} from "@angular/material/core";
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {CoursesService} from "../../Courses/courses.service";
import {MatButton} from "@angular/material/button";
import {MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatSelect} from "@angular/material/select";
import {NgForOf} from "@angular/common";
import {NgxMatDatetimePickerModule} from "@angular-material-components/datetime-picker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-edit-labs',
  standalone: true,
  imports: [
    MatButton,
    MatDatepickerToggle,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatOption,
    MatSelect,
    MatSuffix,
    NgForOf,
    NgxMatDatetimePickerModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './add-edit-labs.component.html',
  styleUrl: './add-edit-labs.component.scss'
})
export class AddEditLabsComponent {
  course: any = {};
  timePeriodList: any;
  status: any;
  selectedFiles: File[] = [];
  public color: ThemePalette = 'primary';
  labList: any;
  startTime: any;
  endTime: any;
  minEndTime: any;
  public date: moment.Moment | undefined;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  maxEndTime: any;
  courseList: any;
  constructor(
    public dialogRef: MatDialogRef<AddEditLabsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private courseService: CoursesService
  ) {
    if (data) {
      this.course = { ...data };
    }
  }

  ngOnInit(): void {
    this.getTimeList();
    this.getStatus();
  }

  getTimeList(): void {
    this.courseService.getTimePeriod().subscribe(res => {
      this.timePeriodList = res;
    });
  }

  getStatus(): void {
    this.courseService.getStatus().subscribe(res => {
      this.status = res;
    });
  }

  onFileSelected(event: any): void {
    this.selectedFiles = Array.from(event.target.files); // Store selected files
  }

  save(): void {
    this.course.startDateTime = this.formatDate(this.course.startDateTime);
    this.course.endDateTime = this.formatDate(this.course.endDateTime);

    const saveOperation = this.course.id
      ? this.courseService.updateLabs(this.course)
      : this.courseService.addLabs(this.course);

    saveOperation.subscribe(res => {
      this.courseList = res;
      if (res) {
        //this.uploadFiles(this.courseList.id); // Upload files with the course ID
      }
      this.dialogRef.close(res); // Close dialog and return response
    });
  }

  formatDate(date: string | Date): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)} `
      + `${('0' + d.getHours()).slice(-2)}:${('0' + d.getMinutes()).slice(-2)}:${('0' + d.getSeconds()).slice(-2)}`;
  }

  resetForm(): void {
    this.course = {};
  }

}

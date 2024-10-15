import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CoursesService} from '../../Courses/courses.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import {AddEditCoursesComponent} from '../../Courses/AddEditCourse/add-edit-courses/add-edit-courses.component';
import {AddEditEventComponent} from './AddEditEvent/add-edit-event.component';
import {LabServiceService} from "../lab-service.service";
import {MatDialog} from '@angular/material/dialog';
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
  labListByUser: any;
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent | undefined;
//   selectedDate: Date | null = null;
//   selectedLab!: any;
//   labs: any;
//   bookings: Booking[] = [];
//   calendar: Calendar;
//   @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent;
//   constructor( private courseService: CoursesService, private el: ElementRef) {
//     this.calendar = new Calendar(el.nativeElement, {
//       plugins: [dayGridPlugin]
//     });
//     this.calendar.render();
//   }
//
//   ngOnInit(): void {
//     this.getAllLabs();
//   }
//
//   bookLab(): void {
//     if (!this.selectedDate || !this.selectedLab) {
//       alert('Please select a date and a lab.');
//       return;
//     }
//
//     const duration = this.getDuration();
//     if (duration < 30 || duration > 120) {
//       alert('The duration must be between 30 minutes and 2 hours.');
//       return;
//     }
//
//     this.bookings.push({
//       lab: this.selectedLab,
//       date: this.selectedDate,
//       duration
//     });
//
//    // Reset form
//     this.selectedDate = null;
//     this.selectedLab = null;
//   }
//
//   // tslint:disable-next-line:typedef
//   getDuration() {
//     // Calculate the duration based on the selected date/time
//     // This is a placeholder and should be replaced with actual duration calculation
//     return 60; // Example: 60 minutes
//   }
//   getAllLabs(): void{
//     this.courseService.getAllCourses().subscribe(res => {
// this.labs = res;
//     });
//   }
  options: any;
  eventsModel: any;

  constructor(private dialog: MatDialog, private labService: LabServiceService) {
  }
  ngOnInit() {
    this.getLabsByUserId();

    // Don't use FullcalendarOption interface
    this.options = {
      editable: true,
      customButtons: {
        myCustomButton: {
          text: 'custom!',
          click: () => {
            alert('clicked the custom button!');
          },
        },
      },
      theme: 'standart',
      header: {
        left: 'prev,next today myCustomButton',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      locales: [],
      locale: 'en',
      // add other plugins
      plugins: [
        dayGridPlugin,
        interactionPlugin,
        timeGridPlugin,
        resourceTimeGridPlugin,
      ],
    };
  }
  eventClick(model: any) {
    const event = {
      id: model.event.id,
      start: model.event.start,
      end: model.event.end,
      title: model.event.title
    };
    const dialogRef = this.dialog.open(AddEditEventComponent, {
      panelClass: 'tt-dialog',
      autoFocus: false,
      width: '1000px',
      height: 'auto',
      data: event,
    });
    dialogRef.afterClosed().subscribe((calendarEvent: any) => {
      if (!calendarEvent) {
        return;
      }
      const updatedEvents = this.eventsModel.map((e: any) =>
        e.id === calendarEvent.id ? { ...calendarEvent } : e
      );
      this.eventsModel = [...updatedEvents];
    });
  }

  dateSelected(model: any) {
    if (model.start.getMonth() !== new Date().getMonth() || model.end.getMonth() !== new Date().getMonth()) {
      return;
    }
    console.log(model);
    console.log(this.fullcalendar?.events);
  }
  eventDragStop(model: any) {
    console.log(model);
  }
  dateClick(model: any) {
    if (model.date.getMonth() !== new Date().getMonth()) {
      return;
    }
    const dialogRef = this.dialog.open(AddEditEventComponent, {
      panelClass: 'tt-dialog',
      autoFocus: false,
      width: '1000px', // Specify dialog width
      height: 'auto', // Specify dialog height
      data: model,
    });
    dialogRef.afterClosed().subscribe((calendarEvent: any) => {
      if (!calendarEvent) {
        return;
      }
      this.eventsModel = [...this.eventsModel, calendarEvent];
    });
  }
  updateHeader() {
    this.options.header = {
      left: 'prev,next myCustomButton',
      center: 'title',
      right: '',
    };
  }
  // updateEvents() {
  //   this.eventsModel = [
  //     {
  //       title: 'Updaten Event',
  //       start: this.yearMonth + '-08',
  //       end: this.yearMonth + '-10',
  //     },
  //   ];
  // }
  get yearMonth(): string {
    const dateObj = new Date();
    return dateObj.getUTCFullYear() + '-' + (dateObj.getUTCMonth() + 1);
  }
  dayRender(ev: any) {
    ev.el.addEventListener('dblclick', () => {
      alert('double click!');
    });
  }

  getLabsByUserId() {
    const userData = localStorage.getItem('userInfo');
    // @ts-ignore
    const parsedData = JSON.parse(userData);

    this.labService.getLabsByUserId(parsedData.id).subscribe(res => {
      this.labListByUser = res;

      // Map labListByUser to FullCalendar event format
      this.eventsModel = this.labListByUser.map((lab: any) => ({
        id: lab.id,
        title: lab.name,
        start: lab.startDateTime,
        end: lab.endDateTime,
      }));
      console.log(this.eventsModel);
    });
  }
}

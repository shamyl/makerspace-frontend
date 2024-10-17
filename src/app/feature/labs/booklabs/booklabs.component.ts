import {ChangeDetectorRef, Component, ElementRef, OnInit, signal, ViewChild} from '@angular/core';
import {CoursesService} from '../../Courses/courses.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import {AddEditCoursesComponent} from '../../Courses/AddEditCourse/add-edit-courses/add-edit-courses.component';
import {AddEditEventComponent} from './AddEditEvent/add-edit-event.component';
import {LabServiceService} from '../lab-service.service';
import {MatDialog} from '@angular/material/dialog';
import {CalendarOptions, DateSelectArg, EventApi, EventClickArg, EventInput} from '@fullcalendar/core';


const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today



export const INITIAL_EVENTS: EventInput[] = [
  {
    id: '',
    title: 'All-day event',
    start: TODAY_STR
  },
  {
    id: '',
    title: 'Timed event',
    start: TODAY_STR + 'T00:00:00',
    end: TODAY_STR + 'T03:00:00'
  },
  {
    id: '',
    title: 'Timed event',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T15:00:00'
  }
];
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
  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  currentEvents = signal<EventApi[]>([]);

  constructor(private dialog: MatDialog, private labService: LabServiceService, private changeDetector: ChangeDetectorRef) {
  }
  createEventId(this: any) {
    return String(this.eventGuid++);
  }
  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const event = {
      start: selectInfo.start,
      end: selectInfo.end,
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
    console.log(selectInfo, 'sdasdalsmda');
    // const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: '',
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay
    //   });
    // }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
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
   eventGuid: any;
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
        title: lab?.labView?.name,
        start: lab.startDateTime,
        end: lab.endDateTime,
      }));
      console.log(this.eventsModel);
    });
  }
}

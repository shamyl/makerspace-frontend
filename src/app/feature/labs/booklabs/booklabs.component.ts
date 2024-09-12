import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CoursesService} from '../../Courses/courses.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
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
  eventsModel = [
    {
      id: 'a',
      title: 'my event',
      start: '2024-09-05'
    }
  ];
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent | undefined;
  ngOnInit() {

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
    console.log(model);
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
}

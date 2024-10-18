import { ChangeDetectorRef, Component, OnInit, ViewChild, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FullCalendarComponent } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { CalendarOptions, EventApi, EventClickArg, DateSelectArg } from '@fullcalendar/core';
import { LabServiceService } from '../lab-service.service';
import { AddEditEventComponent } from './AddEditEvent/add-edit-event.component';

@Component({
  selector: 'app-booklabs',
  templateUrl: './booklabs.component.html',
  styleUrls: ['./booklabs.component.scss'],
})
export class BooklabsComponent implements OnInit {
  @ViewChild('fullcalendar') fullcalendar: FullCalendarComponent | undefined;

  eventsModel: any[] = [];
  labListByUser: any;
  calendarVisible = signal(true);

  // FullCalendar options
  calendarOptions = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    dayMaxEvents: true,
    events: this.fetchEvents.bind(this), // Use fetchEvents function
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
  });

  constructor(
    private dialog: MatDialog,
    private labService: LabServiceService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getLabsByUserId();
  }

  // Fetch events and return them in FullCalendar's format
  fetchEvents(info: any, successCallback: (events: any[]) => void) {
    const userData = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(userData || '{}');

    this.labService.getLabsByUserId(parsedData.id).subscribe(
      (res) => {
        this.eventsModel = res.map((lab: any) => ({
          id: lab.id,
          title: lab?.labView?.name,
          start: lab.startDateTime,
          end: lab.endDateTime,
        }));
        successCallback(this.eventsModel); // Send events to FullCalendar
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const event = { start: selectInfo.startStr, end: selectInfo.end };
    const dialogRef = this.dialog.open(AddEditEventComponent, {
      panelClass: 'tt-dialog',
      autoFocus: false,
      width: '1000px',
      height: 'auto',
      data: event,
    });

    dialogRef.afterClosed().subscribe((calendarEvent: any) => {
      if (calendarEvent) {
        const calendarApi = selectInfo.view.calendar;
        calendarApi.addEvent(calendarEvent);
      }
    });
  }

  handleEventClick(clickInfo: EventClickArg): void {
    const existingEvent: EventApi = clickInfo.event;

    // Prepare data for editing
    const eventData = {
      title: existingEvent.title,
      start: existingEvent.start,
      end: existingEvent.end,
    };

    const dialogRef = this.dialog.open(AddEditEventComponent, {
      panelClass: 'tt-dialog',
      autoFocus: false,
      width: '1000px',
      data: eventData, // Send existing event data to the dialog
    });

    dialogRef.afterClosed().subscribe((editedEvent: any) => {
      if (editedEvent) {
        // Update event details
        existingEvent.setProp('title', editedEvent.title);
        existingEvent.setStart(editedEvent.start);
        existingEvent.setEnd(editedEvent.end);
      }
    });
  }

  handleEvents(events: EventApi[]) {
    this.changeDetector.detectChanges();
  }

  getLabsByUserId() {
    const userData = localStorage.getItem('userInfo');
    const parsedData = JSON.parse(userData || '{}');

    this.labService.getLabsByUserId(parsedData.id).subscribe(
      (res) => {
        this.labListByUser = res;
        console.log('Labs fetched:', this.labListByUser);
      },
      (error) => {
        console.error('Error fetching labs:', error);
      }
    );
  }
}

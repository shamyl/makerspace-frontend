import { Component, OnInit } from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  courseName: string | undefined;
  activities: { name: string, toolUrl: SafeResourceUrl }[] = [];
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {}

  // tslint:disable-next-line:typedef
  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get('courseId');
    this.courseName = `Course ${courseId}`;

    // Assuming URLs come from your STEM platform
    const toolUrls = [
      'https://stem-platform.com/tool/1',
      'https://stem-platform.com/tool/2',
      // Add more URLs
    ];

    this.activities = toolUrls.map((url, index) => ({
      name: `Activity ${index + 1}`,
      toolUrl: this.sanitizer.bypassSecurityTrustResourceUrl(url),
    }));
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from '../courses.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-course-details-dialog',
  templateUrl: './course-details-dialog.component.html',
  styleUrls: ['./course-details-dialog.component.scss']
})
export class CourseDetailsDialogComponent implements OnInit {
  courseId: any;
  courseDetails: any;
  detalList: any[] = [];

  images: any[] = [];
  videos: any[] = [];
  pdfs: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CoursesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));
    this.getCourseDetails(this.courseId);
  }

  getCourseDetails(id: number): void {
    this.courseService.getCoursebyId(id).subscribe(
      (data) => {
        this.courseDetails = data;
        this.getDocumentsAndVideos();
      },
      (error) => console.error('Error fetching course details', error)
    );
  }

  getDocumentsAndVideos(): void {
    this.courseService.getDocumentsById(this.courseDetails.id).subscribe(
      (files) => {
        this.detalList = files;
        this.categorizeFiles();
      },
      (error) => console.error('Error fetching documents and videos', error)
    );
  }

  categorizeFiles(): void {
    this.images = this.detalList.filter((file) =>
      /\.(jpg|jpeg|png|gif)$/i.test(file.name)
    );
    this.videos = this.detalList.filter((file) =>
      /\.(mp4|mov|avi|wmv)$/i.test(file.name)
    );
    this.pdfs = this.detalList.filter((file) =>
      /\.(pdf|txt)$/i.test(file.name)
    );
  }

  sanitizeUrl(url: string): SafeResourceUrl {

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getFileType(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf':
        return 'PDF';
      case 'txt':
        return 'Text File';
      default:
        return 'File';
    }
  }
}

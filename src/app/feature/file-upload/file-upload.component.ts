import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpResponse} from '@angular/common/http';
import {FileUploadsService} from './file-uploads.service';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss'
})
export class FileUploadComponent {
  selectedFiles?: FileList;
  message: string[] = [];

  fileInfos?: Observable<any>;

  constructor(private uploadFile: FileUploadsService) {
  }
  ngOnInit(): void {
    this.fileInfos = this.uploadFile.getFiles();
  }
  selectFiles(event: any): void {
    this.message = [];
    this.selectedFiles = event.target.files;
  }

  uploadFiles(): void {
    this.message = [];

    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(this.selectedFiles[i]);
      }
    }
  }

    upload(file: File) {
      if (file) {
        this.uploadFile.upload(file).subscribe({
          next: (event: any) => {
            if (event instanceof HttpResponse) {
              const msg = file.name + ': Successful!';
              this.message.push(msg);
              this.fileInfos = this.uploadFile.getFiles();
            }
          },
          error: (err: any) => {
            let msg = file.name + ': Failed!';

            if (err.error && err.error.message) {
              msg += ' ' + err.error.message;
            }

            this.message.push(msg);
            this.fileInfos = this.uploadFile.getFiles();
          }
        });
      }
    }
}

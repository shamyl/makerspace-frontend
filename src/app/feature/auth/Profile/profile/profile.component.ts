import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileImage = 'assets/images/user.png  '; // Default or user's image URL
  editMode = false;

  certificates = [
    { name: 'Certificate 1', date: new Date('2023-01-01') },
    { name: 'Certificate 2', date: new Date('2023-06-15') }
  ];

  ongoingCourses = [
    { name: 'Course 1', startDate: new Date('2024-01-10'), status: 'In Progress' },
    { name: 'Course 2', startDate: new Date('2024-03-22'), status: 'Not Started' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  editProfile(): void {
    this.editMode = !this.editMode;
  }

  saveProfile(): void {
    this.editMode = false;
    // Save profile data here
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileImage = 'assets/images/user.png'; // Default or user's image URL
  editMode = false;
  userName = '';
  userEmail = '';

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
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const userData = localStorage.getItem('userInfo');
    if (userData) {
      const parsedData = JSON.parse(userData);
      const firstName = parsedData.firstName || '';
      const lastName = parsedData.lastName || '';

      this.userName = `${firstName} ${lastName}`.trim();
      this.userEmail = parsedData.email || 'email@example.com';
    }

  }

  editProfile(): void {
    this.editMode = !this.editMode;
  }

  saveProfile(): void {
    this.editMode = false;
    // Save profile data here, typically via a service call
    // Example: this.authService.updateUserProfile({ name: this.userName, email: this.userEmail });
  }

  cancelEdit(): void {
    this.editMode = false;
    // Optionally, revert changes if necessary
  }

}

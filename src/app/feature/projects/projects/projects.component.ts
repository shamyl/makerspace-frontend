import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects = [
    {
      name: 'Project 1',
      description: 'Description of project 1',
      imageUrl: 'C:/Users/M Farhan/Desktop/makerspace-frontend/src/assets/images/course-pix.jpg'
    },
    {
      name: 'Project 2',
      description: 'Description of project 2',
      imageUrl: 'path_to_image_2.jpg'
    }, {
      name: 'Project 2',
      description: 'Description of project 2',
      imageUrl: 'path_to_image_2.jpg'
    }, {
      name: 'Project 2',
      description: 'Description of project 2',
      imageUrl: 'path_to_image_2.jpg'
    }, {
      name: 'Project 2',
      description: 'Description of project 2',
      imageUrl: 'path_to_image_2.jpg'
    }, {
      name: 'Project 2',
      description: 'Description of project 2',
      imageUrl: 'path_to_image_2.jpg'
    }, {
      name: 'Project 2',
      description: 'Description of project 2',
      imageUrl: 'path_to_image_2.jpg'
    },
    // Add more projects here
  ];
   userName: any;
   userEmail: any;
  constructor() { }

  ngOnInit(): void {
    const userData = localStorage.getItem('userInfo');
    if (userData) {
      const parsedData = JSON.parse(userData);
      const firstName = parsedData.firstName || '';
      const lastName = parsedData.lastName || '';

      this.userName = `${firstName} ${lastName}`.trim();
      this.userEmail = parsedData.email || 'email@example.com';
    }
  }

  editProfile() {

  }
}

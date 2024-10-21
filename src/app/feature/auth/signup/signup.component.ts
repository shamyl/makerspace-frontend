import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../Courses/courses.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userList: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: '',
    isActive: true
  };
  userTypeList: any;

  constructor(private courseService: CoursesService) {}

  ngOnInit(): void {
    this.getUserbyId();
  }

  getUserbyId(): void {
    this.courseService.getUserById().subscribe((res) => {
      console.log('User Types:', res); // Debugging log
      this.userTypeList = res;
    });
  }

  signUp(): void {
    const userPayload = {
      userName: `${this.userList.firstName} ${this.userList.lastName}`.trim(),
      email: this.userList.email,
      password: this.userList.password,
      userTypeId: this.userList.userType,
      isActive: this.userList.isActive,
    };

    this.courseService.addUser(userPayload).subscribe(
      (res) => {
        console.log('User Created:', res);
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }
}

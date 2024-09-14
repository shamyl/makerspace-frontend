import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthServiceService} from '../auth-service.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
   submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthServiceService, private toast: ToastrService
  ) {
    // Define the form controls with validation
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  // tslint:disable-next-line:typedef
  get f() {
    return this.loginForm.controls;
  }
  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onSubmit() {
    this.submitted = true;

    // Stop if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // Prepare the login credentials
    const loginData = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    };

    // Call the loginUser service method
    this.authService.loginUser(loginData).subscribe(
      (response: any) => {
        localStorage.clear();
        // If login is successful, navigate to the dashboard
        if (response  ) {
          this.toast.success('Sucess', 'Login Successfully');
          const token = response.token || 'defaultToken';
          const user = response.user ? JSON.stringify(response) : '{}';
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('userInfo', JSON.stringify(response));
          this.router.navigate(['/dashboard']);
        } else {
          // Handle login error (wrong credentials, etc.)
          this.toast.error('failure', 'login failed');
        }
      },
      (error) => {
        // Handle server error
        this.toast.error('failure', 'login failed');
      }
    );
  }

  navigateToSignUp(): void {
    this.router.navigate(['/signup']);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  public error = '';
  public success = '';
  public loading = false;
  public submitted = false;
  
  constructor(
    private Token: TokenService,
    private Auth: AuthService,
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit() {
    // Initialize login form
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  // Submit form for login
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return false;
    }
    this.error = '';
    this.success = '';
    this.loading = true;
    this.api.post('/login', this.loginForm.value).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  // Handle success respone
  handleResponse(data) {
    // console.log(data);
    if (data.token) {
      this.Token.handle(data.token);
      this.Auth.changeAuthStatus(true);
      this.Auth.setAuthUser(data.user);
      this.success = 'You have successfully logged in.';
      this.loginForm.reset();
      this.router.navigateByUrl('/dashboard');
    } else {
      this.handleError(data);
    }
    this.loading = false;
    this.submitted = false;
  }

  // Handle errors response
  handleError(error) {
    if (error.status === 401) {
      this.error = error.error.message;
    } else {
      this.error = 'Something went wrong. please try again later.';
    }
    this.loginForm.patchValue({ password: '' });
    this.loading = false;
  }

}

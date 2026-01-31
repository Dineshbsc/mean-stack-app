import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  imports: [
    MatSnackBarModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth {
  isLogin = true;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router : Router,
    private snackBar: MatSnackBar,
  ) {}
  ngOnInit() {
    this.initializeForm();
  }
  initializeForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  toggle() {
    this.isLogin = !this.isLogin;
    this.form.reset()
  }

submit() {
  if (this.form.invalid) {
    this.form.markAllAsTouched()
    return
  };

  const apiCall = this.isLogin
    ? this.api.login(this.form.value)
    : this.api.register(this.form.value);

  apiCall.subscribe({
    next: (res: any) => {
      // Register flow
      if (!this.isLogin) {
         this.snackBar.open('User Registered successfully! ', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
        this.isLogin = true; // switch to login after register
        return;
      }

      localStorage.setItem('username', this.form.value.username!);
      this.router.navigate(['/product'])
      if (res.userId) {
        localStorage.setItem('userId', res.userId);
      }
 this.snackBar.open('Login successfully! ', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          });
    },
    error: (err) =>
       this.snackBar.open(err.error?.message || "Something Went Wrong.!", 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
          })
  });
}

}

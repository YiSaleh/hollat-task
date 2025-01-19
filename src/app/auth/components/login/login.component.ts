import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { GeneralInputComponent } from '../../../shared/components/general-input/general-input.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
  
    GeneralInputComponent,
    ReactiveFormsModule,
    RouterModule
  ],
})
export class LoginComponent implements OnInit {
  checkPermissions$: BehaviorSubject<any> | undefined;
  errorMsg: string = '';
  loginForm!: FormGroup;
  isSubmitted = false;
  disabled:boolean = false
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
        ],
      ],
      password: ['', Validators.required],
    });
  }

  getControlErrors(controlName: string): ValidationErrors | null {
    return this.loginForm.controls[controlName].errors;
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      // todo use subscribe when provide api
   
//todo I assumed that role admin == 0

          localStorage.setItem('role', this.authService.login(this.loginForm.value));
          localStorage.setItem('token', '123');
          localStorage.setItem('id', '1');

          this.router.navigate(['/list-beneficiaries']);

      
        (err: { error: { error: string; }; }) => {
          this.errorMsg = err.error.error;

        }
    
    }
  }
}

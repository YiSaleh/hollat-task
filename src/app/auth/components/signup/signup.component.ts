import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { GeneralInputComponent } from '../../../shared/components/general-input/general-input.component';
import { RouterModule } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';

import { MultiselectWithChipsComponent } from '../../../shared/components/multiselect-with-chips/multiselect-with-chips.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    MatRadioModule,
    GeneralInputComponent,
    MultiselectWithChipsComponent,
    ReactiveFormsModule,
  ],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;
  isSubmitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm(); // Call the form initialization method
  }

  initForm(): void {
    this.signUpForm = this.fb.group(
      {
        email: [
          '',
          [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)],
        ],
        name: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            this.minLength,
            this.hasLowerCaseValidator,
            this.hasUpperCaseValidator,
            this.hasSpecialCharacter,
            this.hasNumber,
          ],
        ],
        gender: [''],
        techs: [''],
        budget: [''],
        title: [''],
        confirm_password: ['', Validators.required],
      },
      {
        validators: this.confirmPasswordValidator,
      }
    );

    this.signUpForm.statusChanges.subscribe((status) => {
      console.log('Form status:', status);
    });
  }

  // Get validation errors for a specific control
  getControlErrors(controlName: string): ValidationErrors | null {
    return this.signUpForm.get(controlName)?.errors || null;
  }

  // Custom validator to check for uppercase letters
  hasUpperCaseValidator(control: FormControl): ValidationErrors | null {
    return control.value && control.value === control.value.toLowerCase()
      ? { upperCase: true }
      : null;
  }

  // Custom validator to check for lowercase letters
  hasLowerCaseValidator(control: FormControl): ValidationErrors | null {
    return control.value && control.value === control.value.toUpperCase()
      ? { lowerCase: true }
      : null;
  }

  // Custom validator to check for special characters
  hasSpecialCharacter(control: FormControl): ValidationErrors | null {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return control.value && !specialChars.test(control.value)
      ? { specialCharacter: true }
      : null;
  }

  // Custom validator to check for numbers
  hasNumber(control: FormControl): ValidationErrors | null {
    return control.value && !/\d/.test(control.value) ? { hasNumber: true } : null;
  }

  // Custom validator for minimum length
  minLength(control: FormControl): ValidationErrors | null {
    return control.value && control.value.length < 8 ? { minLength: true } : null;
  }

  // Cross-field validator for matching passwords
  confirmPasswordValidator: any = (formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirm_password')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  };

  // Access password mismatch error
  getPasswordMismatchError(): boolean {
    return this.signUpForm?.errors?.['passwordMismatch'] || false;
  }


}

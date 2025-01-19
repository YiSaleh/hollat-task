import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  ViewChild,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
} from '@angular/forms';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';
import { GeneralInputsAccessor } from '../../classes/GeneralInputsAccessor';

@Component({
  selector: 'app-general-input',
  templateUrl: './general-input.component.html',
  styleUrls: ['./general-input.component.scss'],
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GeneralInputComponent),
      multi: true,
    },
  ],
  imports: [CommonModule, FormsModule, ValidationErrorsComponent],
})
export class GeneralInputComponent extends GeneralInputsAccessor {
  @Input() label!: string;
  @Input() type!: string;
  @Input() placeholder!: string;
  @Input() icon!: string;
  @Input() isPassword = false;
  @Input() isSubmitted = false;
  @Input() errors!: ValidationErrors | null;
  @Input() mismatchError = false;
  @Input() isAuthInput = false;
  @Input() required = false;
  @Input() isDisabled = false;
  @Input() accept!: string;

  showPassword = false;
  passwordIconSrc = 'assets/icons/icons/eye.svg';
  @ViewChild('passwordInput') passwordInput!: any;

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      this.passwordInput.nativeElement.type = 'text';
      this.passwordIconSrc = 'assets/icons/icons/eye-hidden.svg';
    } else {
      this.passwordInput.nativeElement.type = 'password';
      this.passwordIconSrc = 'assets/icons/icons/eye.svg';
    }
  }

  changedValue(evt: any) {
    if (this.type == 'tel') {
      let ASCIICode = evt.which ? evt.which : evt.keyCode;
      if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
      return true;
    } else {
      return true;
    }
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['login']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Initialize component
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the login form with empty values', () => {
    const loginForm = component.loginForm;
    expect(loginForm).toBeDefined();
    expect(loginForm.get('email')?.value).toBe('');
    expect(loginForm.get('password')?.value).toBe('');
  });

  it('should validate email as required', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.hasError('required')).toBeTrue();
  });

  it('should validate email with a valid pattern', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('invalidEmail');
    expect(emailControl?.hasError('pattern')).toBeTrue();

    emailControl?.setValue('test@example.com');
    expect(emailControl?.valid).toBeTrue();
  });

  it('should validate password as required', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('');
    expect(passwordControl?.hasError('required')).toBeTrue();

    passwordControl?.setValue('validpassword');
    expect(passwordControl?.valid).toBeTrue();
  });

  it('should set isSubmitted to true on form submission', () => {
    component.onSubmit();
    expect(component.isSubmitted).toBeTrue();
  });

  it('should not call AuthService.login if the form is invalid', () => {
    component.loginForm.get('email')?.setValue('');
    component.loginForm.get('password')?.setValue('');
    component.onSubmit();
    expect(mockAuthService.login).not.toHaveBeenCalled();
  });

  it('should call AuthService.login and navigate on successful login', () => {

    component.loginForm.get('email')?.setValue('test@example.com');
    component.loginForm.get('password')?.setValue('validpassword');
    component.onSubmit();

    expect(mockAuthService.login).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'validpassword',
    });
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/list-beneficiaries']);
  });

  it('should set errorMsg on login failure', () => {
    const errorResponse = { error: { error: 'Invalid credentials' } };
    mockAuthService.login.and.callFake(() => {
      throw errorResponse;
    });

    component.loginForm.get('email')?.setValue('test@example.com');
    component.loginForm.get('password')?.setValue('invalidpassword');
    component.onSubmit();

    expect(component.errorMsg).toBe('Invalid credentials');
  });
});

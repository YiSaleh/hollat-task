import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ViewBeneficiaryComponent } from './view-beneficiary.component';
import { SuccessSnackbarComponent } from '../../shared/components/success-snackbar/success-snackbar.component';
import { of } from 'rxjs';

describe('ViewBeneficiaryComponent', () => {
  let component: ViewBeneficiaryComponent;
  let fixture: ComponentFixture<ViewBeneficiaryComponent>;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['openFromComponent']);
    mockActivatedRoute = {
      snapshot: {
        queryParams: {
          element: JSON.stringify({ id: 1, name: 'Test Beneficiary' }),
        },
      },
    };

    await TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      declarations: [SuccessSnackbarComponent],
      providers: [
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewBeneficiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });



  it('should parse element from queryParams on ngOnInit', () => {
    component.ngOnInit();
    expect(component.element).toEqual({ id: 1, name: 'Test Beneficiary' });
  });

  it('should open snackbar with custom class on rating change', () => {
    component.onRatingChange();
    expect(mockSnackBar.openFromComponent).toHaveBeenCalledWith(
      SuccessSnackbarComponent,
      jasmine.objectContaining({
        duration: 5000,
        panelClass: ['custom-snackbar'],
      })
    );
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBeneficiariesComponent } from './list-beneficiaries.component';

describe('ListBeneficiariesComponent', () => {
  let component: ListBeneficiariesComponent;
  let fixture: ComponentFixture<ListBeneficiariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBeneficiariesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListBeneficiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

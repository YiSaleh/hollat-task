import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListBeneficiariesComponent } from './list-beneficiaries.component';
import { SharedTableComponent } from "../../shared/components/shared-table/shared-table.component";
import { CommonModule } from '@angular/common';
import { GlobalTableHeaderComponent } from "../../shared/components/global-table-header/global-table-header.component";
import { Observable, of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('ListBeneficiariesComponent', () => {
  let component: ListBeneficiariesComponent;
  let fixture: ComponentFixture<ListBeneficiariesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBeneficiariesComponent, SharedTableComponent, GlobalTableHeaderComponent ],
      imports: [ CommonModule ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBeneficiariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct columns defined', () => {
    expect(component.beneficiariesColumns.length).toBe(6);
    expect(component.beneficiariesColumns[0].key).toBe('name');
    expect(component.beneficiariesColumns[1].key).toBe('technology');
    expect(component.beneficiariesColumns[2].key).toBe('budget');
    expect(component.beneficiariesColumns[3].key).toBe('rating');
    expect(component.beneficiariesColumns[4].key).toBe('status');
    expect(component.beneficiariesColumns[5].key).toBe('actions');
  });

  it('should load beneficiaries data', () => {
    component.beneficiaries.subscribe(beneficiaries => {
      expect(beneficiaries.length).toBeGreaterThan(0);
      expect(beneficiaries[0].name).toBe('Alice Johnson');
      expect(beneficiaries[1].name).toBe('Bob Smith');
    });
  });

  it('should display the correct beneficiary names in the table', () => {
    component.beneficiaries = of([
      { id: 1, name: 'Alice Johnson', gender: 'Female', technology: "JavaScript", budget: 1000, title: 'Developer', rate: 5, status: 1 },
      { id: 2, name: 'Bob Smith', gender: 'Male', technology: "HTML, CSS", budget: 2000, title: 'Designer', rate: 4, status: 0 }
    ]);
    fixture.detectChanges();
    const rows = fixture.debugElement.queryAll(By.css('tr')); // Query table rows
    expect(rows.length).toBe(3); // Header row + 2 data rows

    const firstRowName = rows[1].nativeElement.querySelector('td').textContent;
    const secondRowName = rows[2].nativeElement.querySelector('td').textContent;

    expect(firstRowName).toBe('Alice Johnson');
    expect(secondRowName).toBe('Bob Smith');
  });

});

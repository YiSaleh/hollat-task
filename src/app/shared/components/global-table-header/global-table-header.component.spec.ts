import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalTableHeaderComponent } from './global-table-header.component';

describe('GlobalTableHeaderComponent', () => {
  let component: GlobalTableHeaderComponent;
  let fixture: ComponentFixture<GlobalTableHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GlobalTableHeaderComponent]
    });
    fixture = TestBed.createComponent(GlobalTableHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

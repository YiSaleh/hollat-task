import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectWithChipsComponent } from './multiselect-with-chips.component';

describe('MultiselectWithChipsComponent', () => {
  let component: MultiselectWithChipsComponent;
  let fixture: ComponentFixture<MultiselectWithChipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MultiselectWithChipsComponent]
    });
    fixture = TestBed.createComponent(MultiselectWithChipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

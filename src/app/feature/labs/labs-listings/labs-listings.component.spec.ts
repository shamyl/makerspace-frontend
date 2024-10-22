import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabsListingsComponent } from './labs-listings.component';

describe('LabsListingsComponent', () => {
  let component: LabsListingsComponent;
  let fixture: ComponentFixture<LabsListingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabsListingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LabsListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

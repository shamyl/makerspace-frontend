import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLisitngComponent } from './user-lisitng.component';

describe('UserLisitngComponent', () => {
  let component: UserLisitngComponent;
  let fixture: ComponentFixture<UserLisitngComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLisitngComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserLisitngComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

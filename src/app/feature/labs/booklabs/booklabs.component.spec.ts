import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooklabsComponent } from './booklabs.component';

describe('BooklabsComponent', () => {
  let component: BooklabsComponent;
  let fixture: ComponentFixture<BooklabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooklabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooklabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

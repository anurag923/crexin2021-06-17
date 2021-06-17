import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingstatusComponent } from './bookingstatus.component';

describe('BookingstatusComponent', () => {
  let component: BookingstatusComponent;
  let fixture: ComponentFixture<BookingstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

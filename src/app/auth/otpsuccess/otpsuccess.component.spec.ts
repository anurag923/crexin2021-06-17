import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpsuccessComponent } from './otpsuccess.component';

describe('OtpsuccessComponent', () => {
  let component: OtpsuccessComponent;
  let fixture: ComponentFixture<OtpsuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpsuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

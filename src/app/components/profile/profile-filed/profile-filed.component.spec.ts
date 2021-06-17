import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFiledComponent } from './profile-filed.component';

describe('ProfileFiledComponent', () => {
  let component: ProfileFiledComponent;
  let fixture: ComponentFixture<ProfileFiledComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFiledComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFiledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

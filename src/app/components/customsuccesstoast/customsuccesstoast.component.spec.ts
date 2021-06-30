import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomsuccesstoastComponent } from './customsuccesstoast.component';

describe('CustomsuccesstoastComponent', () => {
  let component: CustomsuccesstoastComponent;
  let fixture: ComponentFixture<CustomsuccesstoastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomsuccesstoastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomsuccesstoastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

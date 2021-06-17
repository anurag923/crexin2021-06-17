import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterequipmentComponent } from './registerequipment.component';

describe('RegisterequipmentComponent', () => {
  let component: RegisterequipmentComponent;
  let fixture: ComponentFixture<RegisterequipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterequipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterequipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

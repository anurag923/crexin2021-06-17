import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklybookingstatusComponent } from './weeklybookingstatus.component';

describe('WeeklybookingstatusComponent', () => {
  let component: WeeklybookingstatusComponent;
  let fixture: ComponentFixture<WeeklybookingstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeeklybookingstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklybookingstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

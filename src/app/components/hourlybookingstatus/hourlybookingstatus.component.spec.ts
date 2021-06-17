import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlybookingstatusComponent } from './hourlybookingstatus.component';

describe('HourlybookingstatusComponent', () => {
  let component: HourlybookingstatusComponent;
  let fixture: ComponentFixture<HourlybookingstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlybookingstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlybookingstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

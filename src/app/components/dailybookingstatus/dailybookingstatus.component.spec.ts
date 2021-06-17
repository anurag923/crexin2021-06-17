import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailybookingstatusComponent } from './dailybookingstatus.component';

describe('DailybookingstatusComponent', () => {
  let component: DailybookingstatusComponent;
  let fixture: ComponentFixture<DailybookingstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailybookingstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailybookingstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

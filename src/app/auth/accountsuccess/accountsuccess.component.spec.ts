import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsuccessComponent } from './accountsuccess.component';

describe('AccountsuccessComponent', () => {
  let component: AccountsuccessComponent;
  let fixture: ComponentFixture<AccountsuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

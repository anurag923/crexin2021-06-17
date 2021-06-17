import { TestBed } from '@angular/core/testing';

import { RemovevalGuard } from './removeval.guard';

describe('RemovevalGuard', () => {
  let guard: RemovevalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RemovevalGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});

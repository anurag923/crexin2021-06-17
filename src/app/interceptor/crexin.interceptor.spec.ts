import { TestBed } from '@angular/core/testing';

import { CrexinInterceptor } from './crexin.interceptor';

describe('CrexinInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CrexinInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CrexinInterceptor = TestBed.inject(CrexinInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

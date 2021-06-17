import { TestBed } from '@angular/core/testing';

import { CrexinService } from './crexin.service';

describe('CrexinService', () => {
  let service: CrexinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrexinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

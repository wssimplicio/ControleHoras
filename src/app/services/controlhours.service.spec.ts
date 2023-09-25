import { TestBed } from '@angular/core/testing';

import { ControlhoursService } from './controlhours.service';

describe('ControlhoursService', () => {
  let service: ControlhoursService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ControlhoursService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

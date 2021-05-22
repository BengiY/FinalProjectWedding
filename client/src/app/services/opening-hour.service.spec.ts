import { TestBed } from '@angular/core/testing';

import { OpeningHourService } from './opening-hour.service';

describe('OpeningHourService', () => {
  let service: OpeningHourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpeningHourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

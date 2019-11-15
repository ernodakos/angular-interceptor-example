import { TestBed } from '@angular/core/testing';

import { StuckedRequestsService } from './stucked-requests.service';

describe('StuckedRequestsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StuckedRequestsService = TestBed.get(StuckedRequestsService);
    expect(service).toBeTruthy();
  });
});

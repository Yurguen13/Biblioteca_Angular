import { TestBed } from '@angular/core/testing';

import { SpecimensService } from './specimens.service';

describe('SpecimensService', () => {
  let service: SpecimensService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecimensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

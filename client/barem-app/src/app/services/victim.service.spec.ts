import { TestBed } from '@angular/core/testing';

import { VictimService } from './victim.service';

describe('VictimService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VictimService = TestBed.get(VictimService);
    expect(service).toBeTruthy();
  });
});

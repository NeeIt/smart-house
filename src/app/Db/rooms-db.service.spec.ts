import { TestBed } from '@angular/core/testing';

import { RoomsDbService } from './rooms-db.service';

describe('RoomsDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomsDbService = TestBed.get(RoomsDbService);
    expect(service).toBeTruthy();
  });
});

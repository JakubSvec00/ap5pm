import { TestBed } from '@angular/core/testing';

import { SuperheroApiService } from './superhero-api.service';

describe('SuperheroApiService', () => {
  let service: SuperheroApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperheroApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

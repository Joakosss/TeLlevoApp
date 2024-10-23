import { TestBed } from '@angular/core/testing';

import { ServicioMapboxService } from './servicio-mapbox.service';

describe('ServicioMapboxService', () => {
  let service: ServicioMapboxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioMapboxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

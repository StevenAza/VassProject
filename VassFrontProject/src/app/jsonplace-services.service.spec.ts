import { TestBed } from '@angular/core/testing';

import { JsonplaceServicesService } from './jsonplace-services.service';

describe('JsonplaceServicesService', () => {
  let service: JsonplaceServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonplaceServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

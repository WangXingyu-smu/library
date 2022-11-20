/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UrlserviceService } from './urlservice.service';

describe('Service: Urlservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlserviceService]
    });
  });

  it('should ...', inject([UrlserviceService], (service: UrlserviceService) => {
    expect(service).toBeTruthy();
  }));
});

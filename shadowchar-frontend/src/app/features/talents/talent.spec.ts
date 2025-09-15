import { TestBed } from '@angular/core/testing';

import { Talent } from './talent';

describe('Talent', () => {
  let service: Talent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Talent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

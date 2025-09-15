import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentManager } from './talent-manager';

describe('TalentManager', () => {
  let component: TalentManager;
  let fixture: ComponentFixture<TalentManager>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TalentManager]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TalentManager);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

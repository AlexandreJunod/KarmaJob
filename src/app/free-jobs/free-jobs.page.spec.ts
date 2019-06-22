import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeJobsPage } from './free-jobs.page';

describe('FreeJobsPage', () => {
  let component: FreeJobsPage;
  let fixture: ComponentFixture<FreeJobsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FreeJobsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeJobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

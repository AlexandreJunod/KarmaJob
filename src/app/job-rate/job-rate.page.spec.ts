import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobRatePage } from './job-rate.page';

describe('JobRatePage', () => {
  let component: JobRatePage;
  let fixture: ComponentFixture<JobRatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobRatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobRatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

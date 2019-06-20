import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheirJobsPage } from './their-jobs.page';

describe('TheirJobsPage', () => {
  let component: TheirJobsPage;
  let fixture: ComponentFixture<TheirJobsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheirJobsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheirJobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyJobsPage } from './my-jobs.page';

describe('MyJobsPage', () => {
  let component: MyJobsPage;
  let fixture: ComponentFixture<MyJobsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyJobsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyJobsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

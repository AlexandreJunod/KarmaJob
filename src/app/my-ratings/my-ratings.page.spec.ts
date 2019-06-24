import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRatingsPage } from './my-ratings.page';

describe('MyRatingsPage', () => {
  let component: MyRatingsPage;
  let fixture: ComponentFixture<MyRatingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRatingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRatingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

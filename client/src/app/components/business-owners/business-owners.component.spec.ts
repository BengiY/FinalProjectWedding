import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessOwnersComponent } from './business-owners.component';

describe('BusinessOwnersComponent', () => {
  let component: BusinessOwnersComponent;
  let fixture: ComponentFixture<BusinessOwnersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessOwnersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessOwnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

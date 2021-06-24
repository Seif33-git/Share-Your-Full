import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationDonComponent } from './creation-don.component';

describe('CreationDonComponent', () => {
  let component: CreationDonComponent;
  let fixture: ComponentFixture<CreationDonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationDonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationDonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

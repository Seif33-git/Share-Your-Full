import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDonneurComponent } from './page-donneur.component';

describe('PageDonneurComponent', () => {
  let component: PageDonneurComponent;
  let fixture: ComponentFixture<PageDonneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDonneurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDonneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

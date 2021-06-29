import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBeneficiaireComponent } from './page-beneficiaire.component';

describe('PageBeneficiaireComponent', () => {
  let component: PageBeneficiaireComponent;
  let fixture: ComponentFixture<PageBeneficiaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageBeneficiaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBeneficiaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

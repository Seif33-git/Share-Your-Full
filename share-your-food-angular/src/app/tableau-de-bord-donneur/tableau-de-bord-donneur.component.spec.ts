import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauDeBordDonneurComponent } from './tableau-de-bord-donneur.component';

describe('TableauDeBordDonneurComponent', () => {
  let component: TableauDeBordDonneurComponent;
  let fixture: ComponentFixture<TableauDeBordDonneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauDeBordDonneurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableauDeBordDonneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

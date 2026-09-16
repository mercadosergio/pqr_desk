import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PqrFormPage } from './pqr-form.page';

describe('PqrFormPage', () => {
  let component: PqrFormPage;
  let fixture: ComponentFixture<PqrFormPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PqrFormPage],
    }).compileComponents();

    fixture = TestBed.createComponent(PqrFormPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

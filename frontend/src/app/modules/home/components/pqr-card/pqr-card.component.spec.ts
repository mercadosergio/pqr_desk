import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PqrCardComponent } from './pqr-card.component';

describe('PqrCardComponent', () => {
  let component: PqrCardComponent;
  let fixture: ComponentFixture<PqrCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PqrCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PqrCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

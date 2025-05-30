import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPagoComponent } from './new-pago.component';

describe('NewPagoComponent', () => {
  let component: NewPagoComponent;
  let fixture: ComponentFixture<NewPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPagoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

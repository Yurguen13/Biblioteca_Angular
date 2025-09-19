import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecimensUpdateComponent } from './specimens-update.component';

describe('SpecimensUpdateComponent', () => {
  let component: SpecimensUpdateComponent;
  let fixture: ComponentFixture<SpecimensUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecimensUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecimensUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecimensDeleteComponent } from './specimens-delete.component';

describe('SpecimensDeleteComponent', () => {
  let component: SpecimensDeleteComponent;
  let fixture: ComponentFixture<SpecimensDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecimensDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecimensDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

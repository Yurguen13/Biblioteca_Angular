import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecimensCreateComponent } from './specimens-create.component';

describe('SpecimensCreateComponent', () => {
  let component: SpecimensCreateComponent;
  let fixture: ComponentFixture<SpecimensCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecimensCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecimensCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

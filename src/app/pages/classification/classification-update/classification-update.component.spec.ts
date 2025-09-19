import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationUpdateComponent } from './classification-update.component';

describe('ClassificationUpdateComponent', () => {
  let component: ClassificationUpdateComponent;
  let fixture: ComponentFixture<ClassificationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassificationUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassificationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

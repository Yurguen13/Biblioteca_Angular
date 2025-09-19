import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishersDeleteComponent } from './publishers-delete.component';

describe('PublishersDeleteComponent', () => {
  let component: PublishersDeleteComponent;
  let fixture: ComponentFixture<PublishersDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublishersDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishersDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

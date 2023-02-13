import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParterComponent } from './parter.component';

describe('ParterComponent', () => {
  let component: ParterComponent;
  let fixture: ComponentFixture<ParterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

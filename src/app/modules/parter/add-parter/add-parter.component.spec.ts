import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParterComponent } from './add-parter.component';

describe('AddParterComponent', () => {
  let component: AddParterComponent;
  let fixture: ComponentFixture<AddParterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddParterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddParterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

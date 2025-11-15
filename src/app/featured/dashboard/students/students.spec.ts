import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Students } from './students';

describe('Students', () => {
  let component: Students;
  let fixture: ComponentFixture<Students>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Students],
      imports: [RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Students);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

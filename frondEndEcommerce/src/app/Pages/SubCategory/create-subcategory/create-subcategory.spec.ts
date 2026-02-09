import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubcategory } from './create-subcategory';

describe('CreateSubcategory', () => {
  let component: CreateSubcategory;
  let fixture: ComponentFixture<CreateSubcategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSubcategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSubcategory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupportsPage } from './supports.page';

describe('SupportsPage', () => {
  let component: SupportsPage;
  let fixture: ComponentFixture<SupportsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SupportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

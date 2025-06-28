import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RekapPage } from './rekap.page';

describe('RekapPage', () => {
  let component: RekapPage;
  let fixture: ComponentFixture<RekapPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RekapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

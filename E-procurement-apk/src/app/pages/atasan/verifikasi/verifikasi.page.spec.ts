import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerifikasiPage } from './verifikasi.page';

describe('VerifikasiPage', () => {
  let component: VerifikasiPage;
  let fixture: ComponentFixture<VerifikasiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifikasiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarVendorComponent } from '../../../shared/components/navbar-vendor/navbar-vendor.component';

@Component({
  selector: 'app-submit-penawaran',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarVendorComponent],
  templateUrl: './submit-penawaran.component.html',
  styleUrls: ['./submit-penawaran.component.scss']
})
export class SubmitPenawaranComponent {
  form = {
    administrasi: null as File | null,
    teknis: null as File | null,
    harga: null as File | null,
  };

  onFileChange(event: any, type: 'administrasi' | 'teknis' | 'harga') {
    const file = event.target.files[0];
    if (file) {
      this.form[type] = file;
    }
  }

  submit() {
    if (!this.form.administrasi || !this.form.teknis || !this.form.harga) {
      alert('Semua dokumen harus diunggah!');
      return;
    }

    console.log('Dokumen yang dikirim:', this.form);
    alert('Pengajuan penawaran berhasil (simulasi)');
  }
}

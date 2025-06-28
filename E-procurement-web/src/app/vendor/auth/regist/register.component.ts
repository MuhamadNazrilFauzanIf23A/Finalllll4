import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VendorsatuService } from '../../../core/service/vendorsatu.service';

@Component({
  selector: 'app-vendor-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  vendor: any = {
    namaPerusahaan: '',
    email: '',
    telepon: '',
    alamat: '',
    penanggungJawab: '',
    tahunBerdiri: '',
    website: '',
    kategori: '',
    dokumen: null,
    password: '',
    konfirmasiPassword: ''
  };

  constructor(
    private router: Router,
    private vendorService: VendorsatuService
  ) {}

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.vendor.dokumen = file;
    }
  }

  onSubmit() {
    if (
      !this.vendor.namaPerusahaan ||
      !this.vendor.email ||
      !this.vendor.telepon ||
      !this.vendor.alamat ||
      !this.vendor.penanggungJawab ||
      !this.vendor.kategori ||
      !this.vendor.dokumen ||
      !this.vendor.password ||
      !this.vendor.konfirmasiPassword
    ) {
      alert('Harap lengkapi semua data wajib.');
      return;
    }

    if (this.vendor.password !== this.vendor.konfirmasiPassword) {
      alert('Password dan konfirmasi password tidak cocok.');
      return;
    }

    const formData = new FormData();
    formData.append('nama_perusahaan', this.vendor.namaPerusahaan);
    formData.append('kategori', this.vendor.kategori);
    formData.append('email', this.vendor.email);
    formData.append('telepon', this.vendor.telepon);
    formData.append('alamat', this.vendor.alamat);
    formData.append('penanggung_jawab', this.vendor.penanggungJawab);
    formData.append('tahun_berdiri', this.vendor.tahunBerdiri);
    formData.append('website', this.vendor.website || '');
    formData.append('dokumen_legalitas', this.vendor.dokumen);
    formData.append('password', this.vendor.password);
    formData.append('password_confirmation', this.vendor.konfirmasiPassword);

    this.vendorService.registerVendor(formData).subscribe({
      next: () => {
        alert('Registrasi berhasil!');
        this.router.navigate(['/vendor/login']);
      },
      error: (err) => {
        console.error('Gagal registrasi:', err);
        alert('Registrasi gagal. Cek kembali input atau server.');
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NavbarVendorComponent } from '../../../shared/components/navbar-vendor/navbar-vendor.component';
import { VendorProfileService } from '../../../core/service/vendorprofile.service';

@Component({
  selector: 'app-vendor-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarVendorComponent, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class VendorProfileComponent implements OnInit {
  editMode = false;
  selectedFile: File | null = null;

  vendorProfile = {
    namaPerusahaan: '',
    alamat: '',
    email: '',
    telepon: '',
    penanggungJawab: '',
    tahunBerdiri: null,
    website: '',
    kategori: '',
    dokumenLegalitas: ''
  };

  constructor(private vendorService: VendorProfileService) {}

  ngOnInit() {
    this.loadProfile();
  }

  // Mengambil data profil vendor
  loadProfile() {
    this.vendorService.getProfile().subscribe({
      next: (data) => {
        if (!data || typeof data !== 'object') {
          console.error('Respon tidak valid:', data);
          return;
        }

        this.vendorProfile = {
          namaPerusahaan: data.nama_perusahaan ?? '',
          alamat: data.alamat ?? '',
          email: data.email ?? '',
          telepon: data.telepon ?? '',
          penanggungJawab: data.penanggung_jawab ?? '',
          tahunBerdiri: data.tahun_berdiri ?? null,
          website: data.website ?? '',
          kategori: data.kategori ?? '',
          dokumenLegalitas: data.dokumen_legalitas ?? ''
        };
      },
      error: (err) => {
        console.error('Gagal memuat profil vendor', err);
        alert('Gagal memuat data profil.');
      }
    });
  }

  // Fungsi untuk mendownload dokumen legalitas
  downloadDokumen() {
    if (this.vendorProfile.dokumenLegalitas) {
      const url = `http://localhost:8000/storage/${this.vendorProfile.dokumenLegalitas}`;
      window.open(url, '_blank');
    } else {
      alert('Dokumen belum tersedia.');
    }
  }

  // Fungsi untuk menangani perubahan file dokumen legalitas
  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  // Fungsi untuk mengaktifkan mode edit
  enableEdit() {
    this.editMode = true;
  }

  // Fungsi untuk membatalkan perubahan dan kembali ke data awal
  cancelEdit() {
    this.editMode = false;
    this.selectedFile = null;
    this.loadProfile(); // Kembalikan data dari backend
  }

  // Fungsi untuk menyimpan perubahan profil
  saveProfile() {
    // Validasi data profil sebelum dikirim ke backend
    if (!this.vendorProfile.namaPerusahaan || !this.vendorProfile.email || !this.vendorProfile.telepon) {
      alert('Nama Perusahaan, Email, dan Telepon wajib diisi!');
      return;
    }

    const updatedData = {
      nama_perusahaan: this.vendorProfile.namaPerusahaan,
      alamat: this.vendorProfile.alamat,
      email: this.vendorProfile.email,
      telepon: this.vendorProfile.telepon,
      penanggung_jawab: this.vendorProfile.penanggungJawab,
      tahun_berdiri: this.vendorProfile.tahunBerdiri,
      website: this.vendorProfile.website,
      kategori: this.vendorProfile.kategori
    };

    // Kirim data update profil ke backend
    this.vendorService.updateProfile(updatedData).subscribe({
      next: () => {
        if (this.selectedFile) {
          // Jika ada file dokumen legalitas yang dipilih, upload dokumen
          this.vendorService.uploadLegalitas(this.selectedFile).subscribe({
            next: () => {
              alert('Profil dan dokumen berhasil disimpan!');
              this.editMode = false;
              this.selectedFile = null;
              this.loadProfile(); // Muat ulang data profil
            },
            error: (err) => {
              console.error('Gagal upload dokumen:', err);
              alert('Profil berhasil diupdate, tapi gagal upload dokumen.');
            }
          });
        } else {
          // Jika tidak ada file dokumen, cukup simpan profil
          alert('Profil berhasil disimpan!');
          this.editMode = false;
          this.loadProfile();
        }
      },
      error: (err) => {
        console.error('Gagal update profil:', err);
        alert('Gagal menyimpan profil');
      }
    });
  }
}

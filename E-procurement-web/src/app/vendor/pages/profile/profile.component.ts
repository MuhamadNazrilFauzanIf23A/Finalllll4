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

  downloadDokumen() {
    if (this.vendorProfile.dokumenLegalitas) {
      const url = `http://localhost:8000/storage/${this.vendorProfile.dokumenLegalitas}`;
      window.open(url, '_blank');
    } else {
      alert('Dokumen belum tersedia.');
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  enableEdit() {
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
    this.selectedFile = null;
    this.loadProfile(); // Kembalikan data dari backend
  }

  saveProfile() {
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

    this.vendorService.updateProfile(updatedData).subscribe({
      next: () => {
        if (this.selectedFile) {
          this.vendorService.uploadLegalitas(this.selectedFile).subscribe({
            next: () => {
              alert('Profil dan dokumen berhasil disimpan!');
              this.editMode = false;
              this.selectedFile = null;
              this.loadProfile();
            },
            error: (err) => {
              console.error('Gagal upload dokumen:', err);
              alert('Profil berhasil diupdate, tapi gagal upload dokumen.');
            }
          });
        } else {
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

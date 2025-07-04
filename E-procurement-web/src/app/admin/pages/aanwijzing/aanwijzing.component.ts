import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { AanwijzingService } from '../../../core/service/aanwijzing.service';
import { PengadaanService } from '../../../core/service/pengadaan.service';

@Component({
  selector: 'app-aanwijzing',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './aanwijzing.html',
  styleUrls: ['./aanwijzing.scss']
})
export class AanwijzingComponent implements OnInit {
  daftarPengadaan: any[] = [];
  aanwijzingList: any[] = []; // Menyimpan daftar aanwijzing

  form = {
    pengadaan_id: '',
    tanggal: ''
  };

  selectedFiles: { [id: number]: File } = {};  // Untuk menyimpan file yang dipilih untuk upload

  constructor(
    private service: AanwijzingService,
    private pengadaanService: PengadaanService
  ) {}

  ngOnInit(): void {
    this.loadPengadaan();  // Memuat data pengadaan
    this.loadAanwijzing();  // Memuat data aanwijzing
  }

  // Memuat daftar pengadaan
  loadPengadaan() {
    this.pengadaanService.getAll().subscribe({
      next: (res: any) => {
        this.daftarPengadaan = res.data ?? res;
      },
      error: () => {
        alert('Gagal memuat data proyek pengadaan');
      }
    });
  }

loadAanwijzing() {
  this.service.getAll().subscribe({
    next: (data) => {
      console.log('Data Aanwijzing:', data);  // Cek data yang diterima
      // Urutkan data berdasarkan tanggal atau ID (sesuaikan sesuai dengan struktur data)
      this.aanwijzingList = data.map(a => ({
        ...a,
        vendorCount: a.vendorCount || 0  // Menambahkan vendorCount ke dalam data, jika tidak ada vendorCount, set ke 0
      })).sort((a, b) => new Date(b.tanggalAanwijzing).getTime() - new Date(a.tanggalAanwijzing).getTime());  // Urutkan berdasarkan tanggal terbaru
    },
    error: () => {
      alert('Gagal memuat data aanwijzing');
    }
  });
}



  // Fungsi untuk membuat jadwal aanwijzing
  jadwalkanAanwijzing() {
    if (!this.form.pengadaan_id || !this.form.tanggal) return;

    this.service.create({
      pengadaan_id: Number(this.form.pengadaan_id),
      tanggal: this.form.tanggal
    }).subscribe(() => {
      this.form = { pengadaan_id: '', tanggal: '' };
      this.loadAanwijzing();  // Setelah jadwal dibuat, muat ulang data aanwijzing
    });
  }

  // Fungsi untuk melihat dokumen yang diunggah
  lihatDokumen(a: any) {
    if (a.dokumenUrl) {
      window.open(a.dokumenUrl, '_blank');
    } else {
      alert('Belum ada dokumen diunggah.');
    }
  }

  // Fungsi untuk memilih file yang akan diupload
  onFileSelected(event: Event, id: number) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFiles[id] = file;
    }
  }

  // Fungsi untuk meng-upload file yang dipilih
  uploadSelectedFile(id: number) {
    const file = this.selectedFiles[id];
    if (!file) return;

    this.service.uploadDokumen(id, file).subscribe({
      next: () => {
        alert('Upload berhasil!');
        this.loadAanwijzing();  // Muat ulang data aanwijzing setelah upload
        delete this.selectedFiles[id];  // Hapus file yang telah di-upload dari list
      },
      error: () => {
        alert('Upload gagal!');
      }
    });
  }
}

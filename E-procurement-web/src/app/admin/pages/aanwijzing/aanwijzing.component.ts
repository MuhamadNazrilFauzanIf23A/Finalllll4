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
  aanwijzingList: any[] = [];

  form = {
    pengadaan_id: '',
    tanggal: ''
  };

  selectedFiles: { [id: number]: File } = {};

  constructor(
    private service: AanwijzingService,
    private pengadaanService: PengadaanService
  ) {}

  ngOnInit(): void {
    this.loadPengadaan();
    this.loadAanwijzing();
  }

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
        this.aanwijzingList = data;
      },
      error: () => {
        alert('Gagal memuat data aanwijzing');
      }
    });
  }

  jadwalkanAanwijzing() {
    if (!this.form.pengadaan_id || !this.form.tanggal) return;

    this.service.create({
      pengadaan_id: Number(this.form.pengadaan_id),
      tanggal: this.form.tanggal
    }).subscribe(() => {
      this.form = { pengadaan_id: '', tanggal: '' };
      this.loadAanwijzing();
    });
  }

  lihatDokumen(a: any) {
    if (a.dokumenUrl) {
      window.open(a.dokumenUrl, '_blank');
    } else {
      alert('Belum ada dokumen diunggah.');
    }
  }

  onFileSelected(event: Event, id: number) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFiles[id] = file;
    }
  }

  uploadSelectedFile(id: number) {
    const file = this.selectedFiles[id];
    if (!file) return;

    this.service.uploadDokumen(id, file).subscribe({
      next: () => {
        alert('Upload berhasil!');
        this.loadAanwijzing();
        delete this.selectedFiles[id];
      },
      error: () => {
        alert('Upload gagal!');
      }
    });
  }
}

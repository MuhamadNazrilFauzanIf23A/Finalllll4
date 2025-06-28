import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { LaporanService } from '../../../core/service/laporan.service';

@Component({
  selector: 'app-laporan',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './laporan.html',
  styleUrls: ['./laporan.scss']
})
export class LaporanComponent implements OnInit {
  divisiList = ['IT', 'Finance', 'GA', 'Procurement'];

  filter = {
    divisi: '',
    periode: 'bulan' // bisa 'bulan' atau 'minggu'
  };

  laporanData: any[] = [];

  constructor(private laporanService: LaporanService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.laporanService.getAll().subscribe({
      next: (res: any) => {
        this.laporanData = res.data.map((item: any) => ({
          ...item,
          tanggal: new Date(item.tanggal) // konversi untuk filter tanggal
        }));
      },
      error: () => alert('Gagal memuat laporan dari server.')
    });
  }

  getFilteredData() {
    const now = new Date();
    const bulanIni = new Date(now.getFullYear(), now.getMonth(), 1);
    const mingguIni = new Date();
    mingguIni.setDate(now.getDate() - 7);

    return this.laporanData.filter(item => {
      const byDivisi = this.filter.divisi ? item.divisi === this.filter.divisi : true;
      const byTanggal =
        this.filter.periode === 'minggu'
          ? new Date(item.tanggal) >= mingguIni
          : new Date(item.tanggal) >= bulanIni;
      return byDivisi && byTanggal;
    });
  }

  getTotalNominal(): number {
    return this.getFilteredData().reduce((total, item) => total + item.nominal, 0);
  }
}

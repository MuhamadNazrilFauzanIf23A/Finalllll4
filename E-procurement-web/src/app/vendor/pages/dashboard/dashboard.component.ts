import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarVendorComponent } from '../../../shared/components/navbar-vendor/navbar-vendor.component';
import { VendorTenderService } from '../../../core/service/vendor-tender.service';
import { PenawaranService } from '../../../core/service/penawaran.service'; // Impor PenawaranService

@Component({
  selector: 'app-vendor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarVendorComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class VendorDashboardComponent implements OnInit {
  tenderList: any[] = [];  // Menyimpan daftar tender

  constructor(
    private tenderService: VendorTenderService,
    private penawaranService: PenawaranService  // Injeksikan PenawaranService
  ) {}

  ngOnInit() {
    this.loadTenders();
  }

  loadTenders() {
    this.tenderService.getTenders().subscribe({
      next: (data) => {
        console.log(data);  // Cek data yang diterima dari backend
        this.tenderList = data;  // Menyimpan data yang diterima ke dalam array tenderList
        this.checkPenawaranStatus();  // Mengecek status penawaran setiap kali daftar tender dimuat
      },
      error: (err) => {
        console.error('Gagal mengambil data tender', err);
      }
    });
  }

  // Mengecek apakah vendor sudah mengajukan penawaran
  checkPenawaranStatus() {
    this.tenderList.forEach((tender) => {
      this.penawaranService.checkPenawaranTersedia(tender.id).subscribe({
        next: (isPenawaranDiajukan) => {
          tender.isPenawaranDiajukan = isPenawaranDiajukan;  // Menandai apakah penawaran sudah diajukan
        },
        error: (err) => {
          console.error('Gagal memeriksa status penawaran', err);
        }
      });
    });
  }
}

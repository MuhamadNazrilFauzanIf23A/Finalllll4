import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarVendorComponent } from '../../../shared/components/navbar-vendor/navbar-vendor.component';
import { VendorAanwijzingService } from '../../../core/service/vendor-aanwijzing.service';  // Menggunakan service yang baru

@Component({
  selector: 'app-jadwal-aanwijzing',
  standalone: true,
  imports: [CommonModule, NavbarVendorComponent],
  templateUrl: './jadwal-aanwijzing.component.html',
  styleUrls: ['./jadwal-aanwijzing.component.scss']
})
export class JadwalAanwijzingComponent implements OnInit {
  daftarAanwijzing: any[] = [];  // Menyimpan data aanwijzing untuk vendor

  constructor(private vendorAanwijzingService: VendorAanwijzingService) {}

  ngOnInit(): void {
    this.loadAanwijzing();  // Memuat data aanwijzing saat komponen diinisialisasi
  }

  // Memuat data aanwijzing untuk vendor
  loadAanwijzing() {
    this.vendorAanwijzingService.getVendorAanwijzing().subscribe({
      next: (data) => {
        this.daftarAanwijzing = data;  // Menyimpan data yang diterima
      },
      error: () => {
        alert('Gagal memuat data aanwijzing');
      }
    });
  }

  // Fungsi untuk konfirmasi kehadiran
  konfirmasiKehadiran(item: any) {
    if (!item.konfirmasi) {
      this.vendorAanwijzingService.followAanwijzing(item.id).subscribe({
        next: (response) => {
          item.konfirmasi = true;  // Menandai kehadiran sebagai dikonfirmasi
          item.status = 'Berlangsung';  // Update status menjadi "Berlangsung"
          alert(`Kehadiran untuk "${item.namaProyek}" telah dikonfirmasi.`);
        },
        error: (err) => {
          alert(`Gagal mengonfirmasi kehadiran: ${err.message}`);
        }
      });
    } else {
      alert(`Kehadiran untuk "${item.namaProyek}" sudah dikonfirmasi sebelumnya.`);
    }
  }
}

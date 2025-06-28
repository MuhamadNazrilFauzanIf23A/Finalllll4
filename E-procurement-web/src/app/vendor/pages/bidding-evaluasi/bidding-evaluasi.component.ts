import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarVendorComponent } from '../../../shared/components/navbar-vendor/navbar-vendor.component';

@Component({
  selector: 'app-bidding-evaluasi',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarVendorComponent],
  templateUrl: './bidding-evaluasi.component.html',
  styleUrls: ['./bidding-evaluasi.component.scss']
})
export class BiddingEvaluasiComponent {
  daftarBidding = [
    {
      namaProyek: 'Pengadaan Laptop Guru',
      penawaran: 48000000,
      status: 'Bidding Terbuka', // Bidding Terbuka | Evaluasi | Selesai
      nilaiEvaluasi: null,
      catatan: null
    },
    {
      namaProyek: 'Renovasi Lab Kimia',
      penawaran: 295000000,
      status: 'Selesai',
      nilaiEvaluasi: 85,
      catatan: 'Dokumen lengkap dan harga kompetitif'
    }
  ];

  submitBidding(item: any) {
    alert(`Penawaran Rp ${item.penawaran.toLocaleString()} untuk ${item.namaProyek} berhasil dikirim (simulasi).`);
    // Simulasi update status
    item.status = 'Evaluasi';
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { PurchaseOrderService } from '../../../core/service/purchase-order.service';

@Component({
  selector: 'app-purchase-order',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, NavbarComponent],
  templateUrl: './purchase-order.html',
  styleUrls: ['./purchase-order.scss']
})
export class PurchaseOrderComponent implements OnInit {
  daftarPO: any[] = [];

  constructor(private poService: PurchaseOrderService) {}

  ngOnInit(): void {
    this.loadPO();
  }

  loadPO() {
    this.poService.getAll().subscribe({
      next: (res) => {
        this.daftarPO = res.data ?? res;
      },
      error: () => alert('Gagal memuat data PO')
    });
  }

  onFileChange(event: any, po: any) {
    const file = event.target.files[0];
    if (file) {
      po.selectedFile = file;
    }
  }

  uploadPO(po: any) {
    if (!po.selectedFile) return;

    this.poService.uploadPO(po.id, po.selectedFile).subscribe({
      next: (res) => {
        po.filePO = res.url; // dari backend
        po.selectedFile = null;
        alert(`File PO berhasil diunggah untuk proyek "${po.namaProyek}"`);
      },
      error: () => alert('Gagal mengunggah file PO')
    });
  }

  verifikasiPembayaran(po: any) {
    this.poService.tandaiSelesai(po.id).subscribe({
      next: () => {
        alert(`Pembayaran proyek "${po.namaProyek}" telah diverifikasi`);
        this.loadPO(); // ⬅️ Reload ulang agar ambil status terbaru dari backend
      },
      error: () => alert('Gagal menandai pembayaran sebagai selesai')
    });
  }

}

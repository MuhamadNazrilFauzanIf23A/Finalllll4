import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavbarVendorComponent } from '../../../shared/components/navbar-vendor/navbar-vendor.component';
import { HasilTenderService } from '../../../core/service/vendor-hasil-tender.service';
import { PurchaseOrderVendorService } from '../../../core/service/purchaseordervendor.service';

@Component({
  selector: 'app-po-digital',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarVendorComponent],
  templateUrl: './po.component.html',
  styleUrls: ['./po.component.scss']
})
export class PoDigitalComponent implements OnInit {
  purchaseOrder: any = null;
  selectedFile: File | null = null;
  poId!: number;

  constructor(
    private route: ActivatedRoute,
    private hasilTenderService: HasilTenderService,  // Menggunakan HasilTenderService
    private poService: PurchaseOrderVendorService  // Menggunakan PurchaseOrderVendorService untuk upload bukti pembayaran
  ) {}

  ngOnInit(): void {
    // Ambil id dari URL
    this.poId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.poId) {
      // Panggil service untuk mengambil hasil tender dan mencari PO
      this.loadPurchaseOrder();
    }
  }

  // Fungsi untuk mengambil hasil tender dan mencari PO yang relevan
  loadPurchaseOrder(): void {
    this.hasilTenderService.getHasilTender().subscribe({
      next: (res) => {
        // Cari data PO berdasarkan ID dari hasil tender
        const foundPo = res.data.find((item: any) => item.id === this.poId);
        if (foundPo) {
          this.purchaseOrder = foundPo;  // Menyimpan PO yang ditemukan ke variabel purchaseOrder
        } else {
          alert('PO tidak ditemukan.');
        }
      },
      error: (err) => {
        alert('Gagal memuat data PO');
        console.error(err);
      }
    });
  }

  // Fungsi untuk download PO
  downloadPO(): void {
    if (this.purchaseOrder?.fileUrl) {
      window.open(this.purchaseOrder.fileUrl, '_blank');
    } else {
      alert('File PO belum tersedia');
    }
  }

  // Menangani pemilihan file bukti pembayaran
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  // Kirim bukti pembayaran
  kirimPembayaran(): void {
    if (!this.selectedFile || !this.purchaseOrder?.id) return;

    this.poService.uploadBuktiPembayaran(this.purchaseOrder.id, this.selectedFile).subscribe({
      next: () => {
        alert('Bukti pembayaran berhasil dikirim!');
        this.selectedFile = null;
      },
      error: (err) => {
        console.error(err);
        alert('Gagal mengirim bukti pembayaran.');
      }
    });
  }
}

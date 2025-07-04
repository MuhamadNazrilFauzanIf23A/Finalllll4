import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarVendorComponent } from '../../../shared/components/navbar-vendor/navbar-vendor.component';
import { HasilTenderService } from '../../../core/service/vendor-hasil-tender.service';
import { PurchaseOrderVendorService } from '../../../core/service/purchaseordervendor.service';

@Component({
  selector: 'app-hasil-tender',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarVendorComponent],
  templateUrl: './hasil-tender.component.html',
  styleUrls: ['./hasil-tender.component.scss']
})
export class HasilTenderComponent implements OnInit {
  hasilTenderList: any[] = [];
  selectedFiles: { [penawaranId: number]: File } = {}; // ✅ map file berdasarkan penawaranId

  constructor(
    private hasilTenderService: HasilTenderService,
    private poService: PurchaseOrderVendorService
  ) {}

  ngOnInit(): void {
    this.loadHasilTender();
  }

  // ✅ Tidak diubah
  loadHasilTender(): void {
    this.hasilTenderService.getHasilTender().subscribe({
      next: (res) => {
        this.hasilTenderList = res.data ?? [];

        console.log('📦 Data hasilTenderList:', this.hasilTenderList);
        this.hasilTenderList.forEach(item => {
          console.log('➡ penawaran_id:', item.penawaran_id);
        });
      },
      error: (err) => {
        alert('❌ Gagal memuat hasil tender');
        console.error('Error:', err);
      }
    });
  }

  downloadPO(penawaranId: number): void {
    if (!penawaranId) return;

    this.poService.getPurchaseOrderByPenawaranId(penawaranId).subscribe({
      next: (res) => {
        if (res?.data?.fileUrl) {
          window.open(res.data.fileUrl, '_blank');
        } else {
          alert('File PO tidak tersedia.');
        }
      },
      error: (err) => {
        console.error('Gagal download PO:', err);
        alert('Gagal mengunduh file PO.');
      }
    });
  }

  onFileSelected(event: Event, penawaranId: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFiles[penawaranId] = input.files[0];
      console.log(`📎 File dipilih untuk penawaran ${penawaranId}:`, this.selectedFiles[penawaranId]);
    }
  }

uploadPembayaran(penawaranId: number): void {

    console.log('✅ SUBMIT dipanggil, penawaranId:', penawaranId);
  const selectedFile = this.selectedFiles[penawaranId];

  if (!selectedFile) {
    alert('Pilih file terlebih dahulu.');
    return;
  }

  const validFileTypes = ['application/pdf', 'image/jpeg', 'image/png'];
  if (!validFileTypes.includes(selectedFile.type)) {
    alert('File tidak valid. Harap pilih PDF, JPG, atau PNG.');
    return;
  }

  const formData = new FormData();
  formData.append('bukti_pembayaran', selectedFile);

  // Kirim tanpa mengatur headers Content-Type
  this.poService.uploadRawFormData(penawaranId, formData).subscribe({
    next: () => {
      alert('✅ Bukti pembayaran berhasil di-upload!');
      delete this.selectedFiles[penawaranId];
      this.loadHasilTender();
    },
    error: (err) => {
      alert('❌ Gagal upload bukti pembayaran');
      console.error(err);
    }
  });
}

}

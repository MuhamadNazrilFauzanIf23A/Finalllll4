import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarVendorComponent } from '../../../shared/components/navbar-vendor/navbar-vendor.component';


@Component({
  selector: 'app-po-digital',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarVendorComponent],
  templateUrl: './po.component.html',
  styleUrls: ['./po.component.scss']
})
export class PoDigitalComponent {
  purchaseOrder = {
    nomor: 'PO-2025-0045',
    namaProyek: 'Pengadaan Laptop Guru',
    tanggalTerbit: new Date('2025-07-01'),
    nilai: 500000000,
    fileUrl: 'https://example.com/po/PO-2025-0045.pdf'
  };

  downloadPO() {
    window.open(this.purchaseOrder.fileUrl, '_blank');
  }
}

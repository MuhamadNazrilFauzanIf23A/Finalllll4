import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { PurchaseOrderService } from '../../../core/service/purchase-order.service';

@Component({
  selector: 'app-purchase-order',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
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
      next: (res: any) => {
        this.daftarPO = res.data ?? res;
      },
      error: () => alert('Gagal memuat data Purchase Order.')
    });
  }

  lihatPO(po: any) {
    alert(`Menampilkan PO untuk proyek "${po.proyek}"\nVendor: ${po.vendor}`);
  }
}

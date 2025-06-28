import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavbarVendorComponent } from '../../../shared/components/navbar-vendor/navbar-vendor.component';

@Component({
  selector: 'app-tender-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarVendorComponent],
  templateUrl: './tender-detail.component.html',
  styleUrls: ['./tender-detail.component.scss']
})
export class TenderDetailComponent {
  tenderId: string | null = null;
  tenderDetail: any;

  allTenders = [
    {
      id: '1',
      nama: 'Pengadaan Laptop Guru',
      kategori: 'Barang',
      deskripsi: 'Pengadaan 50 unit laptop untuk guru SMK di seluruh provinsi.',
      batas: new Date('2025-06-30'),
      lokasi: 'Jakarta',
      nilaiProyek: 500000000,
      dokumenRks: 'https://example.com/rks.pdf'
    },
    {
      id: '2',
      nama: 'Renovasi Lab Kimia',
      kategori: 'Konstruksi',
      deskripsi: 'Renovasi laboratorium kimia lengkap dengan interior.',
      batas: new Date('2025-07-10'),
      lokasi: 'Bandung',
      nilaiProyek: 750000000,
      dokumenRks: 'https://example.com/lab.pdf'
    }
  ];

  constructor(private route: ActivatedRoute) {
    this.tenderId = this.route.snapshot.paramMap.get('id');
    this.tenderDetail = this.allTenders.find(t => t.id === this.tenderId);
  }
}

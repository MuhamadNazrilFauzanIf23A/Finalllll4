import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarVendorComponent } from '../../../shared/components/navbar-vendor/navbar-vendor.component';

@Component({
  selector: 'app-jadwal-aanwijzing',
  standalone: true,
  imports: [CommonModule, NavbarVendorComponent],
  templateUrl: './jadwal-aanwijzing.component.html',
  styleUrls: ['./jadwal-aanwijzing.component.scss']
})
export class JadwalAanwijzingComponent {
  daftarAanwijzing = [
  {
    namaProyek: 'Pengadaan Server',
    jadwal: new Date('2025-06-15T10:00:00'),
    status: 'Dijadwalkan',
    konfirmasi: true
  },
  {
    namaProyek: 'Proyek Jaringan Kantor',
    jadwal: new Date('2025-06-10T14:00:00'),
    status: 'Selesai',
    konfirmasi: true
  }
];

konfirmasiKehadiran(item: any) {
  item.konfirmasi = true;
  alert(`Kehadiran untuk "${item.namaProyek}" telah dikonfirmasi.`);
}

lihatDokumen(item: any) {
  alert(`Fungsi melihat dokumen belum diimplementasi. (simulasi)`);
}
}

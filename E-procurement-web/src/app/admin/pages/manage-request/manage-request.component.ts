import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PermintaanService } from '../../../core/service/permintaan.service';

@Component({
  selector: 'app-manage-request',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    RouterModule
  ],
  templateUrl: './manage-request.html',
  styleUrls: ['./manage-request.scss']
})
export class ManageRequestsComponent implements OnInit {
  daftarPermintaan: any[] = [];
  loading: boolean = false;

  constructor(private permintaanService: PermintaanService) {}

ngOnInit(): void {
  this.loading = true;

  this.permintaanService.getAll().subscribe({
    next: (res) => {
      this.daftarPermintaan = res.map((permintaan: any) => ({
        ...permintaan,
        spesifikasi: permintaan.spesifikasi || '-',    // Default if null/undefined
        kuantitas: permintaan.kuantitas ?? 0,          // Accept 0 but fallback to 0 if null
        alasan: permintaan.alasan || 'N/A',            // Default if null
        file_pdf: permintaan.file_pdf || null          // Optional, for PDF preview
      }));

      // Urutkan berdasarkan tanggal_disetujui, yang terbaru di atas
      this.daftarPermintaan.sort((a, b) => {
        return new Date(b.tanggal_disetujui).getTime() - new Date(a.tanggal_disetujui).getTime();
      });

      this.loading = false;
    },
    error: (err) => {
      console.error('Gagal ambil data permintaan:', err);
      this.loading = false;
    }
  });
}

}

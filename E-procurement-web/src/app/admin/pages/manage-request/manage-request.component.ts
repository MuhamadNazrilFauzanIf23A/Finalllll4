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
  loading = false;

  constructor(private permintaanService: PermintaanService) {}

  ngOnInit(): void {
    this.loading = true;

    this.permintaanService.getAll().subscribe({
      next: (res) => {
        this.daftarPermintaan = res;
        this.loading = false;
      },
      error: (err) => {
        console.error('Gagal ambil data permintaan:', err);
        this.loading = false;
      }
    });
  }
}

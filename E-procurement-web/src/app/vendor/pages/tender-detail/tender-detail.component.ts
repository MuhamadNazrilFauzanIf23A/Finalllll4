import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { NavbarVendorComponent } from '../../../shared/components/navbar-vendor/navbar-vendor.component';
import { PenawaranService } from '../../../core/service/penawaran.service';
import { VendorTenderService } from '../../../core/service/vendor-tender.service';

@Component({
  selector: 'app-tender-detail',
  standalone: true,
  imports: [FormsModule, RouterModule, NavbarVendorComponent, CommonModule],
  templateUrl: './tender-detail.component.html',
  styleUrls: ['./tender-detail.component.scss']
})
export class TenderDetailComponent implements OnInit {
  tenderId: string | null = null;
  tenderDetail: any = {}; // Data tender yang akan ditampilkan
  penawaran = {
    hargaPenawaran: 0,
    filePenawaran: null as File | null
  };

  constructor(
    private route: ActivatedRoute,
    private penawaranService: PenawaranService,
    private vendorTenderService: VendorTenderService,
     private router: Router
  ) {}

  ngOnInit() {
    this.tenderId = this.route.snapshot.paramMap.get('id');
    this.getTenderDetail();
  }

  // Fungsi untuk mengambil detail tender dari backend
  getTenderDetail() {
    if (!this.tenderId) {
      console.error('ID tender tidak ditemukan');
      return;
    }

    this.vendorTenderService.getTenders().subscribe({
      next: (data: any[]) => {
        const tender = data.find(t => t.id.toString() === this.tenderId);

        if (tender) {
          this.tenderDetail = tender;
          console.log(this.tenderDetail);  // Debugging: cek data yang diterima
        } else {
          console.error('Tender tidak ditemukan');
        }
      },
      error: (err) => {
        console.error('Gagal mengambil data tender', err);
      }
    });
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.penawaran.filePenawaran = input.files[0];
    }
  }

  submitPenawaran() {
    const formData = new FormData();
    
    // Mendapatkan vendor_id dari localStorage
    const vendorId = localStorage.getItem('vendorId'); 

    if (vendorId) {
      formData.append('vendor_id', vendorId);
    } else {
      console.error('Vendor ID tidak ditemukan!');
      return;
    }

    formData.append('pengadaan_id', this.tenderDetail.id);
    formData.append('harga_penawaran', this.penawaran.hargaPenawaran.toString());
    formData.append('file_url', this.penawaran.filePenawaran as Blob);

    this.penawaranService.submitPenawaran(formData).subscribe({
      next: (response) => {
        alert('Penawaran berhasil diajukan!');
        console.log(response);
        this.router.navigate(['/vendor/dashboard']);
      },
      error: (err) => {
        alert('Gagal mengajukan penawaran!');
        console.error(err);
      }
    });
  }

}

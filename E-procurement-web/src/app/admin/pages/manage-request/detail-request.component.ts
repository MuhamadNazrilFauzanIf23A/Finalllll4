import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PermintaanService } from '../../../core/service/permintaan.service';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-detail-request',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './detail-request.component.html',
  styleUrls: ['./detail-request.componen.scss']
})
export class DetailRequestComponent implements OnInit {
  permintaan: any = null;

  constructor(
    private route: ActivatedRoute,
    private permintaanService: PermintaanService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.permintaanService.getById(+id).subscribe({
        next: (res) => this.permintaan = res,
        error: (err) => console.error(err)
      });
    }
  }
}

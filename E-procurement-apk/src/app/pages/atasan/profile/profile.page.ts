import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SidebarAtasanComponent } from 'src/app/components/sidebar-atasan/sidebar-atasan.component';

@Component({
  selector: 'app-profil-atasan',
  standalone: true,
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
    SidebarAtasanComponent,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfilAtasanPage {
  user = {
    nama: 'Rizky',
    email: 'RizkyTakbir@perusahaan.com',
    role: 'Supervisor Divisi IT'
  };
}

import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule, SidebarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
})
export class ProfilePage {
  user = {
    nama: 'Muhammad Nazril',
    role: 'Pengaju',
    email: 'nazril@example.com',
  };
}

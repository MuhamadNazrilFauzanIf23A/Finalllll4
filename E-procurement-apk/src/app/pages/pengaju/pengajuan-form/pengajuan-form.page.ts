import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { PermintaanService } from '../../../core/services/permintaan.service';

@Component({
  selector: 'app-pengajuan-form',
  standalone: true,
  templateUrl: './pengajuan-form.page.html',
  styleUrls: ['./pengajuan-form.page.scss'],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SidebarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PengajuanFormPage implements OnInit {
  formPengajuan!: FormGroup;
  isSubmitted = false;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private permintaanService: PermintaanService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.formPengajuan = this.fb.group({
      item: ['', Validators.required],
      spesifikasi: ['', Validators.required],
      kuantitas: ['', [Validators.required, Validators.min(1)]],
      nominal: ['', [Validators.required, Validators.min(0)]],
      alasan: ['', Validators.required],
      divisi: ['', Validators.required]
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFile = file;
      console.log('📎 File PDF dipilih:', file.name);
    } else {
      this.selectedFile = null;
      this.presentToast('Hanya file PDF yang diperbolehkan', 'danger');
    }
  }

  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2500,
      color,
      position: 'top'
    });
    toast.present();
  }

  submitPengajuan() {
    this.isSubmitted = true;

    if (this.formPengajuan.valid && this.selectedFile) {
      const data = this.formPengajuan.value;
      const formData = new FormData();

      formData.append('nama_proyek', data.item);
      formData.append('spesifikasi', data.spesifikasi);
      formData.append('kuantitas', data.kuantitas);
      formData.append('nominal', data.nominal);
      formData.append('alasan', data.alasan);
      formData.append('divisi', data.divisi);
      formData.append('file_pdf', this.selectedFile);

      this.permintaanService.createPermintaan(formData).subscribe({
        next: res => {
          console.log('✅ Pengajuan berhasil:', res);
          this.presentToast('Pengajuan berhasil dikirim!');
          this.formPengajuan.reset();
          this.selectedFile = null;
          this.isSubmitted = false;
        },
        error: err => {
          console.error('❌ Gagal mengajukan:', err);
          this.presentToast('Gagal mengirim pengajuan', 'danger');
        }
      });
    } else {
      this.presentToast('Lengkapi semua kolom dan unggah file PDF', 'danger');
    }
  }
}

  import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
  import { IonicModule } from '@ionic/angular';
  import { SidebarComponent } from '../../../components/sidebar/sidebar.component';
  import { RouterModule } from '@angular/router';

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

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
      this.formPengajuan = this.fb.group({
        item: ['', Validators.required],
        spesifikasi: ['', Validators.required],
        kuantitas: ['', [Validators.required, Validators.min(1)]],
        alasan: ['', Validators.required],
        divisi: ['', Validators.required] // ✅ tambahkan divisi
      });
    }

    onFileSelected(event: any) {
      const file: File = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        console.log('Dokumen dipilih:', file.name);
      }
    }

    submitPengajuan() {
      this.isSubmitted = true;

      if (this.formPengajuan.valid) {
        const data = this.formPengajuan.value;

        const formData = new FormData();
        formData.append('item', data.item);
        formData.append('spesifikasi', data.spesifikasi);
        formData.append('kuantitas', data.kuantitas);
        formData.append('alasan', data.alasan);
        formData.append('divisi', data.divisi); // ✅ kirim divisi

        if (this.selectedFile) {
          formData.append('dokumen', this.selectedFile);
        }

        // Simulasi pengiriman data
        console.log('📦 FormData ready to send:');
        formData.forEach((value, key) => {
          console.log(`${key}:`, value);
        });

        // TODO: Kirim ke backend pakai HttpClient jika sudah siap
      }
    }
  }

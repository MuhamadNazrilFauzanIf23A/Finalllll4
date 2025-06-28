import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-sidebar-atasan',
  templateUrl: './sidebar-atasan.component.html',
  styleUrls: ['./sidebar-atasan.component.scss'],
})
export class SidebarAtasanComponent  implements OnInit {

  constructor() { }
  
  ngOnInit() {}

}

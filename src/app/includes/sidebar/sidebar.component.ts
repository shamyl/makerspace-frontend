import {Component, OnInit, ViewChild} from '@angular/core';
import {Sidebar} from 'primeng/sidebar';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  visible = false;
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;


  constructor() { }

  ngOnInit(): void {
  }
  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

}

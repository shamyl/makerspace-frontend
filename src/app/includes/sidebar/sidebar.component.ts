import {Component, OnInit, ViewChild} from '@angular/core';
import {Sidebar} from 'primeng/sidebar';
import {Route, Router} from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  visible = false;
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
   dropdownVisible: any;


  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible; // Toggle dropdown visibility
  }
}

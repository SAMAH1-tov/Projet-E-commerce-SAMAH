import {ChangeDetectorRef, Component, inject, OnInit, signal} from '@angular/core';
import {Router} from '@angular/router';
import {Driver} from '../../../models/driver';
import {DriverService} from '../../../Services/driver-service';
import { NavBar } from "../../comp/nav-bar/nav-bar";
import { SideBar } from "../../comp/side-bar/side-bar";

@Component({
  selector: 'app-driver-list',
  imports: [NavBar, SideBar],
  templateUrl: './driver-list.html',
  styleUrl: './driver-list.css',
})
export class DriverList implements OnInit {
  drivers: Driver[] = [];
  filteredDrivers: Driver[] = [];
  searchTerm: string = '';

  public constructor(private driverService: DriverService, private cd: ChangeDetectorRef, private router: Router) {
  }

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {
    this.driverService.findAll().subscribe({
      next: (data) => {
        this.drivers = data;
        this.filteredDrivers = data;
        this.cd.detectChanges();
      },
    });
  }

  filterByName(term: string): void {
    this.searchTerm = term;
    if (!term || term.trim() === '') {
      this.filteredDrivers = this.drivers;
    } else {
      this.filteredDrivers = this.drivers.filter(driver =>
        (driver.firstName || '').toLowerCase().includes(term.toLowerCase()) ||
        (driver.lastName || '').toLowerCase().includes(term.toLowerCase()) ||
        (driver.email || '').toLowerCase().includes(term.toLowerCase())
      );
    }
    this.cd.detectChanges();
  }

  updateDriver(id: number): void {
    this.router.navigate(['edit-driver/' + id]);
  }

  deleteDriver(id: number): void {
    this.driverService.delete(id).subscribe({
      next: () => {
        this.drivers = this.drivers.filter(d => d.id !== id);
        this.filterByName(this.searchTerm);
      },
      error: err => console.error("Erreur lors de la suppression", err)
    });
  }
}

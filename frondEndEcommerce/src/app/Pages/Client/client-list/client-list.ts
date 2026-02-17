import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Client} from '../../../models/client';
import { NavBar } from "../../comp/nav-bar/nav-bar";
import { SideBar } from "../../comp/side-bar/side-bar";
import { ClientsService } from '../../../Services/clients-service';

@Component({
  selector: 'app-client-list',
  imports: [NavBar, SideBar],
  templateUrl: './client-list.html',
  styleUrl: './client-list.css',
})
export class ClientList implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  searchTerm: string = '';

  public constructor(private clientService: ClientsService, private cd: ChangeDetectorRef, private router: Router) {
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.findAll().subscribe({
      next: (data) => {
        this.clients = data;
        this.filteredClients = data;
        this.cd.detectChanges();
      },
    });
  }

  filterByName(term: string): void {
    this.searchTerm = term;
    if (!term || term.trim() === '') {
      this.filteredClients = this.clients;
    } else {
      this.filteredClients = this.clients.filter(client =>
        (client.firstName || '').toLowerCase().includes(term.toLowerCase()) ||
        (client.lastName || '').toLowerCase().includes(term.toLowerCase()) ||
        (client.email || '').toLowerCase().includes(term.toLowerCase())
      );
    }
    this.cd.detectChanges();
  }

  updateClient(id: number): void {
    this.router.navigate(['edit-client/' + id]);
  }

  deleteClient(id: number): void {
    this.clientService.delete(id).subscribe({
      next: () => {
        this.clients = this.clients.filter(c => c.id !== id);
        this.filterByName(this.searchTerm);
      },
      error: err => console.error("Erreur lors de la suppression", err)
    });
  }
}

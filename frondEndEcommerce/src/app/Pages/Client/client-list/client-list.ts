import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Client} from '../../../models/client';
import { NavBar } from "../../comp/nav-bar/nav-bar";
import { SideBar } from "../../comp/side-bar/side-bar";
import { ClientsService } from '../../../Services/clients-service';
import { AuthService } from '../../../Services/auth-service';
import { UserService } from '../../../Services/user-service';

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

  public constructor(
    private clientService: ClientsService, 
    private cd: ChangeDetectorRef, 
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadCurrentUser();
    this.loadClients();
  }

  loadCurrentUser(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userService.setCurrentUser(user);
    }
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

  editClient(id: number): void {
    this.router.navigate(['edit-client/' + id]);
  }

  updateClient(id: number): void {
    this.router.navigate(['edit-client/' + id]);
  }

  deleteClient(id: number): void {
    const client = this.clients.find(c => c.id === id);
    if (!client) return;

    if (confirm(`Êtes-vous sûr de vouloir supprimer le client ${client.firstName} ${client.lastName} ?`)) {
      this.clientService.delete(id).subscribe({
        next: () => {
          this.clients = this.clients.filter(c => c.id !== id);
          this.filterByName(this.searchTerm);
          console.log(`Client ${client.firstName} ${client.lastName} supprimé avec succès`);
        },
        error: (err) => {
          console.error("Erreur lors de la suppression du client:", err);
          alert('Erreur lors de la suppression du client. Veuillez réessayer.');
        }
      });
    }
  }
}

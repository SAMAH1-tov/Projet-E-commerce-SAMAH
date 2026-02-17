import {ChangeDetectorRef, Component, inject, OnInit, signal} from '@angular/core';
import {Router} from '@angular/router';
import { NavBar } from "../../comp/nav-bar/nav-bar";
import { SideBar } from "../../comp/side-bar/side-bar";
import { Provider } from '../../../models/provider';
import { ProviderService } from '../../../Services/provider-service';

@Component({
  selector: 'app-provider-list',
  imports: [NavBar, SideBar],
  templateUrl: './provider-list.html',
  styleUrl: './provider-list.css',
})
export class ProviderList implements OnInit  {
  providers: Provider[] = [];
  filteredProviders: Provider[] = [];
  searchName: string = '';
  searchCompany: string = '';

  public constructor(private providerService: ProviderService, private cd: ChangeDetectorRef, private router: Router) {
  }

  ngOnInit(): void {
      this.loadProviders()
  }

    loadProviders(): void {
    this.providerService.findAll().subscribe({
      next: data => {
        this.providers = data;
        this.filteredProviders = data;
        this.cd.detectChanges();
      },
      error: err => console.error('Erreur lors du chargement des fournisseurs', err)
    });
  }

  filterByName(name: string): void {
    this.searchName = name;
    this.applyFilters();
  }

  filterByCompany(company: string): void {
    this.searchCompany = company;
    this.applyFilters();
  }

  private applyFilters(): void {
    this.filteredProviders = this.providers.filter(provider => {
      const nameMatch = !this.searchName || this.searchName.trim() === '' || 
        (provider.firstName + ' ' + provider.lastName).toLowerCase().includes(this.searchName.toLowerCase());
      const companyMatch = !this.searchCompany || this.searchCompany.trim() === '' || 
        (provider.company || '').toLowerCase().includes(this.searchCompany.toLowerCase());
      return nameMatch && companyMatch;
    });
    this.cd.detectChanges();
  }

  updateProvider(id: number): void {
    this.router.navigate(['edit-provider/' + id])
  }

  deleteProvider(id: number) {
    this.providerService.delete(id).subscribe({
      next: () => {
        this.providers = this.providers.filter(p => p.id !== id);
        this.applyFilters();
      },
      error: err => console.error("Erreur lors de la suppression du fournisseur", err)
    })
  }
  
}

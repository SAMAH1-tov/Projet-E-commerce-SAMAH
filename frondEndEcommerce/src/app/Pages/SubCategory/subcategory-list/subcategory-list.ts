import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { SubCategory } from '../../../models/sub-category';
import { SubcategoryService } from '../../../Services/subcategory-service';
import { NavBar } from "../../comp/nav-bar/nav-bar";
import { SideBar } from "../../comp/side-bar/side-bar";

@Component({
  selector: 'app-subcategory-list',
  imports: [NavBar, SideBar],
  templateUrl: './subcategory-list.html',
  styleUrl: './subcategory-list.css',
})
export class SubcategoryList implements OnInit {
  subcategories: SubCategory[] = [];
  filteredSubcategories: SubCategory[] = [];
  searchName: string = '';
  isLoading: boolean = true;
  errorMessage: string = '';

  public constructor(
    private subcategoryService: SubcategoryService, 
    private cd: ChangeDetectorRef, 
    private router: Router) {
  }

  ngOnInit(): void {
    this.loadSubcategories();
  }

  loadSubcategories(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.subcategoryService.findAll().subscribe({
      next: (data: SubCategory[]) => {
        console.log('Subcategories loaded:', data);
        this.subcategories = data;
        this.filteredSubcategories = data;
        this.isLoading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des sous-catégories:', err);
        this.errorMessage = 'Erreur lors du chargement des sous-catégories. Veuillez réessayer plus tard.';
        this.isLoading = false;
        this.subcategories = [];
        this.filteredSubcategories = [];
        this.cd.detectChanges();
      }
    });
  }

  filterByName(name: string): void {
    this.searchName = name;
    if (!name || name.trim() === '') {
      this.filteredSubcategories = this.subcategories;
    } else {
      this.filteredSubcategories = this.subcategories.filter(subcat =>
        (subcat.name || '').toLowerCase().includes(name.toLowerCase())
      );
    }
    this.cd.detectChanges();
  }

  updateSubcategory(id: number): void {
    this.router.navigate(['edit-subcategory/' + id]);
  }

  deleteSubcategory(id: number): void {
    this.subcategoryService.delete(id).subscribe({
      next: () => {
        this.subcategories = this.subcategories.filter(s => s.id !== id);
        this.filterByName(this.searchName);
      },
      error: err => console.error("Erreur lors de la suppression", err)
    });
  }
}

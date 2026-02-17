import {ChangeDetectorRef, Component, inject, OnInit, signal} from '@angular/core';
import {Router} from '@angular/router';
import { NavBar } from "../../comp/nav-bar/nav-bar";
import { SideBar } from "../../comp/side-bar/side-bar";
import { Category } from '../../../models/category';
import { CategoryService } from '../../../Services/category-service';

@Component({
  selector: 'app-category-list',
  imports: [NavBar, SideBar],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css',
})
export class CategoryList implements OnInit  {
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  searchName: string = '';
  searchRef: string = '';

  public constructor(private categoryService: CategoryService,private cd: ChangeDetectorRef,private router: Router) {
  }

  ngOnInit(): void {
      this.loadCategories()
  }

    loadCategories(): void {
    this.categoryService.findAll().subscribe({
      next: a => {
        this.categories = a;
        this.filteredCategories = a;
        this.cd.detectChanges();
      },
    });
  }

  filterByName(name: string): void {
    this.searchName = name;
    if (!name || name.trim() === '') {
      this.filteredCategories = this.categories;
    } else {
      this.filteredCategories = this.categories.filter(cat =>
        (cat.name || '').toLowerCase().includes(name.toLowerCase())
      );
    }
    this.cd.detectChanges();
  }

  updateCategory(id: number): void {
    this.router.navigate(['edit-category/' + id])
  }
    deleteCategory(id: number) {
    this.categoryService.delete(id).subscribe({
      next: () => {
        this.categories = this.categories.filter(c => c.id !== id);
        this.filterByName(this.searchName);
      },
      error: err => console.error("Erreur lors de la suppression", err)
    })
  }
  
}

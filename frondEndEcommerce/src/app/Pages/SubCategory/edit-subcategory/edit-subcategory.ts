import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { SubCategory } from '../../../models/sub-category';
import { SubcategoryService } from '../../../Services/subcategory-service';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../Services/category-service';
import { SideBar } from "../../comp/side-bar/side-bar";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-subcategory',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SideBar,
    CommonModule
  ],
  templateUrl: './edit-subcategory.html',
  styleUrl: './edit-subcategory.css',
})
export class EditSubcategory implements OnInit {
  subcategory: SubCategory;
  form: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private subcategoryService: SubcategoryService,
    private categoryService: CategoryService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    public actRoute: ActivatedRoute,
  ) {}

  loadSubcategory(): void {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.subcategoryService.findById(id).subscribe(data => {
      this.subcategory = data;
      this.initForm();
      this.cdRef.detectChanges();
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      name: [this.subcategory.name, Validators.required],
      description: [this.subcategory.description, Validators.required],
      category: [this.subcategory.category, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSubcategory();
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.findAll().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
      },
      error: (err: any) => console.error('Erreur lors du chargement des catégories', err)
    });
  }

  updateSubcategory(): void {
    this.subcategory.name = this.form.get('name')?.value;
    this.subcategory.description = this.form.get('description')?.value;
    this.subcategory.category = this.form.get('category')?.value;

    this.subcategoryService.save(this.subcategory).subscribe({
      next: () => this.router.navigate(['subcategory-list']),
      error: (error: any) => console.error('Erreur lors de la mise à jour de la sous-catégorie', error)
    });
  }
}

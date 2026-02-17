import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { SubCategory } from '../../../models/sub-category';
import { SubcategoryService } from '../../../Services/subcategory-service';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../Services/category-service';
import { SideBar } from "../../comp/side-bar/side-bar";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-subcategory',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SideBar,
    CommonModule
  ],
  templateUrl: './create-subcategory.html',
  styleUrl: './create-subcategory.css',
})
export class CreateSubcategory implements OnInit {
  subcategory: SubCategory;
  form: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private subcategoryService: SubcategoryService,
    private categoryService: CategoryService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  initForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      category: [null, Validators.required]

    });
  }

  ngOnInit(): void {
    this.subcategory = new SubCategory();
    this.initForm();
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

  createSubcategory(): void {
    if (this.form.invalid) {
      console.error('Formulaire invalide');
      return;
    }

    const subcategory = new SubCategory();
    subcategory.name = this.form.get('name')?.value;
    subcategory.description = this.form.get('description')?.value;
    
    // Récupérer l'ID de la catégorie sélectionnée
    const categoryId = this.form.get('category')?.value;
    if (categoryId) {
      // Trouver l'objet Category correspondant
      subcategory.category = this.categories.find(cat => cat.id == categoryId) || null;
    }

    console.log('Creating subcategory payload:', subcategory);

    this.subcategoryService.save(subcategory).subscribe({
      next: () => {
        console.log('Sous-catégorie créée avec succès');
        this.router.navigate(['subcategory-list']);
      },
      error: (error: any) => {
        console.error('erreur de création de la sous-catégorie', error);
        // Afficher un message d'erreur à l'utilisateur si nécessaire
      }
    });
  }
}

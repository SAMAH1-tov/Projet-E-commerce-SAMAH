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
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private subcategoryService: SubcategoryService,
    private categoryService: CategoryService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(5)]],
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
        console.log('Categories loaded:', data);
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des catégories', err);
        this.errorMessage = 'Erreur lors du chargement des catégories';
      }
    });
  }

  createSubcategory(): void {
    if (this.form.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const subcategory = new SubCategory();
    subcategory.name = this.form.get('name')?.value.trim();
    subcategory.description = this.form.get('description')?.value.trim();
    
    // Récupérer l'ID de la catégorie sélectionnée
    const categoryId = this.form.get('category')?.value;
    if (categoryId) {
      // Créer un objet Category avec juste l'ID pour le backend
      const selectedCategory = new Category();
      selectedCategory.id = categoryId;
      subcategory.category = selectedCategory;
    }

    console.log('Creating subcategory payload:', subcategory);

    this.subcategoryService.save(subcategory).subscribe({
      next: (response) => {
        console.log('Subcategory created successfully:', response);
        this.isLoading = false;
        this.router.navigate(['subcategory-list']);
      },
      error: (error: any) => {
        console.error('Erreur de création de la sous-catégorie', error);
        this.isLoading = false;
        this.errorMessage = 'Erreur lors de la création de la sous-catégorie';
      }
    });
  }

  // Helper pour vérifier les erreurs de formulaire
  hasError(controlName: string, errorType: string): boolean {
    const control = this.form.get(controlName);
    return control ? control.hasError(errorType) && control.touched : false;
  }
}

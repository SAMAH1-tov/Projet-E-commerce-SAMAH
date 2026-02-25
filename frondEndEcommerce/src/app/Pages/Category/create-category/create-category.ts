import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CategoryService } from '../../../Services/category-service';
import { Category } from '../../../models/category';
import { SideBar } from "../../comp/side-bar/side-bar";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-category',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SideBar,
    CommonModule
  ],
  templateUrl: './create-category.html',
  styleUrls: ['./create-category.css'],
})
export class CreateCategory implements OnInit {

  category: Category;
  form: FormGroup;
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.category = new Category();
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      name_cat: ['', [Validators.required, Validators.minLength(2)]],
      description_cat: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  createCategory(): void {
    if (this.form.invalid) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const category = new Category();
    category.name = this.form.get('name_cat')?.value.trim();
    category.description = this.form.get('description_cat')?.value.trim();
    // Ne pas inclure subCategory - le backend l'initialisera comme liste vide

    console.log('Creating category payload:', category);

    this.categoryService.save(category).subscribe({
      next: (response: any) => {
        console.log('Category created successfully:', response);
        this.isLoading = false;
        this.router.navigate(['category-list']);
      },
      error: (error: any) => {
        console.error('Error creating category:', error);
        this.isLoading = false;
        this.errorMessage = 'Erreur lors de la création de la catégorie';
      }
    });
  }

  // Helper pour vérifier les erreurs de formulaire
  hasError(controlName: string, errorType: string): boolean {
    const control = this.form.get(controlName);
    return control ? control.hasError(errorType) && control.touched : false;
  }
}

import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { CategoryService } from '../../../Services/category-service';
import { Category } from '../../../models/category';
import { SubCategory } from '../../../models/sub-category';
import { SideBar } from "../../comp/side-bar/side-bar";

@Component({
  selector: 'app-create-category',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SideBar
],
  templateUrl: './create-category.html',
  styleUrl: './create-category.css',
})
export class CreateCategory implements OnInit {

  category : Category
  form: FormGroup

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
      name_cat: [null, Validators.required],
      description_cat: [null, Validators.required],
    });
  }

  createCategory(): void {
    const category = new Category();
    category.name = this.form.get('name_cat')?.value;
    category.description = this.form.get('description_cat')?.value;
    category.subCategory = null;
    this.categoryService.save(category).subscribe({
      next: (response: any) => {
        this.router.navigate(['category-list']);
      },
      error: (error: any) => {
        console.error('erreur de création de la catégorie', error);
      }
    });
  }
  

}

import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { Category } from '../../../models/category';
import { CategoryService } from '../../../Services/category-service';
import { SideBar } from "../../comp/side-bar/side-bar";
@Component({
  selector: 'app-edit-category',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SideBar
],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory implements OnInit {
  form: FormGroup;
  category!: Category;

  constructor(
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    public actRoute: ActivatedRoute,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.loadCategory();
  }
  initForm(): void {  
    this.form = this.formBuilder.group({
      name_cat: [this.category.name, Validators.required],
      description_cat: [this.category.description, Validators.required],
    });
  }

  loadCategory(): void {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.categoryService.findById(id).subscribe(data => {
      this.category = data;
      this.initForm();
      console.log(data);
      this.cdRef.detectChanges();
    });
  }

  updateCategory(): void {
    this.category.name  = this.form.get('name_cat')?.value;
    this.category.description  = this.form.get('description_cat')?.value;
    this.categoryService.save(this.category).subscribe({
      next: (response: any) => {
        this.router.navigate(['category-list']);
      },
      error: (error: any) => {
        console.error('Erreur de mise à jours', error);
      }
    });
  }
}

import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Product } from '../../../models/product';
import { ProductService } from '../../../Services/product-service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { SideBar } from "../../comp/side-bar/side-bar";
import { Gallery } from '../../../models/gallery';
import { GalleryService } from '../../../Services/gallery-service';
import { SubCategory } from '../../../models/sub-category';
import { SubcategoryService } from '../../../Services/subcategory-service';

@Component({
  selector: 'app-edit-product',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SideBar
  ],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css',
})
export class EditProduct implements OnInit {
  product: Product;
  form: FormGroup;
  selectedFile!: File;
  previewUrl: any;
  subcategories: SubCategory[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    public actRoute: ActivatedRoute,
    private galleryService: GalleryService,
    private subcategoryService: SubcategoryService,
  ) {}

  ngOnInit(): void {
    this.loadProduct();
    this.loadSubcategories();
  }

  loadSubcategories(): void {
    this.subcategoryService.findAll().subscribe({
      next: (data: SubCategory[]) => {
        this.subcategories = data;
      },
      error: (error: any) => {
        console.error('Error loading subcategories:', error);
      }
    });
  }

  loadProduct(): void {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.productService.findById(id).subscribe(data => {
      this.product = data;
      this.initForm();
      if (this.product && this.product.gallery && this.product.gallery.url_photo) {
        const url = this.product.gallery.url_photo;
        this.previewUrl = url.startsWith('http') ? url : ('http://localhost:8080' + url);
      }
      console.log(data);
      this.cdRef.detectChanges();
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      ref: [this.product.ref, Validators.required],
      description: [this.product.description, Validators.required],
      quantity: [this.product.quantity, [Validators.required, Validators.min(0)]],
      price: [this.product.price, [Validators.required, Validators.min(0)]],
      url_photo: [null],
      subcategoryId: [this.product.subcategory?.id || null, Validators.required]
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.previewUrl = URL.createObjectURL(this.selectedFile);
    } else {
      this.previewUrl = null;
    }
  }

  updateProduct(): void {
    this.product.ref = this.form.get('ref')?.value;
    this.product.description = this.form.get('description')?.value;
    this.product.quantity = this.form.get('quantity')?.value;
    this.product.price = this.form.get('price')?.value;
    
    // Mettre à jour la sous-catégorie
    const subcategoryId = this.form.get('subcategoryId')?.value;
    if (subcategoryId) {
      this.product.subcategory = this.subcategories.find(sc => sc.id === subcategoryId);
    }
    
    // if a new image was selected, create a gallery and upload image first
    if (this.selectedFile) {
      const gallery = new Gallery();
      gallery.url_photo = this.form.get('url_photo')?.value;
      this.galleryService.save(gallery).subscribe({
        next: (savedGallery: Gallery) => {
          this.galleryService.uploadImage(savedGallery.id, this.selectedFile).subscribe({
            next: (url: string) => {
              savedGallery.url_photo = url;
              this.product.gallery = savedGallery;
              this.productService.save(this.product).subscribe({
                next: () => this.router.navigate(['product-list']),
                error: (err: any) => console.error('erreur de mise à jour du produit après upload', err)
              });
            },
            error: (err: any) => console.error('erreur upload image', err)
          });
        },
        error: (err: any) => console.error('erreur création gallery', err)
      });
    } else {
      this.productService.save(this.product).subscribe({
        next: (response: any) => {
          this.router.navigate(['product-list']);
        },
        error: (error: any) => {
          console.error('Error updating product:', error);
        }
      });
    }
  }
}

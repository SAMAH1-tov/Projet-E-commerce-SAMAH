import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Driver } from '../../../models/driver';
import { DriverService } from '../../../Services/driver-service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../../Services/auth-service';
import { SideBar } from "../../comp/side-bar/side-bar";

@Component({
  selector: 'app-edit-driver',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SideBar
  ],
  templateUrl: './edit-driver.html',
  styleUrl: './edit-driver.css',
})
export class EditDriver implements OnInit {
  driver: Driver;
  form: FormGroup;

  constructor(
    private driverService: DriverService,
    private authService: AuthService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    public actRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.loadDriver();
  }

  loadDriver(): void {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.driverService.findById(id).subscribe(data => {
      this.driver = data;
      this.initForm();
      console.log(data);
      this.cdRef.detectChanges();
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      firstName: [this.driver.firstName, Validators.required],
      lastName: [this.driver.lastName, Validators.required],
      phone: [this.driver.phone, Validators.required],
      username: [this.driver.username, Validators.required],
      email: [this.driver.email, [Validators.required, Validators.email]],
      password: [this.authService.getDecryptedPassword(this.driver.password), Validators.required],
      adresse: [this.driver.adresse, Validators.required]
    });
  }

  updateDriver(): void {
    this.driver.firstName = this.form.get('firstName')?.value;
    this.driver.lastName = this.form.get('lastName')?.value;
    this.driver.phone = this.form.get('phone')?.value;
    this.driver.username = this.form.get('username')?.value;
    this.driver.email = this.form.get('email')?.value;
    this.driver.password = this.form.get('password')?.value;
    this.driver.adresse = this.form.get('adresse')?.value;
    this.driverService.save(this.driver).subscribe({
      next: (response: any) => {
        this.router.navigate(['driver-list']);
      },
      error: (error: any) => {
        console.error('Error updating driver:', error);
      }
    });
  }
}

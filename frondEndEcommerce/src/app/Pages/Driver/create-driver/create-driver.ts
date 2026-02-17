import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Driver } from '../../../models/driver';
import { DriverService } from '../../../Services/driver-service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { SideBar } from "../../comp/side-bar/side-bar";

@Component({
  selector: 'app-create-driver',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SideBar
  ],
  templateUrl: './create-driver.html',
  styleUrl: './create-driver.css',
})
export class CreateDriver implements OnInit {
  driver: Driver;
  form: FormGroup;

  constructor(
    private driverService: DriverService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.driver = new Driver();
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phone: [null, Validators.required],
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      adresse: [null, Validators.required]
    });
  }

  createDriver(): void {
    const driver = new Driver();
    driver.firstName = this.form.get('firstName')?.value;
    driver.lastName = this.form.get('lastName')?.value;
    driver.phone = this.form.get('phone')?.value;
    driver.username = this.form.get('username')?.value;
    driver.email = this.form.get('email')?.value;
    driver.password = this.form.get('password')?.value;
    driver.adresse = this.form.get('adresse')?.value;
    driver.role = 'DRIVER';
    this.driverService.save(driver).subscribe({
      next: (response: any) => {
        this.router.navigate(['driver-list']);
      },
      error: (error: any) => {
        console.error('Error creating driver:', error);
      }
    });
  }
}

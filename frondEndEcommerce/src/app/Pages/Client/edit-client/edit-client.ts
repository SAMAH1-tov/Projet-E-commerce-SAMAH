import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Client } from '../../../models/client';
import { ClientsService } from '../../../Services/clients-service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { AuthService } from '../../../Services/auth-service';
import { SideBar } from "../../comp/side-bar/side-bar";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-client',
  imports: [FormsModule, ReactiveFormsModule, SideBar, CommonModule],
  templateUrl: './edit-client.html',
  styleUrl: './edit-client.css',
})
export class EditClient implements OnInit {
  client: Client;
  form: FormGroup;

  constructor(
    private clientService: ClientsService,
    private authService: AuthService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    public actRoute: ActivatedRoute,
  ) {}
  
  ngOnInit(): void {
    this.loadClient();
  }

  loadClient(): void {
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.clientService.findById(id).subscribe(data => {
      this.client = data;
      this.initForm();
      this.cdRef.detectChanges();
    });
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      firstName: [this.client?.firstName || null, Validators.required],
      lastName: [this.client?.lastName || null, Validators.required],
      phone: [this.client?.phone || null, Validators.required],
      username: [this.client?.username || null, Validators.required],
      email: [this.client?.email || null, [Validators.required, Validators.email]],
      password: [this.client?.password || null, Validators.required],
      localization: [this.client?.localization || null, Validators.required]
    });
  }

  updateClient(): void {
    if (this.form.invalid) return;
    this.client.firstName = this.form.get('firstName')?.value;
    this.client.lastName = this.form.get('lastName')?.value;
    this.client.phone = this.form.get('phone')?.value;
    this.client.username = this.form.get('username')?.value;
    this.client.email = this.form.get('email')?.value;
    this.client.password = this.form.get('password')?.value;
    this.client.localization = this.form.get('localization')?.value;

    this.clientService.save(this.client).subscribe({
      next: () => {
        this.router.navigate(['client-list']);
      },
      error: (error) => {
        console.error('Erreur de modification', error);
      }
    });
  }
}

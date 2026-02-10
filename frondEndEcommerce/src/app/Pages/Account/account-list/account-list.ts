import {ChangeDetectorRef, Component, inject, OnInit, signal} from '@angular/core';
import {Router} from '@angular/router';
import {Account} from '../../../models/account';
import {AccountService} from '../../../Services/account-service';

@Component({
  selector: 'app-account-list',
  imports: [],
  templateUrl: './account-list.html',
  styleUrl: './account-list.css',
})
export class AccountList implements OnInit {
  accounts: Account[] = [];

  public constructor(private accountService: AccountService,private cd: ChangeDetectorRef,private router: Router) {
  }


  ngOnInit(): void {
      this.loadAccount()
  }

  loadAccount(): void {
    this.accountService.findAll().subscribe({
      next: a => {
        this.accounts = a;
        this.cd.detectChanges();
      },
    });
  }
  updateAccount(id: number): void {
    this.router.navigate(['edit-account/' + id])
  }

  deleteAccount(id: number) {
    this.accountService.delete(id).subscribe({
      next: () => {
        this.accounts = this.accounts.filter(a => a.id !== id);
        this.cd.detectChanges();
        this.router.navigate(['/account-list']);
      },
      error: err => console.error("Erreur lors de la suppression", err)
    })
  }

}

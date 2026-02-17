package com.smh.Backend_E_commerce.Controllers;


import com.smh.Backend_E_commerce.Services.AccountService;
import com.smh.Backend_E_commerce.entities.Account;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/accounts/")


public class AccountController {
    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("save")
    public ResponseEntity<Account> create(@RequestBody Account account) {
        Account saved = accountService.save(account);
        System.out.println("Account");
        System.out.println(account);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("findAll")
    public List<Account> list() {
        return accountService.findAll();
    }


    @PutMapping("update/{id}")
    public  ResponseEntity<Account> update(@PathVariable ("id") long id,
                                         @RequestBody Account account)
    {
        Account update = accountService.update(account,id);
        return ResponseEntity.status(HttpStatus.CREATED).body(update);

    }
    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable ("id") long id){
        accountService.delete(id);
    }

    @GetMapping("findById/{id}")
    public ResponseEntity getById(@PathVariable ("id") long id){
        Account accountFind = accountService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(accountFind);
    }

}

package com.smh.E_commerce.projet.semestre.ServicesImp;


import com.smh.E_commerce.projet.semestre.Entities.Account;
import com.smh.E_commerce.projet.semestre.Repositories.AccountRepository;
import com.smh.E_commerce.projet.semestre.Services.AccountService;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AccountServiceImp implements AccountService {

    private final AccountRepository accountRepository;

    public AccountServiceImp(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    @Override
    public Account save(Account account) {
        return this.accountRepository.save(account);
    }

    @Override
    public Account update(Account account, long id) {
        Account accountFind = accountRepository.findById(id).orElse(null);
        accountFind.setId(account.getId());
        accountFind.setFirstName(account.getFirstName());
        accountFind.setLastName(account.getLastName());
        accountFind.setPhone(account.getPhone());
        accountFind.setEmail(account.getEmail());
        accountFind.setPassword(account.getPassword());
        accountFind.setUsername(account.getUsername());
        Account update = accountRepository.save(accountFind);
        return update;
    }

    @Override
    public List<Account> findAll() {
        return accountRepository.findAll();
    }

    @Override
    public void delete(long id) {
        Account accountFind = accountRepository.findById(id).orElse(null);
        accountRepository.deleteById(accountFind.getId());

    }

    @Override
    public Account findById(long id) {
        Account accountFind = accountRepository.findById(id).orElse(null);
        return accountFind;
    }
}

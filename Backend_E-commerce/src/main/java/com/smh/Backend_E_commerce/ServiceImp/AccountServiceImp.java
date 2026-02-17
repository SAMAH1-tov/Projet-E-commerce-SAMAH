package com.smh.Backend_E_commerce.ServiceImp;


import com.smh.Backend_E_commerce.Repositories.AccountRepository;
import com.smh.Backend_E_commerce.Services.AccountService;

import com.smh.Backend_E_commerce.entities.Account;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AccountServiceImp implements AccountService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    public AccountServiceImp(AccountRepository accountRepository, PasswordEncoder passwordEncoder) {
        this.accountRepository = accountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Account save(Account account) {
        if (account.getPassword() != null && !account.getPassword().isEmpty()) {
            account.setPassword(passwordEncoder.encode(account.getPassword()));
        }
        return this.accountRepository.save(account);
    }

    @Override
    public Account update(Account account, long id) {
        Account accountFind = accountRepository.findById(id).orElse(null);
        accountFind.setId(account.getId());
        accountFind.setFirstName(account.getFirstName());
        accountFind.setLastName(account.getLastName());
        accountFind.setPhone(account.getPhone());
        accountFind.setUsername(account.getRealUsername());
        accountFind.setEmail(account.getEmail());
        if (account.getPassword() != null && !account.getPassword().isEmpty()) {
            accountFind.setPassword(passwordEncoder.encode(account.getPassword()));
        }
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

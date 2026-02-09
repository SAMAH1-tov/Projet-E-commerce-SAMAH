package com.smh.E_commerce.projet.semestre.Services;

import com.smh.E_commerce.projet.semestre.Entities.Account;

import java.util.List;

public interface AccountService {
    Account save (Account account);

    Account update(Account account, long id);

    List<Account> findAll();

    void delete(long id);

    Account findById(long id);

}

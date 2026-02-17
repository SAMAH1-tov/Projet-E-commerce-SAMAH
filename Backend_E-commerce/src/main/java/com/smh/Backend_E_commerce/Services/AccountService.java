package com.smh.Backend_E_commerce.Services;

import com.smh.Backend_E_commerce.entities.Account;

import java.util.List;

public interface AccountService {
    Account save (Account account);

    Account update(Account account, long id);

    List<Account> findAll();

    void delete(long id);

    Account findById(long id);

}

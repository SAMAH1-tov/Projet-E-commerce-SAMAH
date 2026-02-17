package com.smh.Backend_E_commerce.Repositories;


import com.smh.Backend_E_commerce.entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findByEmail(String email);
}

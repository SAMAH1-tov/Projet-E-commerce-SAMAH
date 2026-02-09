package com.smh.E_commerce.projet.semestre.Repositories;

import com.smh.E_commerce.projet.semestre.Entities.Account;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountRepository extends JpaRepository<Account, Long> {

}
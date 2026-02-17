package com.smh.Backend_E_commerce.Repositories;

import com.smh.Backend_E_commerce.entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {

}
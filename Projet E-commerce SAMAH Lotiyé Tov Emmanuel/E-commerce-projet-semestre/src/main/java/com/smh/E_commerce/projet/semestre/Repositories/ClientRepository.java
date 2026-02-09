package com.smh.E_commerce.projet.semestre.Repositories;

import com.smh.E_commerce.projet.semestre.Entities.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {

}
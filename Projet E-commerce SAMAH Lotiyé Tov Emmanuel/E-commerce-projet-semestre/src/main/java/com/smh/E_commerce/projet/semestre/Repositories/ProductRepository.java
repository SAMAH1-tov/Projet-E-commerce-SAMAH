package com.smh.E_commerce.projet.semestre.Repositories;

import com.smh.E_commerce.projet.semestre.Entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
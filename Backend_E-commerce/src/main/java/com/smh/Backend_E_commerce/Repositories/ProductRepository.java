package com.smh.Backend_E_commerce.Repositories;

import com.smh.Backend_E_commerce.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
package com.smh.E_commerce.projet.semestre.Services;

import com.smh.E_commerce.projet.semestre.Entities.Product;

import java.util.List;

public interface ProductService {
    Product save (Product product);

    Product update(Product product, long id);

    List<Product> findAll();

    void delete(long id);

    Product findById(long id);
    
}
